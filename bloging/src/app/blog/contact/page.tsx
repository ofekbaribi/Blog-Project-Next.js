import React from 'react';

export default function Page() {
  return (
    <div>
      {/* Title for the Contact page */}
      <h2 className="text-3xl mb-4 text-emerald-400">Contact Us</h2>
      
      {/* Introduction paragraph about contacting the organization */}
      <p>
        If you have any questions, concerns, or feedback, feel free to reach out to us. 
        We value open communication and are always here to assist you in any way possible.
        Don't hesitate to contact us using the information below!
      </p>

      <div>
        {/* Subheading for the contact section */}
        <h2>Get in Touch</h2>

        {/* Contact information listed with custom bullet points */}
        <ul style={{ listStyleType: "square" }}>
          <li>
            {/* Email address for inquiries */}
            <span>Email: <a href="mailto:contact@bloging.com">contact@bloging.com</a></span>
          </li>
          <li>
            {/* Website link for more information */}
            <span>Website: <a href="https://blog-project-next-js-5gzq-6em0hr6nu-ofek-baribis-projects.vercel.app/">www.bloging.com</a></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
