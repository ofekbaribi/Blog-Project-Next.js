import NavLinks from '@/app/ui/components/nav-links'; // Importing the NavLinks component for the navigation menu
import UserButton from '@/app/ui/components/login/user-button'; // Importing the UserButton component for user authentication (login/logout button)

// The SideNav component renders the sidebar navigation and user controls
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      {/* Container for the navigation links and the user button */}
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        
        {/* Rendering the navigation links (NavLinks component) */}
        <NavLinks />
        
        {/* Rendering the user login/logout button (UserButton component) */}
        <UserButton />
      </div>
    </div>
  );
}
