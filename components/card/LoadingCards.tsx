import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCards() {
  return <div>

  </div>;
}

export function SkeletonCard() {
  return <div>
    <Skeleton className="rounded-md h-[300px]" />
    <Skeleton className="rounded-md h-[300px]" />
    <Skeleton className="rounded-md h-[300px]" />
  </div>
}
