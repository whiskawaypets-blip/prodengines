# Productivity Engines Agent Integration Guide

## Overview

This document provides comprehensive instructions for integrating your Replit-based agent with the Productivity Engines platform. Your agent will be deployed as a containerized application accessible via a subdomain of productivity-engines.com and must integrate with our authentication system, token usage tracking, and overall platform architecture.

## Authentication Integration

### Supabase JWT Verification

All agents must verify user authentication using Supabase JWT tokens:

1. **JWT Token Passing**: The main dashboard will pass the JWT token to your agent via a query parameter or header:
   - Query parameter: `?token=your_jwt_token`
   - Authorization header: `Authorization: Bearer your_jwt_token`

2. **Token Verification**: Your agent must verify this token using the Supabase JWT verification process:

```python
import jwt
import requests
from jwt.exceptions import InvalidTokenError

def verify_token(token):
    try:
        # Fetch JWKS from Supabase
        jwks_url = f"https://{SUPABASE_PROJECT_ID}.supabase.co/auth/v1/jwks"
        jwks_response = requests.get(jwks_url)
        jwks = jwks_response.json()
        
        # Decode and verify the token
        header = jwt.get_unverified_header(token)
        key = next((k for k in jwks['keys'] if k['kid'] == header['kid']), None)
        
        if not key:
            return None
            
        # Verify and decode the token
        decoded = jwt.decode(
            token,
            jwt.algorithms.RSAAlgorithm.from_jwk(key),
            algorithms=['RS256'],
            audience=f"https://{SUPABASE_PROJECT_ID}.supabase.co/auth/v1"
        )
        
        return decoded
    except InvalidTokenError:
        return None
```

3. **User Information**: After verification, extract the user ID from the token to identify the user:

```python
user_id = decoded['sub']  # The subject claim contains the user ID
```

4. **Authentication Middleware**: Implement middleware to check authentication on all routes:

```python
def auth_middleware():
    # For Streamlit, check session state
    if 'user_authenticated' not in st.session_state:
        token = st.experimental_get_query_params().get('token', [None])[0]
        if token:
            user_data = verify_token(token)
            if user_data:
                st.session_state.user_authenticated = True
                st.session_state.user_id = user_data['sub']
                return True
        
        # Not authenticated, show login message
        st.error("Please log in through the main Productivity Engines dashboard")
        return False
    
    return True
```

## Token Usage Tracking

All agents must track token usage for billing purposes:

1. **OpenAI API Wrapper**: Create a wrapper around OpenAI API calls to track token usage:

```python
import openai
import requests
import time

class TrackedOpenAI:
    def __init__(self, api_key, user_id, agent_id):
        self.client = openai.OpenAI(api_key=api_key)
        self.user_id = user_id
        self.agent_id = agent_id
        self.supabase_url = "https://your-project-id.supabase.co"
        self.supabase_key = "your-supabase-anon-key"
    
    def chat_completion(self, messages, model="gpt-4o", **kwargs):
        # Record start time
        start_time = time.time()
        
        # Make the actual API call
        response = self.client.chat.completions.create(
            model=model,
            messages=messages,
            **kwargs
        )
        
        # Calculate duration
        duration = time.time() - start_time
        
        # Record token usage
        prompt_tokens = response.usage.prompt_tokens
        completion_tokens = response.usage.completion_tokens
        
        # Log to Supabase
        self._log_token_usage(model, prompt_tokens, completion_tokens, duration)
        
        return response
    
    def _log_token_usage(self, model, prompt_tokens, completion_tokens, duration):
        # Prepare the data
        usage_data = {
            "user_id": self.user_id,
            "agent_id": self.agent_id,
            "model": model,
            "prompt_tokens": prompt_tokens,
            "completion_tokens": completion_tokens,
            "total_tokens": prompt_tokens + completion_tokens,
            "duration_seconds": duration
        }
        
        # Send to Supabase
        requests.post(
            f"{self.supabase_url}/rest/v1/token_usage",
            json=usage_data,
            headers={
                "apikey": self.supabase_key,
                "Authorization": f"Bearer {self.supabase_key}",
                "Content-Type": "application/json"
            }
        )
```

2. **Usage Reporting**: Implement periodic batch reporting if real-time reporting is not feasible.

## UI Integration

Your agent should follow these UI guidelines for consistent user experience:

1. **Header**: Include a header with the Productivity Engines logo and agent name.

2. **Theme**: Use a compatible color scheme (primary: amber-500, secondary: gray-700).

3. **Responsive Design**: Ensure your UI works on both desktop and mobile devices.

4. **Loading States**: Provide clear loading indicators during API calls.

5. **Error Handling**: Display user-friendly error messages.

## Deployment Configuration

Your agent will be containerized and deployed to a subdomain. Configure your application accordingly:

1. **Port Configuration**: Your application should listen on port 8501 (default Streamlit port).

2. **Environment Variables**: Support these environment variables:
   - `OPENAI_API_KEY`: OpenAI API key
   - `SUPABASE_URL`: Supabase project URL
   - `SUPABASE_KEY`: Supabase anon key
   - `AGENT_ID`: Unique identifier for your agent

3. **Health Check Endpoint**: Implement a `/health` endpoint that returns HTTP 200 when the service is healthy.

4. **Base Path**: Support running under a path prefix (e.g., `/agent-name/`).

## Docker Configuration

Your agent should include a Dockerfile for containerization:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health || exit 1

ENTRYPOINT ["streamlit", "run", "app.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

## Testing Your Integration

Before submitting your agent for deployment, verify:

1. Authentication works with test JWT tokens
2. Token usage is properly tracked and reported
3. UI is responsive and follows design guidelines
4. Application runs successfully in a Docker container
5. All environment variables are properly handled

## Submission Process

When your agent is ready for deployment:

1. Ensure your Replit project is public or shared with the Productivity Engines team
2. Complete the agent deployment form in the dashboard
3. Provide the Replit URL and any special configuration instructions
4. Our system will automatically build, containerize, and deploy your agent

## Support

If you encounter any issues with the integration, contact the Productivity Engines development team through the support channel in the dashboard.
