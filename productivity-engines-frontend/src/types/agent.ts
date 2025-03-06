export interface AgentRequest {
  business_name: string;
  website_url: string;
  model?: string;
  temperature?: number;
  previous_response?: string;
}

export interface AgentResponse {
  analysis: string;
  search_query: string;
  model_used: string;
}

export interface SavedAgentResult {
  id: string;
  user_id: string;
  agent_id: string;
  input: {
    business_name: string;
    website_url: string;
  };
  output: {
    analysis: string;
    search_query: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  execution_time: number;
  created_at: string;
} 