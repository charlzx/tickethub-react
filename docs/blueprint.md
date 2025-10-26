# **App Name**: TicketHub

## Core Features:

- Landing Page: Display the app's name, description, and CTAs with a wavy background, decorative circles, and box-shaped sections.
- Authentication: Implement login and signup pages with form validation and session management using localStorage or mock API.
- Dashboard: Show summary statistics for total, open, and resolved tickets, navigation links, and a logout button.
- Ticket Management (CRUD): Enable users to create, read, update, and delete tickets with real-time validation and feedback.
- Data Validation: Ensure mandatory fields are completed and status fields accept only 'open', 'in_progress', or 'closed' values, providing user-friendly error messages.
- Error Handling: Handle invalid inputs, unauthorized access, and failed network calls with clear error messages and redirection.
- Security & Authorization: Protect dashboard and ticket management pages, redirecting unauthorized users to login and clearing the session on logout.

## Style Guidelines:

- Primary color: Deep Blue (#2962FF) to convey trust and professionalism.
- Background color: Very light gray (#F5F7FA) for a clean, modern feel.
- Accent color: Vivid Orange (#FF6B00) for interactive elements and highlights.
- Body text: 'Inter', a grotesque-style sans-serif for a modern, machined, objective, neutral look; great for long blocks of text.
- Headline text: 'Space Grotesk' sans-serif with a computerized, techy feel. (Note: currently only Google Fonts are supported.)
- Use clear, outline-style icons to represent ticket status, actions, and categories.
- Ensure max-width of 1440px, centered layout on large screens, with a wavy SVG background and decorative circles. Card-like boxes for stats, tickets, and features.
- Subtle animations on form submissions, status changes, and page transitions.