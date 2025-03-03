import { Injectable, OnInit, signal, WritableSignal } from "@angular/core";
import { SupabaseService } from "../supabase/supabase.service";
import {
    AuthChangeEvent,
    AuthOtpResponse,
    Session,
    User,
} from "@supabase/supabase-js";

@Injectable({
    providedIn: "root",
})
export class AuthService implements OnInit {
    private supabase = this.supabaseService.client;
    private loggedInUser: WritableSignal<User | null> = signal(null);

    public async isLoggedIn(): Promise<boolean> {
        await this.retrieveOrRecreateSession();
        return !!this.loggedInUser();
    }

    constructor(private supabaseService: SupabaseService) {}

    async ngOnInit() {
        await this.retrieveOrRecreateSession();
    }

    private async retrieveOrRecreateSession() {
        const session = await this.supabase.auth.getSession();
        if (session.data.session) {
            this.loggedInUser.set(session.data.session.user || null);
        } else {
            const response = await this.supabase.auth.getUser();
            this.loggedInUser.set(response.data.user || null);
        }
    }

    public async signInWithPassword(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.log("Error logging in. Please try again");
            return false;
        } else {
            this.loggedInUser.set(data.user);
            return true;
        }
    }

    public signIn(email: string): Promise<AuthOtpResponse> {
        const redirectURI = window.location.href.includes("localhost")
            ? "http://localhost:4200"
            : "https://<your-project-url>/auth/profile";
        return this.supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: redirectURI },
        });
    }

    public signOut() {
        this.supabase.auth.signOut();
        this.loggedInUser.set(null);
    }

    public async getUser(): Promise<User> {
        if (this.loggedInUser()) {
            return this.loggedInUser() as User;
        } else {
            await this.retrieveOrRecreateSession();
            return this.loggedInUser() as User;
        }
    }

    public async getMyUserID(): Promise<string> {
        if (!this.loggedInUser()) {
            await this.retrieveOrRecreateSession();
        }
        return this.loggedInUser()?.id || "error";
    }

    async isAdmin(): Promise<boolean> {
        const { data } = await this.supabase.auth.getUser();
        return data.user?.user_metadata?.["admin"] === true;
    }

    async signUp(email: string, password: string, username: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                    emailRedirectTo: "<your-project-url>",
                },
            },
        });

        if (error) {
            throw error;
        } else {
            this.loggedInUser.set(data.user);
            return true;
        }
    }

    async doesUsernameExist(usernameToCheck: string): Promise<boolean> {
        const { data, error } = await this.supabase
            .from("users")
            .select("username")
            .eq("username", usernameToCheck);

        if (error) {
            throw error;
        }

        return data.length > 0;
    }

    async getCurrentUserUsername(): Promise<string> {
        const { data, error } = await this.supabase
            .from("users")
            .select("username")
            .eq("id", this.loggedInUser()?.id)
            .single();

        if (error) {
            throw error;
        }

        return data.username || "anonyme";
    }

    async resetPassword(newPassword: string): Promise<void> {
        const { error } = await this.supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            throw new Error(error.message);
        }
    }

    authChanges(
        callback: (event: AuthChangeEvent, session: Session | null) => void,
    ) {
        return this.supabase.auth.onAuthStateChange(callback);
    }
}
