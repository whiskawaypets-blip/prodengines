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