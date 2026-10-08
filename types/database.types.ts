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
      comments: {
        Row: {
          id: string
          update_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          update_id: string
          author_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          update_id?: string
          author_id?: string
          content?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          role: 'citizen' | 'comms_manager' | 'driver'
          full_name: string
          ward_number: string | null
          municipal_account_number: string | null
          push_subscription: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'citizen' | 'comms_manager' | 'driver'
          full_name: string
          ward_number?: string | null
          municipal_account_number?: string | null
          push_subscription?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'citizen' | 'comms_manager' | 'driver'
          full_name?: string
          ward_number?: string | null
          municipal_account_number?: string | null
          push_subscription?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      updates: {
        Row: {
          id: string
          author_id: string | null
          title: string
          content: string
          ward_number: string | null
          is_push_sent: boolean
          created_at: string
        }
        Insert: {
          id?: string
          author_id?: string | null
          title: string
          content: string
          ward_number?: string | null
          is_push_sent?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          author_id?: string | null
          title?: string
          content?: string
          ward_number?: string | null
          is_push_sent?: boolean
          created_at?: string
        }
      }
      refuse_trucks: {
        Row: {
          id: string
          driver_id: string | null
          plate_number: string
          current_ward: string | null
          latitude: number | null
          longitude: number | null
          last_updated: string
        }
        Insert: {
          id?: string
          driver_id?: string | null
          plate_number: string
          current_ward?: string | null
          latitude?: number | null
          longitude?: number | null
          last_updated?: string
        }
        Update: {
          id?: string
          driver_id?: string | null
          plate_number?: string
          current_ward?: string | null
          latitude?: number | null
          longitude?: number | null
          last_updated?: string
        }
      }
    }
  }
}
