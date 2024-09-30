// Loading animation shimmer effect class
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

// Skeleton component for a single post (simulates the loading state for a post)
export function PostSkeleton() {
  return (
    <div className={`${shimmer} border border-gray-400 p-6 my-4 w-full rounded-md`}>
      {/* Simulated title bar */}
      <div className="h-4 mb-3 w-3/4 rounded-md bg-gray-300" /> {/* Adjusted height and width to reflect post title size */}

      {/* Simulated author line */}
      <div className="h-3 mb-2 w-1/4 rounded-md bg-gray-300" /> {/* Simulated smaller author text */}

      {/* Simulated post content lines */}
      <div className="h-2 mb-1 w-full rounded-md bg-gray-300" /> {/* First line of post content */}
      <div className="h-2 mb-1 w-5/6 rounded-md bg-gray-300" /> {/* Second line */}
      <div className="h-2 mb-1 w-4/6 rounded-md bg-gray-300" /> {/* Third line */}
    </div>
  );
}

// Skeleton loader for multiple posts (simulates a list of loading posts)
export function PostsSkeleton() {
  return (
    <>
      {/* Create 6 skeleton posts */}
      {Array.from({ length: 6 }, (_, index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  );
}
