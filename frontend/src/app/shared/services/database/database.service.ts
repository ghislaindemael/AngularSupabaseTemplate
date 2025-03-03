import { Injectable } from "@angular/core";
import { SupabaseService } from "../supabase/supabase.service";

@Injectable({
    providedIn: "root",
})
export class DatabaseService {
    private supabase = this.supabaseService.client;

    constructor(private supabaseService: SupabaseService) {}
}
