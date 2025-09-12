# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Frontend Dev**: `cd frontend && npm run dev` (localhost:3000)
- **Backend Dev**: `python run.py` (localhost:8000) 
- **Frontend Lint**: `cd frontend && npm run lint`
- **Frontend Build**: `cd frontend && npm run build`
- **Backend Test**: `python backend/test_agent.py [business_name] [website_url]`

## Project Architecture
- **Frontend**: Next.js 15 with TypeScript in `/frontend` directory
- **Backend**: FastAPI with Python in `/backend` directory  
- **Database**: Supabase PostgreSQL with Row Level Security
- **Auth**: Supabase Auth with Google OAuth
- **Styling**: Tailwind CSS v4 with Radix UI components
- **State Management**: React hooks with Supabase client
- **Deployment**: Frontend on Vercel, Backend on Render/Heroku

## Key Structure
```
/frontend/src/
  app/           # Next.js app router pages
  components/    # React components
  lib/           # Utilities and configuration
  types/         # TypeScript type definitions
/backend/
  agents/        # Agent implementations
  main.py        # FastAPI application
  adaptor.py     # Server adapter
```

## Development Notes  
- Frontend uses absolute imports with `@/` path alias
- Backend uses FastAPI with Pydantic models for validation
- Database schema defined in `database-schema.sql`
- Agent configurations stored in Supabase `agent_configs` table
- All user data protected by Row Level Security policies