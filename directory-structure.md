# Productivity Engines - Directory Structure

```
productivity-engines-site/
├── .github/                      # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml                # Continuous Integration workflow
│       └── deploy.yml            # Deployment workflow
│
├── frontend/                     # Next.js Frontend
│   ├── public/                   # Static assets
│   │   ├── images/               # Image assets
│   │   └── favicon.ico           # Favicon
│   │
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── (auth)/           # Authentication routes
│   │   │   │   ├── login/        # Login page
│   │   │   │   └── register/     # Registration page
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
│   │   │   ├── common/           # Common UI components
│   │   │   ├── dashboard/        # Dashboard components
│   │   │   ├── agents/           # Agent-specific components
│   │   │   └── marketing/        # Marketing page components
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions and libraries
│   │   │   ├── api.ts            # API client
│   │   │   ├── auth.ts           # Authentication utilities
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
│   │   └── providers/            # React context providers
│   │       ├── auth-provider.tsx # Authentication provider
│   │       └── theme-provider.tsx# Theme provider
│   │
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Frontend dependencies
│   └── next.config.js            # Next.js configuration
│
├── backend/                      # FastAPI Backend
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
│   └── main.py                   # Application entry point
│
├── docker-compose.yml            # Docker Compose configuration
├── .env.example                  # Example environment variables
├── README.md                     # Project README
└── Makefile                      # Development commands
``` 