import Link from "next/link"; // Importing Link for navigation in Next.js
import Post from '@/app/ui/components/posts/Post'; // Importing the Post component to display individual posts
import { connectToDB, getPosts } from '@/app/lib/data'; // Importing helper functions for database connection and fetching posts
import { auth } from "../../../../auth.config"; // Importing authentication configuration
import { PencilSquareIcon } from '@heroicons/react/24/outline'; // Importing icons from Heroicons for the button

export default async function Page() {
  // Connecting to the database
  await connectToDB();
  // Fetching all posts
  const posts = await getPosts();
  // Getting the current session (user authentication)
  const session = await auth();

  return (
    <>
      {/* Check if the user is authenticated and show the "New Post" button if they are */}
      {session?.user && (
        <Link href="/blog/post/insert">
          <button type="submit" className="text-white px-4 py-2 rounded-md flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500">
            New Post
            <PencilSquareIcon className="w-5 h-5" /> {/* Icon for the New Post button */}
          </button>
        </Link>
      )}
      
      {/* Add space between the New Post button and the title */}
      <div className="my-4"></div> {/* Empty div with margin to add space */}

      {/* Title for the posts list */}
      <h2 className="text-3xl mb-4 text-emerald-400">Posts</h2>

      {/* Displaying each post using the refactored Post component */}
      {posts?.map((post) => (
        <Post 
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          author={post.author} // Passing the author name to the Post component
        />
      ))}
    </>
  );
}
