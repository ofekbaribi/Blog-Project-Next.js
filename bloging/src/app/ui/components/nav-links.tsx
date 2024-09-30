'use client'; // Marking this component as client-side

// Importing icons from Heroicons to be used for navigation links
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

// Importing Next.js' usePathname hook to get the current route
import { usePathname } from 'next/navigation';
import Link from 'next/link'; // Link component for navigation in Next.js
import clsx from 'clsx'; // Utility for conditionally combining classNames

// Defining an array of links to display in the side navigation.
// This could be stored in a database in a larger application.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon }, // Home page link
  { 
    name: 'Posts', 
    href: '/blog/posts', 
    icon: DocumentDuplicateIcon, // Posts page link 
  },
  { 
    name: 'About', 
    href: '/blog/about', 
    icon: UserGroupIcon // About page link 
  },
  { 
    name: 'Contact', 
    href: '/blog/contact', 
    icon: EnvelopeIcon // Contact page link 
  },
];

// The NavLinks component handles rendering the navigation menu
export default function NavLinks() {
  const pathname = usePathname(); // Getting the current route using Next.js hook

  return (
    <>
      {/* Iterating through the links array and generating a Link component for each */}
      {links.map((link) => {
        const LinkIcon = link.icon; // Storing the corresponding icon for each link
        
        return (
          // Link component for navigation. 'clsx' is used to conditionally apply class names.
          <Link
            key={link.name} // Unique key for each link (React optimization)
            href={link.href} // Destination URL
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-emerald-500 md:flex-none md:justify-start md:p-2 md:px-3', // Default styles for links
              {
                'bg-emerald-400': pathname === link.href, // Highlight current page
              }
            )}
          >
            {/* Icon corresponding to the link */}
            <LinkIcon className="w-6" />
            {/* Link text - hidden on small screens, visible on larger screens */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
