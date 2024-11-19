'use server'

import { profileSchema } from '@/utils/schemas';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import db from '@/utils/db';
import { redirect } from 'next/navigation';

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('User not found');

    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData)

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      }
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      }
    })
  } catch (error) {
    console.log(error)
    return { message: error instanceof Error ? error.message : 'An error occurred' };
  }

  redirect('/')
};
