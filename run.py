#!/usr/bin/env python
"""
Run script for Productivity Engines Backend

This is the main entry point for running the backend server.
It handles:
1. Environment loading
2. Port management (detecting and clearing used ports)
3. Running the backend adaptor
"""

import os
import sys
import subprocess
import socket
import time
import signal
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the path to the backend adaptor script
backend_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
adaptor_script = os.path.join(backend_path, "adaptor.py")

def is_port_in_use(port):
    """Check if a port is in use."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def kill_process_on_port(port):
    """Kill any process using the specified port."""
    try:
        # This approach works on macOS, Linux, and Windows with WSL
        if sys.platform == 'win32':
            subprocess.run(f"taskkill /F /PID $(netstat -ano | findstr :{port} | awk '{{print $5}}') > nul 2>&1", shell=True)
        else:
            subprocess.run(f"lsof -i :{port} | awk 'NR>1 {{print $2}}' | xargs kill -9 > /dev/null 2>&1", shell=True)
        time.sleep(1)  # Give the OS time to release the port
    except Exception as e:
        print(f"Warning: Could not kill process on port {port}: {e}")

if __name__ == "__main__":
    # Define port
    port = int(os.environ.get("PORT", "8000"))
    
    print(f"Starting Productivity Engines Backend on port {port}...")
    
    # Check if port is in use and kill any process using it
    if is_port_in_use(port):
        print(f"Port {port} is already in use. Attempting to free it...")
        kill_process_on_port(port)
        
        if is_port_in_use(port):
            print(f"Failed to free port {port}. Please close any application using it and try again.")
            sys.exit(1)
    
    print(f"Loading adaptor script from: {adaptor_script}")
    
    # Make the adaptor script executable
    try:
        os.chmod(adaptor_script, 0o755)
    except Exception as e:
        print(f"Warning: Could not make adaptor script executable: {e}")
    
    # Run the backend adaptor in a subprocess
    try:
        # Change working directory to backend
        os.chdir(backend_path)
        
        # Print helpful information
        print(f"Server will be available at: http://localhost:{port}")
        print(f"Health check endpoint: http://localhost:{port}/health")
        print(f"Agent endpoint: http://localhost:{port}/run_agent")
        print("\nPress CTRL+C to stop the server...")
        
        # Use sys.executable to use the same Python interpreter as this script
        subprocess.run([sys.executable, "adaptor.py"], check=True)
    except KeyboardInterrupt:
        print("\nShutting down server...")
    except Exception as e:
        print(f"Error running server: {e}")
        sys.exit(1) 