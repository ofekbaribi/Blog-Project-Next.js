import React from 'react';

export default function Page() {
  return (
    <div>
      {/* Title for the Contact page */}
      <h2 className="text-3xl mb-4 text-emerald-400">Contact Us</h2>

      {/* Introduction paragraph about contacting the organization */}
      <p className="mb-4">
        If you have any questions, concerns, or feedback, feel free to reach out to us. 
        We value open communication and are always here to assist you in any way possible.
        Don&apos;t hesitate to contact us using the information below!
      </p>

      <div>
        {/* Subheading for the contact section */}
        <h3 className="text-2xl mb-2">Get in Touch</h3>

        {/* Contact information listed with custom bullet points */}
        <ul style={{ listStyleType: "square" }} className="mb-4">
          <li>
            {/* Email address for inquiries */}
            <span>Email: <a href="mailto:contact@bloging.com" className="text-emerald-500">contact@bloging.com</a></span>
          </li>
          <li>
            {/* Website link for more information */}
            <span>Website: <a href="https://blog-project-next-js-5gzq-6em0hr6nu-ofek-baribis-projects.vercel.app/" className="text-emerald-500">www.bloging.com</a></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
