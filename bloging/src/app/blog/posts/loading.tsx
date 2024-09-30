import { PostsSkeleton } from "@/app/ui/components/skeletons"; // Importing the skeleton component for loading state

// The Loading component is used to display a skeleton placeholder
// while the actual posts are being fetched
export default function Loading() {
  // Return the skeleton component to indicate that the data is loading
  return <PostsSkeleton />;
}
