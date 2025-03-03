import { Component, OnInit } from "@angular/core";
import { LogoutFormComponent } from "../logout-form/logout-form.component";
import { ResetPasswordFormComponent } from "../reset-password-form/reset-password-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth-service/auth.service";

@Component({
    selector: "app-profile-page",
    standalone: true,
    imports: [
        LogoutFormComponent,
        ResetPasswordFormComponent,
        ReactiveFormsModule,
    ],
    templateUrl: "./profile-page.component.html",
    styleUrl: "./profile-page.component.css",
})
export class ProfilePageComponent implements OnInit {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    async ngOnInit(): Promise<void> {}
}
