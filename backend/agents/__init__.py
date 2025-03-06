"""
Agent Registry

This module serves as a central registry for all available agents.
New agents can be added here to make them discoverable by the main application.
"""

# Import all agent modules here
from . import marketing

# Registry of available agents
AVAILABLE_AGENTS = {
    "marketing": {
        "name": "Marketing Research Agent",
        "module": marketing,
        "description": "Analyzes businesses and provides marketing insights",
        "version": "1.0.0",
    }
    # Add new agents to this registry as they are created
    # "agent_name": {
    #     "name": "Human-Readable Name",
    #     "module": module_reference,
    #     "description": "Description of what the agent does",
    #     "version": "1.0.0",
    # }
}


def get_agent_info():
    """
    Get information about all available agents.
    
    Returns:
        List of agent information dictionaries
    """
    return [{
        "id": agent_id,
        "name": agent_info["name"],
        "description": agent_info["description"],
        "version": agent_info["version"]
    } for agent_id, agent_info in AVAILABLE_AGENTS.items()]


def initialize_all(openai_api_key=None, tavily_api_key=None):
    """
    Initialize all registered agents with the provided API keys.
    
    Args:
        openai_api_key: OpenAI API key
        tavily_api_key: Tavily API key
    """
    for agent_id, agent_info in AVAILABLE_AGENTS.items():
        if hasattr(agent_info["module"], "init"):
            agent_info["module"].init(
                openai_api_key=openai_api_key,
                tavily_api_key=tavily_api_key
            ) 