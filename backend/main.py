"""
Productivity Engines API Gateway - Main Application - REFERENCE ONLY

This file is kept for reference but is NOT currently in use.
The active backend implementation is in adaptor.py.

This is the entry point for the Productivity Engines backend API.
It serves as a gateway to various AI agents and services.
"""

import os
import sys
import importlib
from fastapi import FastAPI, Body, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from dotenv import load_dotenv

# Fix imports to use proper relative imports
from .agents import AVAILABLE_AGENTS, get_agent_info, initialize_all
from .agents import marketing

# Load environment variables from .env file if it exists
load_dotenv()

# Initialize the FastAPI app
app = FastAPI(
    title="Productivity Engines API",
    description="Gateway to AI-powered productivity agents and services",
    version="1.0.0"
)

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize templates and static files
templates_dir = os.path.join(os.path.dirname(__file__), "templates")
static_dir = os.path.join(os.path.dirname(__file__), "static")

# Create directories if they don't exist
os.makedirs(templates_dir, exist_ok=True)
os.makedirs(static_dir, exist_ok=True)

# Set up Jinja2 templates
templates = Jinja2Templates(directory=templates_dir)

# Mount static files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Initialize all agents
initialize_all(
    openai_api_key=os.environ.get("OPENAI_API_KEY"),
    tavily_api_key=os.environ.get("TAVILY_API_KEY")
)

# ----------------------------------------------------------------
# API Routes
# ----------------------------------------------------------------

# List available agents
@app.get("/agents")
def list_agents():
    """
    List all available agents in the system.
    
    Returns information about each registered agent.
    """
    return get_agent_info()

# Marketing Agent Endpoint - Legacy URL for compatibility
@app.post("/run_agent", response_model=marketing.MarketingAgentResponse)
def run_marketing_agent_legacy(request: marketing.MarketingAgentRequest = Body(...)):
    """
    Run the marketing research agent to analyze a business (legacy endpoint).
    
    This endpoint is maintained for backwards compatibility.
    """
    return run_marketing_agent(request)

# Marketing Agent Endpoint - New URL format
@app.post("/agents/marketing", response_model=marketing.MarketingAgentResponse)
def run_marketing_agent(request: marketing.MarketingAgentRequest = Body(...)):
    """
    Run the marketing research agent to analyze a business.
    
    This endpoint takes business details and returns a marketing analysis.
    """
    try:
        return marketing.run_analysis(request)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error running marketing agent: {str(e)}"
        )

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint to verify the API is running."""
    return {"status": "healthy", "version": app.version, "agents": len(AVAILABLE_AGENTS)}

# Home page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the home page."""
    return templates.TemplateResponse("index.html", {"request": request})

# ----------------------------------------------------------------
# Run the application
# ----------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    
    # Get host and port from environment or use defaults
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    
    print(f"Starting Productivity Engines API on {host}:{port}")
    print(f"Available agents: {len(AVAILABLE_AGENTS)}")
    for agent in get_agent_info():
        print(f"  - {agent['name']} (v{agent['version']})")
    
    uvicorn.run("main:app", host=host, port=port, reload=True) 