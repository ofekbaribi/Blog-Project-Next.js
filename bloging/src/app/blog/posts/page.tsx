import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';
import { Post as PostType } from '@/app/lib/definition';

export default function Page() {
  return (
    <>
      <h1 className="text-green-600">Posts</h1>
      {posts.map((post: PostType) => (
        <Post
          key={post.id || 'default-id'}
          id={(post.id || 'default-id') as string}
          title={(post.title || 'Untitled') as string}
          content={(post.content || 'No content available') as string}
          date={new Date(parseInt(post.date || '0')).toLocaleDateString()}
        />
      ))}
    </>
  );
}
