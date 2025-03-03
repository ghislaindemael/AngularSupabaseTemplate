import { Routes } from "@angular/router";
import { HomePageComponent } from "./core/pages/home-page/home-page.component";
import { LoginPageComponent } from "./auth/components/login-page/login-page.component";
import { isNotLoggedIn } from "./auth/guards/is-not-logged-in.guard";
import { LogoutComponent } from "./auth/components/logout/logout.component";
import { SignupPageComponent } from "./auth/components/signup-page/signup-page.component";
import { ProfilePageComponent } from "./auth/components/profile-page/profile-page.component";
import { ForgottenPasswordPageComponent } from "./auth/components/forgotten-password-page/forgotten-password-page.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: HomePageComponent,
    },
    {
        path: "auth",
        children: [
            {
                path: "login",
                component: LoginPageComponent,
                canActivate: [isNotLoggedIn],
            },
            {
                path: "signup",
                component: SignupPageComponent,
                canActivate: [isNotLoggedIn],
            },
            {
                path: "profile",
                component: ProfilePageComponent,
            },
            {
                path: "logout",
                component: LogoutComponent,
            },
            {
                path: "forgotpassword",
                component: ForgottenPasswordPageComponent,
            },
        ],
    },
    {
        path: "**",
        redirectTo: "home",
    },
];
