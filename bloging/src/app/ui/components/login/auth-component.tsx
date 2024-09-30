import { signIn, signOut } from "../../../../../auth.config"; // Importing signIn and signOut methods from authentication configuration
import { Button } from "@/app/ui/components/button"; // Importing the Button component for UI

// SignIn component allows users to sign in using a specified provider
export function SignIn({
  provider, // Optional provider for the sign-in method (e.g., Google, GitHub)
  ...props // Spread props to pass down to the Button component
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  
  return (
    <form
      action={async () => {
        "use server"; // Ensures this function runs on the server-side
        await signIn(provider); // Triggers signIn with the provided authentication provider
      }}
    >
      {/* Render the Button component for signing in */}
      <Button {...props}>Sign In</Button>
    </form>
  );
}

// SignOut component allows users to sign out
export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  
  return (
    <form
      action={async () => {
        "use server"; // Ensures this function runs on the server-side
        await signOut(); // Triggers signOut to log out the user
      }}
      className="w-full" // CSS class to make the form take full width
    >
      {/* Render a ghost variant of the Button component for signing out */}
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
