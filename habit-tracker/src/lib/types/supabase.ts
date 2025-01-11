export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          frequency: 'daily' | 'weekly' | 'monthly'
          target_count: number
          current_streak: number
          best_streak: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          frequency: 'daily' | 'weekly' | 'monthly'
          target_count: number
          current_streak?: number
          best_streak?: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          frequency?: 'daily' | 'weekly' | 'monthly'
          target_count?: number
          current_streak?: number
          best_streak?: number
        }
      }
      habit_logs: {
        Row: {
          id: string
          created_at: string
          habit_id: string
          completed_at: string
          count: number
        }
        Insert: {
          id?: string
          created_at?: string
          habit_id: string
          completed_at?: string
          count: number
        }
        Update: {
          id?: string
          created_at?: string
          habit_id?: string
          completed_at?: string
          count?: number
        }
      }
    }
  }
} 