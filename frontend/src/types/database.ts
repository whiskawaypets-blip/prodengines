export type Database = {
  public: {
    Tables: {
      agent_configs: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          config: Record<string, unknown>
          ui_config: Record<string, unknown>
          created_at: string
          updated_at: string
          categories: string[]
          is_public: boolean
          creator_id: string | null
          icon: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: string
          config: Record<string, unknown>
          ui_config: Record<string, unknown>
          created_at?: string
          updated_at?: string
          categories?: string[]
          is_public?: boolean
          creator_id?: string | null
          icon?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          config?: Record<string, unknown>
          ui_config?: Record<string, unknown>
          created_at?: string
          updated_at?: string
          categories?: string[]
          is_public?: boolean
          creator_id?: string | null
          icon?: string | null
        }
      }
      agent_results: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          input: Record<string, unknown>
          output: Record<string, unknown>
          status: string
          execution_time: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          input: Record<string, unknown>
          output: Record<string, unknown>
          status: string
          execution_time?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          input?: Record<string, unknown>
          output?: Record<string, unknown>
          status?: string
          execution_time?: number | null
          created_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'user'
          created_at?: string
        }
      }
      agent_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      user_agent_assignments: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          company_id: string | null
          assigned_by: string
          created_at: string
          updated_at: string
          status: 'active' | 'inactive' | 'pending'
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          company_id?: string | null
          assigned_by: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'inactive' | 'pending'
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          company_id?: string | null
          assigned_by?: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'inactive' | 'pending'
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          owner_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          owner_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          owner_id?: string
        }
      }
      company_members: {
        Row: {
          id: string
          company_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          created_at?: string
        }
      }
      token_usage: {
        Row: {
          id: string
          user_id: string
          agent_id: string
          company_id: string | null
          request_id: string
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
          model: string
          created_at: string
          cost: number
        }
        Insert: {
          id?: string
          user_id: string
          agent_id: string
          company_id?: string | null
          request_id: string
          prompt_tokens: number
          completion_tokens: number
          total_tokens: number
          model: string
          created_at?: string
          cost: number
        }
        Update: {
          id?: string
          user_id?: string
          agent_id?: string
          company_id?: string | null
          request_id?: string
          prompt_tokens?: number
          completion_tokens?: number
          total_tokens?: number
          model?: string
          created_at?: string
          cost?: number
        }
      }
      agent_deployments: {
        Row: {
          id: string
          agent_id: string
          subdomain: string
          container_id: string | null
          status: 'pending' | 'active' | 'failed' | 'stopped'
          created_at: string
          updated_at: string
          version: string
          config: Record<string, unknown>
        }
        Insert: {
          id?: string
          agent_id: string
          subdomain: string
          container_id?: string | null
          status?: 'pending' | 'active' | 'failed' | 'stopped'
          created_at?: string
          updated_at?: string
          version: string
          config: Record<string, unknown>
        }
        Update: {
          id?: string
          agent_id?: string
          subdomain?: string
          container_id?: string | null
          status?: 'pending' | 'active' | 'failed' | 'stopped'
          created_at?: string
          updated_at?: string
          version?: string
          config?: Record<string, unknown>
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}