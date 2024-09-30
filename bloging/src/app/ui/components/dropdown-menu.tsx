"use client"; // Ensures that this component runs on the client side

import * as React from "react"; // Importing React for component rendering and ref forwarding
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"; // Importing DropdownMenu primitives from Radix UI for accessible dropdowns
import { Check, ChevronRight, Circle } from "lucide-react"; // Importing icons from Lucide
import { cn } from '@/app/lib/utils'; // Importing a utility function for class merging

// Wrapping Radix UI primitives for use in DropdownMenu components
const DropdownMenu = DropdownMenuPrimitive.Root; // The root component of the dropdown
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger; // The trigger that opens the dropdown
const DropdownMenuGroup = DropdownMenuPrimitive.Group; // Grouping items together
const DropdownMenuPortal = DropdownMenuPrimitive.Portal; // Allows rendering content in a portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub; // Used for submenus
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup; // Group for radio button items within the menu

// DropdownMenuSubTrigger component
// Forwarding refs and adding custom class names to handle the trigger for a submenu
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>, // Defining the type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { // Defining the type of the props without the ref
    inset?: boolean; // Optional inset prop for styling
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref} // Forwarding ref to the SubTrigger element
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", // Base styles
      inset && "pl-8", // Adding left padding if inset is true
      className // Merging additional class names passed via props
    )}
    {...props} // Spreading other props
  >
    {children}
    {/* Chevron icon indicating submenu */}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName; // Setting display name for debugging

// DropdownMenuSubContent component
// Handles the content inside a submenu
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> // Props without ref
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref} // Forwarding ref to the SubContent element
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg", // Base styles for submenu content
      className
    )}
    {...props} // Spreading other props
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName; // Setting display name for debugging

// DropdownMenuContent component
// Handles the main dropdown content
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> // Props without ref
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref} // Forwarding ref to the Content element
      sideOffset={sideOffset} // Offset from the trigger button
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", // Base styles for dropdown content
        className
      )}
      {...props} // Spreading other props
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName; // Setting display name for debugging

// DropdownMenuItem component
// Handles individual items within the dropdown
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { // Props without ref
    inset?: boolean; // Optional inset prop for styling
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref} // Forwarding ref to the Item element
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent", // Base styles
      inset && "pl-8", // Additional padding if inset is true
      className // Merging additional class names
    )}
    {...props} // Spreading other props
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName; // Setting display name for debugging

// DropdownMenuCheckboxItem component
// Handles checkbox items within the dropdown
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> // Props without ref
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref} // Forwarding ref to the CheckboxItem element
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent", // Base styles
      className // Merging additional class names
    )}
    checked={checked} // Whether the checkbox is checked
    {...props} // Spreading other props
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" /> {/* Icon for checked state */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Displaying children (label for checkbox) */}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName; // Setting display name for debugging

// DropdownMenuRadioItem component
// Handles radio button items within the dropdown
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> // Props without ref
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref} // Forwarding ref to the RadioItem element
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent", // Base styles
      className // Merging additional class names
    )}
    {...props} // Spreading other props
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" /> {/* Radio button icon */}
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children} {/* Displaying children (label for radio button) */}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName; // Setting display name for debugging

// DropdownMenuLabel component
// Used for labeling sections within the dropdown
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { // Props without ref
    inset?: boolean; // Optional inset prop for styling
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref} // Forwarding ref to the Label element
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)} // Base styles with optional inset padding
    {...props} // Spreading other props
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName; // Setting display name for debugging

// DropdownMenuSeparator component
// Adds a separator line between sections in the dropdown
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>, // Type of the ref
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> // Props without ref
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref} // Forwarding ref to the Separator element
    className={cn("-mx-1 my-1 h-px bg-muted", className)} // Base styles for separator
    {...props} // Spreading other props
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName; // Setting display name for debugging

// DropdownMenuShortcut component
// Displays keyboard shortcuts or other hints to the right of menu items
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)} // Base styles for shortcut text
      {...props} // Spreading other props
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"; // Setting display name for debugging

// Exporting all components for use in other parts of the app
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
