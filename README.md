# Alma LegalTech Lead Management System

A Next.js application for managing immigration case leads, featuring a public lead submission form and an internal lead management UI.

## System Architecture

### Overview
The application follows a modern web architecture using Next.js 13+ with the App Router, implementing a client-server architecture with the following key components:

```
src/
├── app/                    # Next.js app directory (App Router)
│   ├── api/               # API routes (Server-side)
│   │   ├── auth/         # Authentication endpoints
│   │   └── leads/        # Lead management endpoints
│   ├── admin/            # Admin dashboard pages
│   └── lead-form/        # Public lead form page
├── components/           # React components
│   └── LeadForm.tsx      # Lead form implementation
├── redux/               # State management
│   ├── features/        # Redux slices
│   ├── provider.tsx     # Redux provider
│   └── store.ts         # Store configuration
└── services/          # Shared services and utilities
```

### Component Architecture

#### Lead Form
- **Form Validation**: Custom validation with error handling
- **File Handling**: Supports file uploads with size validation
- **Responsive Design**: Mobile-first approach with breakpoints

#### Admin Dashboard
- **Protected Routes**: Middleware-based authentication
- **Lead Management**: CRUD operations for leads
- **State Management**: Redux for global state
- **Search & Filter**: Client-side filtering and sorting
- **Pagination**: Server-side pagination implementation

### Data Flow

1. **Lead Submission**:
   ```
   Client -> API Route -> FormData Processing -> Lead Storage
   ```

2. **Lead Management**:
   ```
   Admin UI -> API Route -> Lead Retrieval -> Redux Store -> UI Update
   ```

3. **Authentication Flow**:
   ```
   Login -> API Route -> Session Cookie -> Protected Routes
   ```

### State Management

The application uses Redux Toolkit for state management with the following structure:

```typescript
interface RootState {
  leads: {
    items: Lead[];
    loading: boolean;
    error: string | null;
  }
}
```

### API Routes

#### Lead Management
- `POST /api/leads`: Submit new lead
- `GET /api/leads`: Retrieve leads (protected)
- `PUT /api/leads/:id`: Update lead status

#### Authentication
- `POST /api/auth/login`: Admin login
- `POST /api/auth/logout`: Admin logout

### Security

- **Authentication**: Cookie-based session management
- **Protected Routes**: Middleware-based route protection
- **File Upload**: Size and type validation
- **Input Validation**: Custom validation rules

### Performance Considerations

- **Client-Side Caching**: Redux for state persistence
- **Server-Side Rendering**: Next.js App Router
- **Code Splitting**: Dynamic imports for large components
- **Image Optimization**: Next.js Image component

## System Design

### Component & Data Flow Diagram (Textual)

```
[User] → [LeadForm Component] → [API Route: /api/leads] → [Redux Store] → [Admin Dashboard]
```

- **User** submits a lead via the public form.
- **LeadForm** validates and sends data to the API.
- **API Route** processes and stores the lead.
- **Redux Store** manages state for the admin dashboard.
- **Admin Dashboard** displays, filters, and updates leads.

### Main Components & Interactions

- **LeadForm.tsx**: Handles user input, validation, and file upload. Responsive and accessible.
- **Admin Dashboard (src/app/admin/page.tsx)**: Displays leads, supports search, filter, pagination, and status updates. Protected by authentication.
- **Redux (src/redux/)**: Global state for leads, loading, and error states. Used in admin dashboard.
- **API Routes (src/app/api/leads/route.ts)**: Handle CRUD for leads, validate input, and manage file uploads.
- **Authentication**: Session-based, with protected admin routes.

### Data Flow
- **Lead Submission**: User → LeadForm → API → Storage
- **Admin Management**: Admin → Dashboard → Redux → API → Storage

### Technologies & Design Decisions
- **Next.js App Router** for routing and API.
- **Redux Toolkit** for predictable state management.
- **TypeScript** for type safety across all layers.
- **styled-components** for modular, themeable styling.
- **React Hook Form** for form state and validation.
- **Jest & React Testing Library** for unit testing.

## Responsiveness

- All main pages/components use CSS media queries and flexible layouts.
- The lead form and admin dashboard are fully responsive:
  - Layouts adapt to mobile, tablet, and desktop.
  - Font sizes, paddings, and element widths adjust at breakpoints.
  - No horizontal scrolling or overflow on small screens.
- **Tested with:** Chrome DevTools device emulation.

## Type Safety

- All components, Redux slices, and API handlers use TypeScript interfaces and types.
- No use of `any` types in main business logic.
- TypeScript strict mode is enabled in `tsconfig.json`.
- Props and state are strongly typed throughout the codebase.

## Testing

- Jest and React Testing Library are set up.
- Example unit test: `src/components/__tests__/LeadForm.test.tsx` verifies the main fields render in the lead form.
- Extend tests for more coverage as needed.

## Features

- Public lead submission form with file upload
- Internal lead management dashboard
- Form validation and error handling
- Responsive design
- Accessibility compliance
- Authentication system
- API routes for lead management

## Tech Stack

- **Frontend Framework**: Next.js 15.3.2
- **Styling**: styled-components
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **API**: Next.js API Routes

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd alma-legaltech-leads
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication

The admin dashboard is protected and requires authentication. Use the following credentials for testing:

- Username: admin
- Password: admin123

## Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Best Practices
- Component-based architecture
- Responsive design
- Accessibility compliance
- Error handling
- Input validation

### Testing
- Unit tests for components
- Integration tests for API routes
- End-to-end testing

## Deployment

The application can be deployed to any platform that supports Next.js applications:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```