# Productivity Engines Backend

This directory contains the backend API and agents for Productivity Engines.

## Architecture

The backend is structured as follows:

- `adaptor.py`: Main entry point that starts the FastAPI server and imports the agent(s)
- `agents/`: Directory containing all agent modules
  - `agents/marketing.py`: Marketing Research Agent implementation
  - `agents/__init__.py`: Registry of all available agents
- `auth/`: Authentication-related code
- `routes/`: API routes
- `static/` & `templates/`: Static files and HTML templates
- `utils/`: Utility functions
- `test_agent.py`: Script to test the agent API

## Running the Backend

The backend can be run from the root directory using:

```bash
python run.py
```

This script manages port allocation, starts the server, and provides helpful output.

## Testing

You can test the API using:

```bash
python backend/test_agent.py
```

## Adding New Agents

To add a new agent:

1. Create a new file in `agents/` (e.g., `agents/process_analysis.py`)
2. Implement the required interface (similar to `marketing.py`)
3. Register it in `agents/__init__.py` by adding it to the `AVAILABLE_AGENTS` dictionary

## API Endpoints

- `/`: Home page
- `/health`: Health check endpoint
- `/run_agent`: Legacy agent endpoint for backward compatibility
- `/agents/marketing`: Marketing agent endpoint

## Notes

The `main.py` file is kept for reference but is not currently in use. The active backend implementation is in `adaptor.py`. 