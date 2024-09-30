'use client'; 

import { useEffect } from 'react';

// Error component to display when something goes wrong
export default function Error({
  error,  // The error object that occurred
  reset,  // Function to attempt resetting or retrying the action
}: {
  error: Error & { digest?: string }; // Error type with an optional 'digest' field for additional information
  reset: () => void; // Reset function to attempt recovery
}) {
  
  useEffect(() => {
    // Log the error to the console or an error reporting service
    console.error(error); 
  }, [error]); // The effect will run whenever the error changes

  return (
    <main className="flex h-full flex-col items-center justify-center">
      {/* Display a simple error message */}
      <h2 className="text-center">Something went wrong!</h2>

      {/* Button to attempt retrying the failed action */}
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by calling the reset function, which triggers a re-render or retry
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
