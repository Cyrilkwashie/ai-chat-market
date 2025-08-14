# Business Management Platform

A comprehensive business management platform built with React, TypeScript, and Supabase. This application provides businesses with tools to manage products, orders, customers, services, and deliveries all in one place.

## 🚀 Features

### Core Functionality
- **Dashboard Overview** - Business analytics and key metrics
- **Product Management** - Add, edit, and track inventory
- **Order Management** - Process and track customer orders
- **Customer Management** - Maintain customer database with VIP features
- **Service Management** - Manage service offerings and bookings
- **Delivery Tracking** - Track delivery status and manage logistics

### Authentication & Onboarding
- User authentication with Supabase Auth
- Multi-step business onboarding flow
- Profile management with business details

### User Interface
- Modern, responsive design with Tailwind CSS
- Dark/light mode support
- Mobile-optimized interface
- Intuitive sidebar navigation

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast development and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend (Supabase)
- **PostgreSQL** - Robust relational database
- **Supabase Auth** - Built-in authentication
- **Row Level Security (RLS)** - Data security policies
- **Edge Functions** - Serverless API endpoints (Deno runtime)
- **Real-time subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **React Query** - Server state management

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   └── dashboard/      # Dashboard-specific components
│   ├── pages/              # Application pages/routes
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── assets/             # Static assets
│   └── integrations/       # External service integrations
│       └── supabase/       # Supabase client and types
├── supabase/               # Backend configuration
│   ├── functions/          # Edge functions (API endpoints)
│   ├── migrations/         # Database schema changes
│   └── config.toml         # Supabase configuration
└── public/                 # Static files
```

## 🗄️ Database Schema

### Core Tables
- **profiles** - User business profiles and settings
- **customers** - Customer information and contact details
- **products** - Product catalog with inventory tracking
- **services** - Service offerings and pricing
- **orders** - Customer orders and status tracking
- **order_items** - Individual items within orders
- **deliveries** - Delivery tracking and logistics

### Security
All tables implement Row Level Security (RLS) policies to ensure users can only access their own data.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd business-management-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Update `src/integrations/supabase/client.ts` with your credentials

4. **Run database migrations**
   ```bash
   npx supabase migration up
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup
The project is configured to work with Supabase. Key configuration files:
- `supabase/config.toml` - Project configuration
- `src/integrations/supabase/client.ts` - Supabase client setup
- `src/integrations/supabase/types.ts` - Auto-generated TypeScript types

### Environment Variables
The project uses Supabase's built-in configuration. No additional environment variables are required for basic functionality.

## 📊 Database Management

### Migrations
Database changes are managed through Supabase migrations:
```bash
# Create a new migration
npx supabase migration new migration_name

# Apply migrations
npx supabase migration up
```

### Edge Functions
API endpoints are created as Supabase Edge Functions in `supabase/functions/`:
```typescript
// Example edge function structure
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Your API logic here
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})
```

## 🔐 Authentication & Security

### Authentication Flow
1. Users sign up through the onboarding flow
2. Business profile is automatically created
3. User is redirected to dashboard upon successful authentication

### Row Level Security
All database tables implement RLS policies:
- Users can only access their own data
- Policies are applied at the database level
- Ensures data isolation between different businesses

## 🎨 UI/UX Guidelines

### Design System
The project uses a consistent design system built on:
- **Semantic color tokens** - Defined in `src/index.css`
- **Component variants** - Implemented in Shadcn/ui components
- **Responsive design** - Mobile-first approach
- **Accessibility** - ARIA labels and keyboard navigation

### Theming
Colors and styling are managed through CSS custom properties in `src/index.css` and extended in `tailwind.config.ts`.

## 📱 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- Firebase Hosting

### Backend Deployment
Supabase handles all backend deployment automatically:
- Database migrations are applied automatically
- Edge functions are deployed with your project
- No server management required

## 🤝 Contributing

### Development Workflow
1. Create a feature branch from main
2. Make your changes
3. Test thoroughly
4. Submit a pull request

### Code Standards
- Use TypeScript for all new code
- Follow the existing component structure
- Implement proper error handling
- Add appropriate TypeScript types

## 📚 API Documentation

### Supabase Client Usage
```typescript
import { supabase } from "@/integrations/supabase/client"

// Fetch data
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('user_id', userId)

// Insert data
const { error } = await supabase
  .from('products')
  .insert({ name: 'New Product', user_id: userId })
```

### Edge Functions
Call edge functions from the frontend:
```typescript
const { data, error } = await supabase.functions.invoke('function-name', {
  body: { payload: 'data' }
})
```

## 🐛 Troubleshooting

### Common Issues
1. **Authentication errors** - Verify Supabase credentials
2. **Database access denied** - Check RLS policies
3. **Build errors** - Ensure all dependencies are installed

### Debug Mode
Enable development mode to access code inspection and debugging tools.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Contact the development team

---

Built with ❤️ using React, TypeScript, and Supabase