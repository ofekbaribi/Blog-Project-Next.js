import { createClient } from '@vercel/postgres'; // Importing the Vercel Postgres client to interact with the database
import { unstable_noStore as noStore } from 'next/cache'; // Importing cache control to ensure the data is not cached
import { sql } from '@vercel/postgres'; // Importing the SQL tag to write SQL queries

// Function to connect to the Postgres database
export async function connectToDB() {
  const client = createClient(); // Create a new client instance
  await client.connect(); // Connect to the database

  try {
    // If the client is connected, log a success message
    if (client) {
      console.log('Connected to database');
      return client; // Return the client connection for further use
    }
  } catch (error) {
    // Log any errors that occur during the connection attempt
    console.error('Error connecting to database', error);
  }
}

// Function to fetch all posts from the 'posts' table
export async function getPosts() {
  try {
    // Prevent caching of the data for dynamic content fetching
    noStore(); 

    // SQL query to select all rows from the 'posts' table
    const data = await sql`SELECT * FROM posts`; 

    // Return the rows (posts) retrieved from the database
    return data.rows;
  } catch (error) {
    // Log any errors that occur during the data fetching process
    console.error('Error getting posts', error);
  }
}
