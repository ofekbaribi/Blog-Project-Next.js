import Link from 'next/link'; // Importing the Link component from Next.js for navigation
import { FaceFrownIcon } from '@heroicons/react/24/outline'; // Importing a frown icon from Heroicons

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      {/* Frown icon to visually represent a "not found" state */}
      <FaceFrownIcon className="w-10 text-gray-400" />

      {/* Title indicating a 404 Not Found error */}
      <h2 className="text-xl font-semibold">404 Not Found</h2>

      {/* Brief message explaining that the blog post couldn't be found */}
      <p>Could not find the requested blog post.</p>

      {/* Link back to the blog posts page, styled as a button */}
      <Link
        href="/blog/posts" 
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
