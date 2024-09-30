import SideNav from "@/app/ui/components/sidenav"; // Importing the SideNav component for the sidebar navigation

// The Layout component defines the overall structure of the page layout.
// It includes a sidebar for navigation and a content area for displaying the main content.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white">
      {/* Sidebar section - occupies full width on small screens, 
          and a fixed width on medium and larger screens */}
      <div className="w-full flex-none md:w-64">
        <SideNav /> {/* The sidebar navigation component */}
      </div>

      {/* Content section - grows to fill the available space */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children} {/* This represents the main content area that is passed as children */}
      </div>
    </div>
  );
}
