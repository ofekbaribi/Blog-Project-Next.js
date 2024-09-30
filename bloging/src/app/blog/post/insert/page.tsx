"use client"; // Marks this component to run on the client side
import { v4 as uuidv4 } from 'uuid'; // Importing UUID library for generating unique IDs
import { useState, useEffect, useMemo } from 'react'; // Importing React hooks for state management, side effects, and memoization
import { useRouter } from 'next/navigation'; // Importing Next.js router for programmatic navigation
import { User } from "@/app/lib/definition"; // Importing custom User type
import { getSession } from 'next-auth/react'; // Importing getSession for handling authentication
import { RocketLaunchIcon, BeakerIcon } from '@heroicons/react/24/outline'; // Importing icons from Heroicons

// Helper function to format the date from YYYY-MM-DD to DD-MM-YYYY
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

export default function Page() {
  const router = useRouter(); // Router hook for programmatic navigation
  const PROMPT = "You are a creative blog writer. write a 50-word blog post about the title below. You can write anything you want, but it must be at least 50 words long. The title is: "; // Prompt for GPT API to generate content

  // State for handling content generation, form data, user session, and error message
  const [generating, setGenerating] = useState(false); // State to track if content is being generated
  const [content, setContent] = useState(''); // State to store generated content
  const [user, setUser] = useState<User | null>(null); // State to store user session information
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  // State for form data: title, content, date, and an ID
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    date: new Date().toISOString().slice(0, 10) // Automatically set current date
  });

  // Handle input change and update the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; // Destructure the name and value from the input
    setFormData(prevData => ({
      ...prevData, // Keep the previous form data
      [name]: value // Update only the changed field (title or content)
    }));
    setErrorMessage(''); // Clear any previous error messages when the user types
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const uuid = uuidv4(); // Generate a new unique ID for the blog post

    // Send a POST request to the server to save the blog post
    fetch(`/api/posts?id=${uuid}&title=${formData.title}&author=${user?.name}&content=${content || formData.content}&date=${formData.date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Sending data as JSON
      },
      body: JSON.stringify({ ...formData, id: uuid }) // Convert the form data to JSON format
    }).then(() => {
      // Clear form fields after submission
      setFormData({
        id: '',
        title: '',
        content: '',
        date: ''
      });
      // Redirect the user back to the blog posts page after successful submission
      router.push('/blog/posts');
    }).catch(console.error); // Log errors if there are any issues
  };

  // Function to generate blog content using the OpenAI GPT API with real-time streaming
const generateContent = () => {
  if (!formData?.title) { // If no title is entered, show an error message
    setErrorMessage('Please enter a title before generating content.');
    return; // Prevent further execution
  }

  setGenerating(true); // Set the generating state to true to show loading message

  // Prepare the request parameters for the OpenAI API with streaming enabled
  const requestParams = {
    model: "gpt-3.5-turbo", // Specify the GPT model to use
    stream: true, // Enable streaming for real-time updates
    messages: [
      { "role": "system", "content": PROMPT + formData?.title }, // Prompt for the system (the AI)
      { "role": "user", "content": formData?.title } // Message from the user (title of the blog post)
    ]
  };

  // Fetch request to OpenAI API for generating blog content in real-time
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify content type as JSON
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Authorization header with the API key
    },
    body: JSON.stringify(requestParams) // Send the request data as JSON
  }).then(response => {
    const reader = response.body?.getReader(); // Get the ReadableStream reader if body is not null
    if (!reader) {
      throw new Error('Response body is null');
    }
    const decoder = new TextDecoder("utf-8"); // Text decoder to decode the stream
    let contentSoFar = ''; // To store content as it's generated

    const readStream = async () => {
      const { done, value } = await reader.read(); // Read each chunk from the stream

      if (done) {
        setGenerating(false); // Stop generating once the stream is done
        return;
      }

      // Decode the incoming chunk
      const decodedChunk = decoder.decode(value, { stream: true });
      
      // Parse the chunk to extract JSON
      const lines = decodedChunk.split('\n').filter(line => line.trim() !== ''); // Split and filter out empty lines
      for (const line of lines) {
        if (line === 'data: [DONE]') {
          // Stop when the data stream is done
          setGenerating(false);
          return;
        }

        // Parse the JSON response from each line
        const json = JSON.parse(line.replace(/^data: /, '')); // Remove the "data: " prefix
        const delta = json.choices[0]?.delta?.content;
        
        // If delta content exists, append it to the overall content
        if (delta) {
          contentSoFar += delta;
          setContent(contentSoFar); // Update the content in real-time
        }
      }

      readStream(); // Continue reading the stream
    };

    readStream(); // Start reading the stream
  })
  .catch((error) => {
    console.error('Error fetching or processing the stream:', error);
    setGenerating(false); // Stop generating in case of error
  });
};
  // Fetch user session on component mount and ensure the user is authenticated
  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user as User | null); // Set the user session if available
      if (!session?.user) {
        router.push('/blog/posts'); // Redirect to blog posts if no user is found
      }
    });
  }, []);
  
  // Memoize the content to avoid unnecessary re-renders
  const postContent = useMemo(() => {
    return content || formData.content; // Use generated content if available, otherwise use form content
  }, [content, formData.content]);

  return (
    <div className="bg-white p-8 rounded shadow">
      <h2 className="text-3xl mb-4 text-emerald-400">New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title input field */}
        <div>
          <label htmlFor="title" className="block font-medium">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Display error message if title is missing */}
        </div>

        {/* Content textarea field */}
        <div>
          <label htmlFor="content" className="block font-medium">Content:</label>
          <textarea id="content" name="content" rows={4} value={postContent} onChange={handleChange} className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none"></textarea>
          {generating && <p className='text-blue-400 my-1'>Generating content...</p>} {/* Show message if content is being generated */}
          <button onClick={generateContent} type="button" className="bg-blue-400 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
            Generate Content
            <BeakerIcon className="w-5 h-5" /> {/* Beaker icon for the Generate button */}
          </button>
          {/* Explanation text to the right of the button */}
          <p className="mt-2 text-sm text-gray-500">Provide a captivating title, and let AI generate an inspiring blog post for you!</p>
        </div>

        {/* Date input field (readonly) */}
        <div>
          <label htmlFor="date" className="block font-medium">Date:</label>
          <input type="text" id="date" name="date" value={formatDate(formData.date)} readOnly className="w-full border-2 border-purple-100 p-2 rounded-md focus:border-purple-200 focus:outline-none" />
        </div>

        {/* Submit button */}
        <div>
          <button type="submit" className="text-white px-4 py-2 rounded-md flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500">
            Submit
            <RocketLaunchIcon className="w-5 h-5" /> {/* RocketLaunch icon for the Submit button */}
          </button>
        </div>
      </form>
    </div>
  );
}
