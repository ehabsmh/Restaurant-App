export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      cart: {
        Row: {
          created_at: string;
          item_id: number;
          order_id: string | null;
          quantity: number;
          total_price: number | null;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          item_id: number;
          order_id?: string | null;
          quantity?: number;
          total_price?: number | null;
          user_id: number;
        };
        Update: {
          created_at?: string;
          item_id?: number;
          order_id?: string | null;
          quantity?: number;
          total_price?: number | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "cart_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          icon: string | null;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      ingredients: {
        Row: {
          created_at: string;
          id: number;
          name: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: number;
        };
        Relationships: [];
      };
      item_ingredients: {
        Row: {
          created_at: string;
          ingredient_it: number;
          item_id: number;
          quantity: number | null;
        };
        Insert: {
          created_at?: string;
          ingredient_it: number;
          item_id: number;
          quantity?: number | null;
        };
        Update: {
          created_at?: string;
          ingredient_it?: number;
          item_id?: number;
          quantity?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "item_ingredients_ingredient_it_fkey";
            columns: ["ingredient_it"];
            isOneToOne: false;
            referencedRelation: "ingredients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "item_ingredients_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
        ];
      };
      item_sizes: {
        Row: {
          created_at: string;
          item_id: number;
          price: number;
          size_id: number;
        };
        Insert: {
          created_at?: string;
          item_id: number;
          price: number;
          size_id: number;
        };
        Update: {
          created_at?: string;
          item_id?: number;
          price?: number;
          size_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "item_sizes_item_id_fkey";
            columns: ["item_id"];
            isOneToOne: false;
            referencedRelation: "items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "item_sizes_size_id_fkey";
            columns: ["size_id"];
            isOneToOne: false;
            referencedRelation: "sizes";
            referencedColumns: ["id"];
          },
        ];
      };
      items: {
        Row: {
          category_id: number;
          created_at: string;
          description: string | null;
          id: number;
          image: string;
          name: string;
          slug: string;
          subcategory_id: number;
        };
        Insert: {
          category_id: number;
          created_at?: string;
          description?: string | null;
          id?: number;
          image: string;
          name: string;
          slug: string;
          subcategory_id: number;
        };
        Update: {
          category_id?: number;
          created_at?: string;
          description?: string | null;
          id?: number;
          image?: string;
          name?: string;
          slug?: string;
          subcategory_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "items_subcategory_id_fkey";
            columns: ["subcategory_id"];
            isOneToOne: false;
            referencedRelation: "subcategories";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string;
          id: number;
          item_id: number;
          order_id: string;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          item_id: number;
          order_id: string;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          item_id?: number;
          order_id?: string;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_item_id_user_id_fkey";
            columns: ["item_id", "user_id"];
            isOneToOne: false;
            referencedRelation: "cart";
            referencedColumns: ["item_id", "user_id"];
          },
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_user_id_item_id_fkey";
            columns: ["user_id", "item_id"];
            isOneToOne: false;
            referencedRelation: "cart";
            referencedColumns: ["user_id", "item_id"];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          id: string;
          status: string;
          total_price: number | null;
          user_id: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          status?: string;
          total_price?: number | null;
          user_id: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          status?: string;
          total_price?: number | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      pin: {
        Row: {
          code: number;
          created_at: string;
          id: number;
        };
        Insert: {
          code?: number;
          created_at?: string;
          id?: number;
        };
        Update: {
          code?: number;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      sizes: {
        Row: {
          created_at: string;
          id: number;
          size: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          size: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          size?: string;
        };
        Relationships: [];
      };
      subcategories: {
        Row: {
          category_id: number;
          created_at: string;
          icon: string | null;
          id: number;
          name: string;
          slug: string;
        };
        Insert: {
          category_id: number;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name: string;
          slug: string;
        };
        Update: {
          category_id?: number;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          address: string;
          created_at: string;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          password: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          password: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          password?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
  ? R
  : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
  }
  ? I
  : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
  }
  ? U
  : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
