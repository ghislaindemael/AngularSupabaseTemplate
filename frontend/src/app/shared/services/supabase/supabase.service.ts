import { Injectable } from "@angular/core";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class SupabaseService {
    public client: SupabaseClient;

    constructor() {
        const supabaseUrl = environment["SUPABASE_URL"];
        const supabaseKey = environment["SUPABASE_KEY"];
        this.client = createClient(supabaseUrl, supabaseKey);
    }
}
