import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { SupabaseService } from "./shared/services/supabase/supabase.service";
import { AuthService } from "./shared/services/auth-service/auth.service";
import { CookieService } from "./shared/services/cookie/cookie.service";
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideNgIconsConfig } from "@ng-icons/core";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideNgIconsConfig({
            size: "24px",
            color: "black",
            strokeWidth: "1.5",
        }),
        SupabaseService,
        AuthService,
        CookieService,
    ],
};
