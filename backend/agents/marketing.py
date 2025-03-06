"""
Marketing Research Agent - Analyzes businesses and provides marketing insights

This agent uses Tavily for search capabilities and OpenAI for analysis.
"""

import os
import json
import requests
from typing import Dict, Any, Optional
from pydantic import BaseModel
import openai

# Global variables that will be populated in init()
openai_client = None
TAVILY_API_KEY = None

# ----------------------------------------------------------------
# API Models
# ----------------------------------------------------------------
class MarketingAgentRequest(BaseModel):
    business_name: str
    website_url: str
    previous_response: Optional[str] = ""
    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7
    
class MarketingAgentResponse(BaseModel):
    analysis: str
    search_query: str
    model_used: str
    
    # Configure model to disable protected namespace warnings
    model_config = {
        "protected_namespaces": ()
    }

# ----------------------------------------------------------------
# Setup / Initialization
# ----------------------------------------------------------------
def init(openai_api_key=None, tavily_api_key=None):
    """Initialize the agent with API keys."""
    global openai_client, TAVILY_API_KEY
    
    # Use provided keys or fall back to environment variables
    openai_api_key = openai_api_key or os.environ.get("OPENAI_API_KEY")
    TAVILY_API_KEY = tavily_api_key or os.environ.get("TAVILY_API_KEY")
    
    # Initialize OpenAI client
    try:
        # Try the new client method first
        openai_client = openai.OpenAI(api_key=openai_api_key)
    except TypeError:
        # Fall back to using the older method if there's a TypeError
        openai.api_key = openai_api_key
        openai_client = openai
    
    if not openai_api_key:
        print("Warning: OpenAI API key is not set for Marketing Agent.")
    if not TAVILY_API_KEY:
        print("Warning: Tavily API key is not set for Marketing Agent. Search functionality will be limited.")

# ----------------------------------------------------------------
# Tavily AI Search Tool
# ----------------------------------------------------------------
def tavily_ai_search(query: str) -> Dict[str, Any]:
    """
    Perform search using Tavily AI search API.
    
    Args:
        query: The search query
        
    Returns:
        Dictionary containing search results
    """
    try:
        if not TAVILY_API_KEY:
            # Return mock data if no API key is available
            return {
                "results": [
                    {
                        "title": f"Mock result for: {query}",
                        "url": "https://example.com",
                        "content": f"This is a placeholder result for the query: {query}. In a real implementation, this would contain actual search results from Tavily AI."
                    }
                ],
                "query": query
            }
        
        # Try both header formats for Tavily API
        headers = {
            "Content-Type": "application/json",
            "X-API-Key": TAVILY_API_KEY,
            "Authorization": f"Bearer {TAVILY_API_KEY}"  # Adding Bearer token format as well
        }
        
        payload = {
            "query": query,
            "search_depth": "advanced",
            "include_domains": [],
            "exclude_domains": [],
            "max_results": 5
        }
        
        response = requests.post(
            "https://api.tavily.com/search",
            headers=headers,
            json=payload
        )
        
        if response.status_code != 200:
            # Try alternative endpoint format
            alt_response = requests.post(
                "https://api.tavily.com/v1/search",
                headers=headers,
                json=payload
            )
            if alt_response.status_code == 200:
                return alt_response.json()
            raise Exception(f"Tavily API returned status code {response.status_code}: {response.text}")
        
        return response.json()
    
    except Exception as e:
        print(f"Error in Tavily search: {str(e)}")
        # Return an error result
        return {
            "error": str(e),
            "results": [],
            "query": query
        }

def format_tavily_results(search_results: Dict[str, Any]) -> str:
    """
    Format Tavily search results into a readable string.
    
    Args:
        search_results: The raw search results from Tavily
        
    Returns:
        Formatted string of search results
    """
    if "error" in search_results:
        return f"Error in search: {search_results['error']}"
    
    formatted_results = []
    
    for i, result in enumerate(search_results.get("results", []), 1):
        title = result.get("title", "No title")
        url = result.get("url", "No URL")
        content = result.get("content", "No content")
        
        formatted_results.append(f"[{i}] {title}\nURL: {url}\n{content}\n")
    
    if not formatted_results:
        return "No search results found."
    
    return "\n".join(formatted_results)

# ----------------------------------------------------------------
# Prompt Building
# ----------------------------------------------------------------
def build_prompt(
    previous_response: str,
    business_name: str,
    website_url: str,
    search_results: str,
) -> str:
    """
    Build the prompt for the OpenAI model.
    
    Args:
        previous_response: Previous conversation context (if any)
        business_name: Name of the business to research
        website_url: Website URL of the business
        search_results: Formatted search results from Tavily
        
    Returns:
        Formatted prompt string
    """
    # Start with any previous context
    context = previous_response + "\n\n" if previous_response else ""
    
    # Build the main prompt
    return f"""{context}You are an expert marketing and research agent specializing in business analysis.

TASK:
Analyze and provide valuable insights for the business: '{business_name}'
Website: '{website_url}'

SEARCH RESULTS:
{search_results}

ANALYSIS STEPS:
1. Identify the business sector, target audience, and value proposition
2. Analyze market positioning based on the search results
3. Evaluate their online presence and marketing strategy
4. Identify potential strengths, weaknesses, opportunities, and threats
5. Extract key insights that could help improve their marketing strategy

FORMAT YOUR RESPONSE AS FOLLOWS:

## BUSINESS OVERVIEW
[Concise summary of the business, its offerings, and target market]

## MARKET POSITIONING
[Analysis of how the business positions itself in its market]

## ONLINE PRESENCE
[Assessment of website, social media, and digital footprint]

## SWOT ANALYSIS
- Strengths: [Key strengths identified]
- Weaknesses: [Areas for improvement]
- Opportunities: [Potential growth areas]
- Threats: [Competitive or market challenges]

## KEY MARKETING INSIGHTS
[3-5 actionable insights that could help improve their marketing strategy]

## SOURCES ANALYSIS
[Brief assessment of the quality and credibility of sources used]

Keep your analysis evidence-based, actionable, and focused on marketing insights that provide genuine value.
"""

# ----------------------------------------------------------------
# Main Agent Logic
# ----------------------------------------------------------------
def run_analysis(request: MarketingAgentRequest) -> MarketingAgentResponse:
    """
    Run the marketing analysis agent.
    
    Args:
        request: The marketing agent request parameters
        
    Returns:
        Marketing agent response with analysis
    """
    # Construct search query from business name and website
    search_query = f"{request.business_name} company business info marketing strategy {request.website_url}"
    
    # Perform search using Tavily AI
    search_results = tavily_ai_search(search_query)
    formatted_results = format_tavily_results(search_results)
    
    # Build the prompt for OpenAI
    prompt = build_prompt(
        request.previous_response,
        request.business_name,
        request.website_url,
        formatted_results
    )
    
    # Use OpenAI to generate the analysis
    try:
        # First try the newer OpenAI client approach
        if hasattr(openai_client, "chat") and hasattr(openai_client.chat, "completions"):
            response = openai_client.chat.completions.create(
                model=request.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=request.temperature,
                max_tokens=2500
            )
            
            # New client returns structured object
            analysis = response.choices[0].message.content
            model_used = response.model
            
        # Fall back to older OpenAI client approach
        else:
            response = openai_client.ChatCompletion.create(
                model=request.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=request.temperature,
                max_tokens=2500
            )
            # Old client returns dict
            analysis = response["choices"][0]["message"]["content"]
            model_used = response["model"]
        
        # Return the analysis
        return MarketingAgentResponse(
            analysis=analysis,
            search_query=search_query,
            model_used=model_used
        )
        
    except Exception as e:
        # Handle OpenAI API errors
        error_message = f"Error generating analysis: {str(e)}"
        return MarketingAgentResponse(
            analysis=error_message,
            search_query=search_query,
            model_used=request.model
        ) 