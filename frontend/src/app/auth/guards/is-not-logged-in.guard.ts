import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth-service/auth.service";

export const isNotLoggedIn: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (await auth.isLoggedIn()) {
        //console.log("user already logged in");
        router.navigate(["/home"]);
        return false;
    }

    return true;
};
