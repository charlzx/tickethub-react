# Theme and Design System

This document provides a detailed overview of the visual theme and design system for the TicketHub application. The goal is to establish a consistent, professional, and accessible user interface. This guide serves as a reference for the application's design, layout, and component structure.

## Color Palette

Our color palette is designed to be clean, modern, and professional, with clear roles for each color to guide the user's attention. The theme is defined using HSL values in `src/app/globals.css`.

-   **Primary Color**: `Deep Blue`
    -   **HSL**: `224 100% 59%`
    -   **Usage**: Used for primary actions, links, active states, and important highlights. It conveys trust and stability. The active navigation link in the sidebar uses a 10% transparent version of this color.

-   **Background Color**: `Very Light Gray`
    -   **HSL**: `210 40% 98%`
    -   **Usage**: The main background color for pages and cards. It provides a clean, neutral canvas.

-   **Accent Color**: `Vivid Orange`
    -   **HSL**: `25 100% 50%`
    -   **Usage**: Used for secondary highlights and elements that require user attention.

-   **Foreground / Text Color**: `Dark Gray`
    -   **HSL**: `222.2 84% 4.9%`
    -   **Usage**: Standard text color for paragraphs and general content to ensure high readability.

-   **Muted / Secondary Text Color**: `Medium Gray`
    -   **HSL**: `215.4 16.3% 46.9%`
    -   **Usage**: For secondary information, placeholders, and disabled states.

### Status & Priority Colors

Badges are colored to provide quick visual cues about a ticket's state.

-   **Status Badges (`StatusBadge.tsx`)**:
    -   **Open**: Light green background (`bg-green-100`, `text-green-800`).
    -   **In Progress**: Light amber background (`bg-amber-100`, `text-amber-800`).
    -   **Closed**: Light gray background (`bg-gray-100`, `text-gray-800`).

-   **Priority Badges (`PriorityBadge.tsx`)**:
    -   **High**: Light red background (`bg-red-100`, `text-red-800`).
    -   **Medium**: Light yellow background (`bg-yellow-100`, `text-yellow-800`).
    -   **Low**: Light blue background (`bg-blue-100`, `text-blue-800`).

## Typography

The typography is chosen for its readability and modern aesthetic, sourced from Google Fonts.

-   **Headline Font**: `Space Grotesk`
    -   **Style**: Sans-serif, geometric, with a slightly techy feel.
    -   **Usage**: For main page titles (`<h1>`), card titles, and key marketing messages.
    -   **Weights**: 500 (Medium), 700 (Bold).

-   **Body Font**: `Inter`
    -   **Style**: Grotesque sans-serif, highly readable.
    -   **Usage**: For all paragraphs, labels, form inputs, and general UI text.
    -   **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold).

## Layout and Spacing

A consistent layout and spacing system ensures a balanced and organized interface.

-   **Max Content Width**: `1280px` (`max-w-7xl`). All main content sections are horizontally centered within this maximum width on large screens.
-   **Grid System**: A responsive grid system is used for arranging content (e.g., dashboard stats, ticket list). On mobile, this typically collapses to a single-column stack. On tablets and desktops, multi-column layouts are used (`md:grid-cols-2`, `lg:grid-cols-3`).
-   **Spacing**: Spacing is based on Tailwind CSS's predefined scale, ensuring consistency in padding and margins.

## Components and UI Elements

The UI is built using **Shadcn/UI** components, which are customized for the project's theme.

-   **Buttons**: Solid fill for primary actions, outline style for secondary actions. They feature rounded corners (`rounded-md`) and a subtle transition on hover.
-   **Cards**: Used for displaying content blocks like tickets, dashboard stats, and features. They have rounded corners (`rounded-lg`), a light border, and a soft box-shadow.
-   **Forms**: Inputs and labels are clean and simple. Active/focused inputs are highlighted with the primary color (`ring-ring`). Validation errors are shown inline, directly below the respective field.
-   **Icons**: Outline-style icons from `lucide-react` are used to visually represent actions (edit, delete), statuses, and other UI elements.
-   **Sidebar**: The protected routes feature a vertical sidebar for navigation on desktop. It uses the `Sidebar` component from `src/components/ui/sidebar.tsx` and has a spacious design with extra padding on menu items. The active link has a semi-transparent blue background.
-   **Dialogs & Modals**: Used for creating/editing tickets (`TicketDialog`) and for confirming deletions (`DeleteTicketDialog`).
-   **Badges**: Used to display ticket status and priority, with distinct colors for quick identification.

### Decorative Elements

-   **Wavy Background**: The hero section on the landing page features a wavy shape at the bottom, created using an SVG in the `Hero.tsx` component.
-   **Circles**: Large, decorative, blurred circles are used in the background of the hero and features sections to add depth and visual interest. These are created with `div` elements styled with Tailwind CSS (`rounded-full`, `blur-3xl`, `animate-blob`).
-   **Dotted Breaker**: On the tickets page, a dashed line with a central label ("Closed Tickets") is used to visually separate active tickets from closed ones. This is implemented in `TicketList.tsx`.
