# Assessment Project

This project was developed by Hugo López as part of an assessment. It's a lead management system built with Next.js, TypeScript, and styled-components.

## Live Demo
Visit the live application at: [https://wedevx-eight.vercel.app/lead-form](https://wedevx-eight.vercel.app/lead-form)

Visit the admin dashboard at:

[https://wedevx-eight.vercel.app/admin](https://wedevx-eight.vercel.app/admin)

Credentials:
- Username: admin
- Password: admin123

## Features
- Lead form submission with file upload
- Admin dashboard for lead management
- Responsive design
- Type-safe development with TypeScript
- Modern UI with styled-components

## Tech Stack
- Next.js 14
- TypeScript
- styled-components
- Jest & React Testing Library
- Vercel for deployment

## Setup Guide

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wedevx.git
   cd wedevx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - The lead form will be available at [http://localhost:3000/lead-form](http://localhost:3000/lead-form)
   - The admin dashboard will be available at [http://localhost:3000/admin](http://localhost:3000/admin)

### Development Workflow

1. **Running Tests**
   ```bash
   npm test
   ```

2. **Building for Production**
   ```bash
   npm run build
   ```

3. **Starting Production Server**
   ```bash
   npm start
   ```

## Project Structure
```
src/
├── app/
│   ├── admin/
│   ├── api/
│   └── page.tsx
├── components/
│   ├── LeadForm/
│   └── Admin/
├── styles/
└── utils/
```

## Documentation
For detailed documentation, please refer to:
- [Design Document](./docs/DESIGN.md)