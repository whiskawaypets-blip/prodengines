# Productivity Engines Development Guide

## Commands
- **Frontend Dev**: `cd productivity-engines-frontend && npm run dev` (localhost:3000)
- **Backend Dev**: `python run.py` (localhost:8000)
- **Frontend Lint**: `cd productivity-engines-frontend && npm run lint`
- **Frontend Build**: `cd productivity-engines-frontend && npm run build`
- **Backend Test**: `python backend/test_agent.py [business_name] [website_url]`

## Code Style Guidelines
- **TypeScript**: Strict typing, typed props interfaces for components
- **Components**: PascalCase naming, 'use client' directive when needed
- **Imports**: React/Next first, components second, utils third, external last
- **Python**: PEP 8, 4-space indentation, docstrings, type hints
- **Error Handling**: Try/catch blocks with specific error handling
- **Styling**: Tailwind CSS with shadcn/ui components
- **Architecture**: Next.js frontend, FastAPI backend, Supabase auth
- **API**: REST endpoints with Pydantic models

Use absolute imports with path aliases (`@/components/...`) in frontend code.
Follow established component directory structure: ui, layout, marketing, auth.