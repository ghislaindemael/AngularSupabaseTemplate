import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth-service/auth.service";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: "app-login-page",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./login-page.component.html",
    styleUrl: "./login-page.component.css",
})
export class LoginPageComponent {
    email: string = "";
    password: string = "";

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    async onSubmit() {
        try {
            const success = await this.authService.signInWithPassword(
                this.email,
                this.password,
            );
            if (success) {
                this.router.navigate(["/home"]);
            }
            //console.log("Auth succeeded, redirect to homepage");
        } catch (error) {
            //console.log("Error logging in. Please try again");
        }
    }
}
