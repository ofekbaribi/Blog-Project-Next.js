import Link from 'next/link'; // Importing Link for navigation in Next.js

// Helper function to format the date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

// Post component to display individual post details
export default function Post({ id, title, content, date, author }: { id: string, title: string, content: string, date: string, author: string }) {
  return (
    <div key={id} className="border border-gray-400 p-4 my-4">
      {/* Title with link to the post detail page */}
      <Link href={`/blog/post/${id}`}>
        <h2 className="text-2xl font-bold text-blue-400 hover:underline">{title}</h2>
      </Link>

      {/* Displaying the post content */}
      <p>{content}</p>

    {/* Displaying the formatted date */}
      <p className="text-sm text-gray-500 mt-2">
        <strong>Date:</strong> {formatDate(date)}
      </p>

      {/* Displaying the author's name */}
      <p className="text-sm text-gray-500 mt-1">
        <strong>Author:</strong> {author}
      </p>

    </div>
  );
}
