import { notFound } from 'next/navigation';
// import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/Post';
import { getPosts } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const posts = await getPosts();
  const post = posts?.find((post) => post.id === params.id); 

  if (!post) {
    notFound();
  }
  return (
    <>
      <h1>Post</h1>
      {post && <Post id={post.id} title={post.title} content={post.content} date={post.date} />}
    </>)
}