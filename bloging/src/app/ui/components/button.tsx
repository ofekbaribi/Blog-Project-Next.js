import * as React from "react"; // Importing React for creating components and forwarding refs
import { Slot } from "@radix-ui/react-slot"; // Importing Slot from Radix UI for rendering as a different element (useful for dynamic components)
import { cva, type VariantProps } from "class-variance-authority"; // Importing CVA (Class Variance Authority) for handling class variants

import { cn } from '@/app/lib/utils'; // Importing the `cn` utility for class name merging

// Defining button variants using `cva` (Class Variance Authority)
const buttonVariants = cva(
  // Base classes that apply to all buttons
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Defining different button styles based on variants and sizes
    variants: {
      // Variant options for different button styles (default, destructive, outline, etc.)
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Default button style
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Destructive (danger) button
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outlined button style
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary button style
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost button style (no background)
        link: "text-primary underline-offset-4 hover:underline", // Link style button
      },
      // Size options for different button sizes
      size: {
        default: "h-10 px-4 py-2", // Default size
        sm: "h-9 rounded-md px-3", // Small size
        lg: "h-11 rounded-md px-8", // Large size
        icon: "h-10 w-10", // Icon size (square button)
      },
    },
    // Defining the default variant and size
    defaultVariants: {
      variant: "default", // Default to the primary button style
      size: "default", // Default to the regular button size
    },
  }
);

// Defining the ButtonProps interface which extends native button props and the variant props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Inheriting native button HTML attributes
    VariantProps<typeof buttonVariants> { // Adding type support for button variant options
  asChild?: boolean; // Optional flag to render the button as a child component (useful for dynamic rendering)
}

// Creating the Button component with forwardRef to pass refs to the button or custom component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Conditionally use the `Slot` component or a regular `button` based on the `asChild` prop
    const Comp = asChild ? Slot : "button";

    // Rendering the button with the merged class names (based on variant, size, and additional class names)
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Merging variant, size, and additional class names
        ref={ref} // Forwarding the ref to the button or custom component
        {...props} // Spreading additional props (like onClick, disabled, etc.)
      />
    );
  }
);

// Setting the display name for debugging in React Developer Tools
Button.displayName = "Button";

// Exporting the Button component and buttonVariants for use in other parts of the app
export { Button, buttonVariants };
