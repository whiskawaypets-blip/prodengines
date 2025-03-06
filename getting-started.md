# Productivity Engines - Getting Started (Supabase Version)

This guide will help you set up the Productivity Engines project for development.

## Prerequisites

- Node.js (v18+)
- Python (3.10+) - Only needed if developing advanced agent functionality
- Git
- Supabase account (free tier is sufficient for development)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/productivity-engines-site.git
cd productivity-engines-site
```

## Step 2: Supabase Setup

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)

2. Set up database tables:
   - Navigate to the SQL Editor in your Supabase dashboard
   - Run the database setup scripts from `database/schema.sql`
   - Verify tables are created correctly

3. Configure authentication:
   - In the Authentication section, enable Email and Google providers
   - Set up your Google OAuth credentials in Google Cloud Console
   - Add the redirect URLs to your Google OAuth configuration

4. Get your Supabase credentials:
   - Go to Project Settings > API
   - Copy your URL and anon key for the next step

## Step 3: Frontend Environment Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

3. Update the `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   OPENAI_API_KEY=your-openai-api-key
   TAVILY_API_KEY=your-tavily-api-key
   ```

## Step 4: Running the Frontend

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Access the application:
   - Open your browser and navigate to http://localhost:3000

## Step 5: Agent API Setup (Only if needed)

If you need to run the agent functionality that can't be handled by Supabase:

1. Create a virtual environment:
   ```bash
   cd agent-api
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. Start the API server:
   ```bash
   uvicorn main:app --reload
   ```

## Step 6: Development Workflow

### Frontend Development

1. Make changes to the Next.js application
2. Test locally with `npm run dev`
3. Run tests with `npm test`
4. Commit and push changes to GitHub

### Supabase Development

1. Use the Supabase web interface to make schema changes and test RLS policies
2. Export schema changes and save them to the `database/schema.sql` file
3. For complex migrations, create migration files in `database/migrations/`

### Agent API Development (if needed)

1. Modify agent functionality in the `agent-api` directory
2. Test locally with FastAPI's auto-reload
3. Run tests with pytest

## Step 7: Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - OPENAI_API_KEY
   - TAVILY_API_KEY
3. Deploy with the Vercel dashboard or GitHub integration

### Agent API Deployment (Render or Heroku)

1. For Render:
   - Create a new Web Service
   - Connect your GitHub repository
   - Set the build command: `pip install -r requirements.txt`
   - Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Configure environment variables

2. For Heroku:
   - Create a new app
   - Connect your GitHub repository
   - Add a `Procfile` with: `web: uvicorn main:app --host=0.0.0.0 --port=$PORT`
   - Configure environment variables

## Helpful Commands

### Frontend

- Development server: `npm run dev`
- Build for production: `npm run build`
- Start production build: `npm start`
- Run tests: `npm test`
- Lint code: `npm run lint`

### Supabase CLI (Optional)

If you want to use the Supabase CLI for local development:

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Start local Supabase:
   ```bash
   supabase start
   ```

3. Apply migrations:
   ```bash
   supabase db reset
   ```

## Troubleshooting

### Common Issues

1. **Authentication Issues**
   - Verify Supabase Auth settings
   - Check Google OAuth configuration
   - Ensure redirect URLs are correct

2. **Database Access Issues**
   - Check RLS policies in Supabase
   - Verify client has correct permissions
   - Check for any errors in SQL queries

3. **Agent API Connection Issues**
   - Verify API URL is correct
   - Check CORS settings
   - Ensure environment variables are set correctly

4. **Deployment Issues**
   - Verify environment variables in deployment platform
   - Check build logs for errors
   - Ensure dependencies are correctly specified

## Next Steps

After setting up the development environment, here are the suggested next steps:

1. Implement the landing page based on the site plan
2. Set up Supabase authentication
3. Create the dashboard layout
4. Refactor the existing Marketing Research Agent for serverless functions
5. Implement additional agent types 