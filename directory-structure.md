# Productivity Engines - Directory Structure

```
productivity-engines-site/
├── .github/                      # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml                # Continuous Integration workflow
│       └── deploy.yml            # Deployment workflow
│
├── productivity-engines-frontend/# Next.js Frontend (runs on port 3000)
│   ├── public/                   # Static assets
│   │   ├── images/               # Image assets
│   │   └── favicon.ico           # Favicon
│   │
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── (auth)/           # Authentication routes
│   │   │   │   ├── login/        # Login page
│   │   │   │   ├── register/     # Registration page
│   │   │   │   └── auth-test/    # Authentication diagnostics page
│   │   │   │
│   │   │   ├── (dashboard)/      # Dashboard routes (authenticated)
│   │   │   │   ├── agents/       # Agent listing and selection
│   │   │   │   │   └── [id]/     # Individual agent pages
│   │   │   │   ├── profile/      # User profile
│   │   │   │   └── settings/     # User settings
│   │   │   │
│   │   │   ├── (marketing)/      # Public marketing pages
│   │   │   │   ├── about/        # About us
│   │   │   │   └── services/     # Services offered
│   │   │   │
│   │   │   ├── api/              # API routes
│   │   │   │   └── auth/         # Authentication API routes
│   │   │   │
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Home page
│   │   │
│   │   ├── components/           # React components
│   │   │   ├── auth/             # Authentication components
│   │   │   │   ├── AuthForm.tsx  # Authentication form
│   │   │   │   └── SupabaseTest.tsx # Test component for Supabase connectivity
│   │   │   ├── common/           # Common UI components
│   │   │   ├── dashboard/        # Dashboard components
│   │   │   ├── agents/           # Agent-specific components
│   │   │   └── marketing/        # Marketing page components
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions and libraries
│   │   │   ├── api.ts            # API client
│   │   │   ├── supabase.ts       # Supabase client configuration
│   │   │   ├── auth-context.tsx  # Authentication context provider
│   │   │   └── utils.ts          # General utilities
│   │   │
│   │   ├── models/               # TypeScript type definitions
│   │   │   ├── agent.ts          # Agent types
│   │   │   ├── auth.ts           # Authentication types
│   │   │   └── user.ts           # User types
│   │   │
│   │   ├── styles/               # Global styles
│   │   │   └── globals.css       # Global CSS (Tailwind imports)
│   │   │
│   │   └── middleware.ts         # Next.js middleware for auth protection
│   │
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Frontend dependencies
│   ├── next.config.js            # Next.js configuration
│   ├── .env                      # Environment variables with PORT=3000
│   └── .env.local                # Local environment variables (Supabase credentials)
│
├── backend/                      # FastAPI Backend (runs on port 8000)
│   ├── app/                      # Application code
│   │   ├── api/                  # API endpoints
│   │   │   ├── auth.py           # Authentication endpoints
│   │   │   ├── agents.py         # Agent endpoints
│   │   │   └── users.py          # User endpoints
│   │   │
│   │   ├── core/                 # Core functionality
│   │   │   ├── config.py         # Application configuration
│   │   │   ├── security.py       # Security utilities
│   │   │   └── dependencies.py   # FastAPI dependencies
│   │   │
│   │   ├── db/                   # Database models and connections
│   │   │   ├── mongodb.py        # MongoDB connection
│   │   │   └── redis.py          # Redis connection
│   │   │
│   │   ├── models/               # Pydantic models
│   │   │   ├── agent.py          # Agent models
│   │   │   ├── user.py           # User models
│   │   │   └── auth.py           # Authentication models
│   │   │
│   │   ├── services/             # Business logic
│   │   │   ├── agent_service.py  # Agent execution service
│   │   │   ├── auth_service.py   # Authentication service
│   │   │   └── user_service.py   # User management service
│   │   │
│   │   ├── agents/               # Agent implementations
│   │   │   ├── base.py           # Base agent class
│   │   │   ├── marketing.py      # Marketing Research Agent
│   │   │   ├── conversational.py # Private AI Agent
│   │   │   └── process.py        # Process Analysis Agent
│   │   │
│   │   └── utils/                # Utility functions
│   │       ├── openai.py         # OpenAI API utilities
│   │       └── tavily.py         # Tavily API utilities
│   │
│   ├── tests/                    # Test directory
│   │   ├── conftest.py           # Test configuration
│   │   ├── api/                  # API tests
│   │   ├── services/             # Service tests
│   │   └── agents/               # Agent tests
│   │
│   ├── requirements.txt          # Python dependencies
│   ├── pyproject.toml            # Python project configuration
│   ├── Dockerfile                # Backend Dockerfile
│   ├── run.py                    # Robust run script with port conflict handling
│   └── main.py                   # Application entry point
│
├── docker-compose.yml            # Docker Compose configuration
├── .env.example                  # Example environment variables
├── README.md                     # Project README
├── README-auth.md                # Authentication setup documentation
└── Makefile                      # Development commands
``` 