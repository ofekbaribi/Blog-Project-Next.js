import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/components/avatar"; // Importing components for user avatars
import { Button } from "@/app/ui/components/button"; // Importing the Button component for UI
import { auth } from "../../../../../auth.config"; // Importing authentication configuration
import {
  DropdownMenu, // Component for the dropdown menu
  DropdownMenuContent, // The content of the dropdown (appears on trigger)
  DropdownMenuLabel, // Label at the top of the dropdown menu
  DropdownMenuTrigger // Component to trigger the dropdown (like a button or avatar)
} from "@/app/ui/components/dropdown-menu"; // Importing components for the dropdown menu
import { SignIn, SignOut } from "./auth-component"; // Importing SignIn and SignOut components for authentication actions

// Async function to render the UserButton component
export default async function UserButton() {
  const session = await auth(); // Fetch the current session using the authentication method

  // If no user is found in the session, render the SignIn component
  if (!session?.user) return <SignIn />;

  // If the user is authenticated, render the user information and dropdown menu
  return (
    <div className="flex gap-2 items-center"> {/* Flexbox layout for aligning avatar and user info */}
      
      {/* Display the user's email as a span, hidden on small screens */}
      <span className="hidden text-sm sm:inline-flex">
        {session.user.email} {/* Show the user's email */}
      </span>

      {/* Dropdown menu for user avatar and actions */}
      <DropdownMenu>
        {/* The button that triggers the dropdown, which contains the user's avatar */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            {/* Avatar for the user */}
            <Avatar className="w-8 h-8">
              {/* If the user has an image, display it */}
              {session.user.image && (
                <AvatarImage
                  src={
                    session.user.image ?? // Use the user's image if available, or fallback
                    "https://source.boringavatars.com/beam/120" // Fallback image URL
                  }
                  alt={session.user.name ?? ""} // Alt text uses the user's name if available
                />
              )}
              {/* Fallback to display if no image is provided, shows user's email */}
              <AvatarFallback>{session.user.email}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        {/* The content of the dropdown, aligned to the end (right side) */}
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {/* Label displaying the user's name and email */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {/* Display the user's name */}
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              {/* Display the user's email */}
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          {/* SignOut button to log the user out */}
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
