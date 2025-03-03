import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth-service/auth.service";

export const isLoggedIn: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (await auth.isLoggedIn()) {
        return true;
    }

    router.navigate(["/authentication"]);
    return false;
};
