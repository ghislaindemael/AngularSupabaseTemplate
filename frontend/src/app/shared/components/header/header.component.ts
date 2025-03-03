import {
    ChangeDetectorRef,
    Component,
    HostListener,
    OnInit,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { User } from "@supabase/supabase-js";
import { AuthService } from "../../services/auth-service/auth.service";
import { NgClass, NgIf } from "@angular/common";
import { filter } from "rxjs";
import { NgIcon } from "@ng-icons/core";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [NgIf, NgClass, NgIcon],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
    user: User | null = null;
    showDropdownMenu: boolean = false;
    isSmallScreen = false;
    shownMenu: string = "";
    isRightClicking = false;
    startsOnButton = true;

    constructor(
        private authService: AuthService,
        protected router: Router,
        private cdRef: ChangeDetectorRef,
    ) {}

    toggleDropdown() {
        this.showDropdownMenu = !this.showDropdownMenu;
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: Event) {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isSmallScreen = window.innerWidth < 690;
    }

    async ngOnInit(): Promise<void> {
        this.user = await this.authService.getUser();
        this.checkScreenSize();

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(async (event) => {
                if (!this.user) {
                    this.user = await this.authService.getUser();
                }
                this.showDropdownMenu = false;
            });

        this.authService.authChanges((event, session) => {
            if (session) {
                this.user = session.user;
            } else {
                this.user = null;
            }
        });
    }

    onHrefButtonEnter(menu: string): void {
        if (this.startsOnButton) {
            this.startsOnButton = false;
            return;
        }
        this.shownMenu = menu;
    }

    onMouseLeave(event: MouseEvent) {
        if (this.startsOnButton) {
            this.startsOnButton = false;
        }
        if (!this.isRightClicking) {
            this.shownMenu = "";
        }
    }

    onRightClick(event: MouseEvent) {
        this.isRightClicking = true;

        setTimeout(() => {
            this.isRightClicking = false;
        }, 100);
    }
}
