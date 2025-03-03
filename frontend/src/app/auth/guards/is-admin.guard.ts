import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth-service/auth.service";

export const isAdmin: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (await auth.isAdmin()) {
        return true;
    }
    router.navigate(["/home"]);
    return false;
};
