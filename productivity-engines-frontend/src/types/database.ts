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