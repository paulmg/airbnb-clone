'use server'

import { profileSchema, validateWithZodSchema } from '@/utils/schemas';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import db from '@/utils/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const getAuthUser = async() => {
  const user = await currentUser();
  if (!user) {
    throw new Error('You must be logged in to access this route');
  }

  if (!user.privateMetadata.hasProfile) redirect('/profile/create');

  return user;
}

const renderError = (error:unknown): {message:string} => {
  console.log(error)
  return { message: error instanceof Error ? error.message : 'An error occurred' };
}

export const createProfileAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('User not found');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

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
    renderError(error);
  }

  redirect('/')
};

export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    }
  });

  return profile?.profileImage;
}

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    }
  });

  if (!profile) redirect('/profile/create');
  return profile;
}

export const updateProfileAction = async (prevState: any, formData: FormData) : Promise<{message: string}> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id
      },
      data: validatedFields,
    });

    revalidatePath('/profile');
    return { message: 'Profile updated' };
  } catch (error) {
    renderError(error);
  }

  return { message: 'Profile updated' };
}
