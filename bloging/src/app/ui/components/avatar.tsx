"use client"; // Ensures that this component is run on the client side (necessary for certain interactive components)

import * as React from "react"; // Importing React to handle component rendering and ref forwarding
import * as AvatarPrimitive from "@radix-ui/react-avatar"; // Importing Avatar components from Radix UI (a library for building accessible UI primitives)

import { cn } from '@/app/lib/utils'; // Importing a utility function 'cn' for conditional class merging

// Avatar component
// Forwarding ref to the AvatarPrimitive.Root component and applying className and other props
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, // Type definition for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> // Type definition for the props without ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref} // Forwarding the ref to the AvatarPrimitive.Root component
    className={cn( // Merging the default and passed-in class names using the 'cn' utility function
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Default styles for the Avatar
      className // Allowing custom className to be added via props
    )}
    {...props} // Spreading any additional props to the AvatarPrimitive.Root
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName; // Display name for the component, useful for debugging

// AvatarImage component
// Forwarding ref to the AvatarPrimitive.Image component, with similar className merging and props handling
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Type definition for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Type definition for the props without ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref} // Forwarding the ref to the AvatarPrimitive.Image component
    className={cn("aspect-square h-full w-full", className)} // Applying default styles and merging with className
    {...props} // Spreading additional props
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName; // Setting display name for debugging

// AvatarFallback component
// Displayed when the AvatarImage fails to load or when no image is provided
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Type definition for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Type definition for the props without ref
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref} // Forwarding the ref to the AvatarPrimitive.Fallback component
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Default fallback styles
      className // Allowing custom className to be passed
    )}
    {...props} // Spreading additional props
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName; // Setting display name for debugging

// Exporting the Avatar, AvatarImage, and AvatarFallback components for use in other parts of the application
export { Avatar, AvatarImage, AvatarFallback };
