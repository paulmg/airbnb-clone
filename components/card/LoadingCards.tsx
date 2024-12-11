import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCards() {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </section>
  );
}

export function SkeletonCard() {
  return <div>
    <Skeleton className="rounded-md h-[300px]" />
    <Skeleton className="rounded-md h-[300px]" />
    <Skeleton className="rounded-md h-[300px]" />
  </div>
}
