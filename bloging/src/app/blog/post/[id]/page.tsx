import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';

export default function Page({ params }: { params: { id: string } }) {
  const post = posts.find((post) => post.id === params.id);

  // Check if post exists before rendering
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <h1>Post</h1>
      <Post
        id={post.id || 'default-id'}
        title={post.title || 'Untitled'}
        content={post.content || 'No content available'}
        date={new Date(parseInt(post.date || '0')).toLocaleDateString()}
      />
    </>
  );
}
