import { notFound } from 'next/navigation'; // Importing the Next.js function to handle 404 page redirection
import Post from '@/app/ui/components/posts/post'; // Importing the Post component to display a single post
import { getPosts } from '@/app/lib/data'; // Importing a function to retrieve posts from a data source

// Async function to handle rendering of the post page based on the dynamic ID passed in the URL
export default async function Page({ params }: { params: { id: string } }) {
  
  // Fetching all posts using the getPosts function
  const posts = await getPosts();
  
  // Finding the post that matches the ID provided in the URL params
  const post = posts?.find((post) => post.id === params.id); 

  // If no post is found with the matching ID, redirect to a 404 page
  if (!post) {
    notFound(); // Redirects to the 404 page
  }

  // Render the Post component if the post is found
  return (
    <>
      {/* Main heading for the post page */}
      <h2 className="text-3xl mb-4 text-emerald-400">Post</h2>

      {/* Conditionally render the Post component if the post exists */}
      {post && (
        <Post
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          author={post.author} // Pass the author to the Post component
        />
      )}
    </>
  );
}
