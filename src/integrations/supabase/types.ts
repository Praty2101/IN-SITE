export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      alliance_plans: {
        Row: {
          base_price: number
          created_at: string
          id: number
          ott_apps_included: string | null
          plan_name: string
          price_with_gst: number
          speed: string
          updated_at: string
          validity_days: number
        }
        Insert: {
          base_price: number
          created_at?: string
          id?: number
          ott_apps_included?: string | null
          plan_name: string
          price_with_gst: number
          speed: string
          updated_at?: string
          validity_days: number
        }
        Update: {
          base_price?: number
          created_at?: string
          id?: number
          ott_apps_included?: string | null
          plan_name?: string
          price_with_gst?: number
          speed?: string
          updated_at?: string
          validity_days?: number
        }
        Relationships: []
      }
      BC: {
        Row: {
          ADDRESS1: string | null
          ADDRESS2: string | null
          ADDRESS3: string | null
          CITY: string | null
          CONTRACT_NUMBER: number | null
          DISTRICT: string | null
          EFFECTIVE_DATE: string | null
          EMAIL: string | null
          END_DATE: string | null
          ENTITY_CODE: string | null
          MOBILE_PHONE: number | null
          NAME: string | null
          NETWORK_NAME: string | null
          ORDER_DATE: string | null
          PACKAGE_NAME: string | null
          PAY_TERM: string | null
          PLAN_CODE: string | null
          PLAN_TYPE: string | null
          START_DATE: string | null
          STATE: string | null
          STATUS: string | null
          STB_NUMBER: string | null
          STB_TYPE: string | null
          "VC No.": number | null
          VC_CARD: string | null
          ZIPCODE: number | null
        }
        Insert: {
          ADDRESS1?: string | null
          ADDRESS2?: string | null
          ADDRESS3?: string | null
          CITY?: string | null
          CONTRACT_NUMBER?: number | null
          DISTRICT?: string | null
          EFFECTIVE_DATE?: string | null
          EMAIL?: string | null
          END_DATE?: string | null
          ENTITY_CODE?: string | null
          MOBILE_PHONE?: number | null
          NAME?: string | null
          NETWORK_NAME?: string | null
          ORDER_DATE?: string | null
          PACKAGE_NAME?: string | null
          PAY_TERM?: string | null
          PLAN_CODE?: string | null
          PLAN_TYPE?: string | null
          START_DATE?: string | null
          STATE?: string | null
          STATUS?: string | null
          STB_NUMBER?: string | null
          STB_TYPE?: string | null
          "VC No."?: number | null
          VC_CARD?: string | null
          ZIPCODE?: number | null
        }
        Update: {
          ADDRESS1?: string | null
          ADDRESS2?: string | null
          ADDRESS3?: string | null
          CITY?: string | null
          CONTRACT_NUMBER?: number | null
          DISTRICT?: string | null
          EFFECTIVE_DATE?: string | null
          EMAIL?: string | null
          END_DATE?: string | null
          ENTITY_CODE?: string | null
          MOBILE_PHONE?: number | null
          NAME?: string | null
          NETWORK_NAME?: string | null
          ORDER_DATE?: string | null
          PACKAGE_NAME?: string | null
          PAY_TERM?: string | null
          PLAN_CODE?: string | null
          PLAN_TYPE?: string | null
          START_DATE?: string | null
          STATE?: string | null
          STATUS?: string | null
          STB_NUMBER?: string | null
          STB_TYPE?: string | null
          "VC No."?: number | null
          VC_CARD?: string | null
          ZIPCODE?: number | null
        }
        Relationships: []
      }
      GB: {
        Row: {
          Cashier: string | null
          Company: string | null
          CustomerId: number | null
          CustomerName: string | null
          IP: string | null
          Package: string | null
          PackageAmount: number | null
          TaxAmount: number | null
          TotalAmount: number | null
        }
        Insert: {
          Cashier?: string | null
          Company?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          IP?: string | null
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Update: {
          Cashier?: string | null
          Company?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          IP?: string | null
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Relationships: []
      }
      ghosh: {
        Row: {
          Cashier: string | null
          CustomerId: number | null
          CustomerName: string | null
          Description: string | null
          OrderDate: string | null
          OrderId: string
          Package: string | null
          PackageAmount: number | null
          TaxAmount: number | null
          TotalAmount: number | null
        }
        Insert: {
          Cashier?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          Description?: string | null
          OrderDate?: string | null
          OrderId: string
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Update: {
          Cashier?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          Description?: string | null
          OrderDate?: string | null
          OrderId?: string
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Relationships: []
      }
      gtpl_broadband_plans: {
        Row: {
          base_price: number
          created_at: string
          id: number
          ott_apps_included: string | null
          plan_name: string
          price_with_gst: number
          speed: string
          updated_at: string
          validity_days: number
        }
        Insert: {
          base_price: number
          created_at?: string
          id?: number
          ott_apps_included?: string | null
          plan_name: string
          price_with_gst: number
          speed: string
          updated_at?: string
          validity_days: number
        }
        Update: {
          base_price?: number
          created_at?: string
          id?: number
          ott_apps_included?: string | null
          plan_name?: string
          price_with_gst?: number
          speed?: string
          updated_at?: string
          validity_days?: number
        }
        Relationships: []
      }
      gtpl_tv_packs: {
        Row: {
          channel_count: number
          created_at: string
          customer_price: number
          id: number
          operator_price: number
          pack_name: string
          updated_at: string
        }
        Insert: {
          channel_count?: number
          created_at?: string
          customer_price: number
          id?: number
          operator_price: number
          pack_name: string
          updated_at?: string
        }
        Update: {
          channel_count?: number
          created_at?: string
          customer_price?: number
          id?: number
          operator_price?: number
          pack_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      JC: {
        Row: {
          ADDRESS1: string | null
          ADDRESS2: string | null
          ADDRESS3: string | null
          CITY: string | null
          CONTRACT_NUMBER: number | null
          DISTRICT: string | null
          EFFECTIVE_DATE: string | null
          EMAIL: string | null
          END_DATE: string | null
          ENTITY_CODE: string | null
          MOBILE_PHONE: number | null
          NAME: string | null
          NETWORK_NAME: string | null
          ORDER_DATE: string | null
          PACKAGE_NAME: string | null
          PAY_TERM: string | null
          PLAN_CODE: string | null
          PLAN_TYPE: string | null
          START_DATE: string | null
          STATE: string | null
          STATUS: string | null
          STB_NUMBER: string | null
          STB_TYPE: string | null
          "VC No.": number | null
          VC_CARD: string | null
          ZIPCODE: number | null
        }
        Insert: {
          ADDRESS1?: string | null
          ADDRESS2?: string | null
          ADDRESS3?: string | null
          CITY?: string | null
          CONTRACT_NUMBER?: number | null
          DISTRICT?: string | null
          EFFECTIVE_DATE?: string | null
          EMAIL?: string | null
          END_DATE?: string | null
          ENTITY_CODE?: string | null
          MOBILE_PHONE?: number | null
          NAME?: string | null
          NETWORK_NAME?: string | null
          ORDER_DATE?: string | null
          PACKAGE_NAME?: string | null
          PAY_TERM?: string | null
          PLAN_CODE?: string | null
          PLAN_TYPE?: string | null
          START_DATE?: string | null
          STATE?: string | null
          STATUS?: string | null
          STB_NUMBER?: string | null
          STB_TYPE?: string | null
          "VC No."?: number | null
          VC_CARD?: string | null
          ZIPCODE?: number | null
        }
        Update: {
          ADDRESS1?: string | null
          ADDRESS2?: string | null
          ADDRESS3?: string | null
          CITY?: string | null
          CONTRACT_NUMBER?: number | null
          DISTRICT?: string | null
          EFFECTIVE_DATE?: string | null
          EMAIL?: string | null
          END_DATE?: string | null
          ENTITY_CODE?: string | null
          MOBILE_PHONE?: number | null
          NAME?: string | null
          NETWORK_NAME?: string | null
          ORDER_DATE?: string | null
          PACKAGE_NAME?: string | null
          PAY_TERM?: string | null
          PLAN_CODE?: string | null
          PLAN_TYPE?: string | null
          START_DATE?: string | null
          STATE?: string | null
          STATUS?: string | null
          STB_NUMBER?: string | null
          STB_TYPE?: string | null
          "VC No."?: number | null
          VC_CARD?: string | null
          ZIPCODE?: number | null
        }
        Relationships: []
      }
      MB: {
        Row: {
          Cashier: string | null
          Company: string | null
          CustomerId: number | null
          CustomerName: string | null
          IP: string | null
          Package: string | null
          PackageAmount: number | null
          TaxAmount: number | null
          TotalAmount: number | null
        }
        Insert: {
          Cashier?: string | null
          Company?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          IP?: string | null
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Update: {
          Cashier?: string | null
          Company?: string | null
          CustomerId?: number | null
          CustomerName?: string | null
          IP?: string | null
          Package?: string | null
          PackageAmount?: number | null
          TaxAmount?: number | null
          TotalAmount?: number | null
        }
        Relationships: []
      }
      recharges: {
        Row: {
          company: string
          created_at: string
          customer_name: string
          customer_price: number
          customer_source_id: string
          customer_source_table: string
          id: string
          operator_price: number | null
          pack_name: string
          service_type: string
          status: string
          transaction_date: string
          transaction_time: string
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          customer_name: string
          customer_price: number
          customer_source_id: string
          customer_source_table: string
          id?: string
          operator_price?: number | null
          pack_name: string
          service_type: string
          status?: string
          transaction_date?: string
          transaction_time?: string
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          customer_name?: string
          customer_price?: number
          customer_source_id?: string
          customer_source_table?: string
          id?: string
          operator_price?: number | null
          pack_name?: string
          service_type?: string
          status?: string
          transaction_date?: string
          transaction_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      siti_packs: {
        Row: {
          channel_count: number
          created_at: string
          customer_price: number
          id: number
          operator_price: number
          pack_name: string
          updated_at: string
        }
        Insert: {
          channel_count: number
          created_at?: string
          customer_price: number
          id?: number
          operator_price: number
          pack_name: string
          updated_at?: string
        }
        Update: {
          channel_count?: number
          created_at?: string
          customer_price?: number
          id?: number
          operator_price?: number
          pack_name?: string
          updated_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
