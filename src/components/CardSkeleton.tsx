export default function CardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-line bg-space-800"
    >
      <div className="skeleton aspect-video" />
      <div className="space-y-3 p-4">
        <div className="flex justify-between">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>
        <div className="skeleton h-5 w-full rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-2/3 rounded" />
      </div>
    </div>
  );
}
