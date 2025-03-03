import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth-service/auth.service";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-forgotten-password-page",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    templateUrl: "./forgotten-password-page.component.html",
    styleUrl: "./forgotten-password-page.component.css",
})
export class ForgottenPasswordPageComponent {
    email: string = "";
    emailSent: boolean = false;
    isLoading: boolean = false;

    constructor(private authService: AuthService) {}

    async onSubmit(): Promise<void> {
        this.isLoading = true;

        try {
            await this.authService.signIn(this.email);
            this.emailSent = true;
        } catch (error) {
            console.error("Error sending reset password email:", error);
        } finally {
            this.isLoading = false;
        }
    }
}
