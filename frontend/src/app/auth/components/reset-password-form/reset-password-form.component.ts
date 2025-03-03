import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth-service/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-reset-password-form",
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./reset-password-form.component.html",
    styleUrl: "./reset-password-form.component.css",
})
export class ResetPasswordFormComponent {
    newPassword: string = "";
    confirmPassword: string = "";
    isLoading: boolean = false;

    constructor(private authService: AuthService) {}

    async resetPassword(): Promise<void> {
        if (!this.newPassword || this.newPassword !== this.confirmPassword) {
            return;
        }

        this.isLoading = true;
        try {
            await this.authService.resetPassword(this.newPassword);
            this.newPassword = "";
            this.confirmPassword = "";
        } catch (error) {
            console.error("Error resetting password:", error);
        } finally {
            this.isLoading = false;
        }
    }
}
