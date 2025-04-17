# Sylva Board

Sylva Board is a modern, feature-rich collaborative board application built with Next.js 15, Supabase, and TipTap. It provides a powerful platform for creating, managing, and collaborating on boards with rich text editing capabilities.

## Features

- 🎨 Rich text editing with TipTap
- 🔄 Real-time collaboration
- 🎯 Task management
- 📊 Table support
- 🖼️ Image embedding
- 🎨 Color formatting
- 🌙 Dark mode support
- ⚡ Fast and responsive UI
- 🔒 Secure authentication with Supabase

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Database:** Supabase
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Rich Text Editor:** TipTap
- **State Management:** Zustand
- **Flow Diagrams:** React Flow
- **Type Safety:** TypeScript

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sylva-board.git
cd sylva-board
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run serve` - Start Supabase locally and run the development server

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── core/         # Core business logic
├── features/     # Feature-specific components and logic
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
└── infrastructures/ # External service integrations
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
