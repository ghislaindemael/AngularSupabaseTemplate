import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth-service/auth.service";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-signup-page",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    templateUrl: "./signup-page.component.html",
    styleUrl: "./signup-page.component.css",
})
export class SignupPageComponent {
    email: string = "";
    password: string = "";
    username: string = "";
    usernameTaken: boolean = false;
    usernameCheckTimeout: any;
    usernameTooLong: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    async onSubmit() {
        try {
            if (
                this.email &&
                this.username &&
                this.password &&
                this.password.length > 8
            ) {
                const success = await this.authService.signUp(
                    this.email,
                    this.password,
                    this.username,
                );
                if (success) {
                    this.router.navigate(["/home"]);
                }
            }
            //console.log("Auth succeeded, redirect to homepage");
        } catch (error) {
            //console.log("Error logging in. Please try again");
        }
    }

    onUserNameChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const text = inputElement.value;

        this.usernameTooLong = text.length > 20;

        if (this.usernameCheckTimeout) {
            clearTimeout(this.usernameCheckTimeout);
        }

        this.usernameCheckTimeout = setTimeout(() => {
            this.checkUsername(text);
        }, 500);
    }

    async checkUsername(value: string) {
        if (value.length >= 6) {
            this.usernameTaken =
                await this.authService.doesUsernameExist(value);
        }
    }
}
