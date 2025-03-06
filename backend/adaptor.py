#!/usr/bin/env python
"""
Adaptor server that connects the working basic server with our marketing agent logic
"""

import os
import sys
import uvicorn
from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import Optional

# Create paths
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Import agent directly from the file
from agents.marketing import (
    run_analysis,
    MarketingAgentRequest,
    MarketingAgentResponse,
    init as init_marketing
)

# Initialize the agent
init_marketing()

# Create a new FastAPI app
app = FastAPI(
    title="Marketing Agent API",
    description="API for the Marketing Research Agent",
    version="1.0.0"
)

# Add routes
@app.get("/")
def root():
    return {"message": "Marketing Agent API is running"}

@app.get("/health")
def health():
    return {"status": "healthy", "agent": "marketing"}

@app.post("/run_agent", response_model=MarketingAgentResponse)
def run_marketing_agent(request: MarketingAgentRequest = Body(...)):
    """Run the marketing research agent"""
    return run_analysis(request)

if __name__ == "__main__":
    print("Starting Marketing Agent API on port 8000...")
    print("Try visiting http://localhost:8000/ in your browser")
    uvicorn.run(app, host="0.0.0.0", port=8000) 