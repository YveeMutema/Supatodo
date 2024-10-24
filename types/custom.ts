import { Database } from "./supabase (2)";


export type Todo = Database["public"]["Tables"]["todos"]["Row"]