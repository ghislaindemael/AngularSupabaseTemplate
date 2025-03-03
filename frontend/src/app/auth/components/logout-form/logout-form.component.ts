import { Component, NgZone } from "@angular/core";
import { AuthService } from "../../../shared/services/auth-service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-logout-form",
    standalone: true,
    imports: [],
    templateUrl: "./logout-form.component.html",
    styleUrl: "./logout-form.component.css",
})
export class LogoutFormComponent {
    constructor(
        private auth: AuthService,
        private router: Router,
        private ngZone: NgZone,
    ) {
        this.auth.authChanges((event, session) => {
            if (event == "SIGNED_OUT" || !session) {
                this.ngZone.run(() => this.router.navigate(["/home"]));
            }
        });
    }

    onSignOut() {
        this.auth.signOut();
    }
}
