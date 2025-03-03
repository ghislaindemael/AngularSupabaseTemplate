import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
    ViewChild,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { CookieService } from "./shared/services/cookie/cookie.service";
import { provideIcons } from "@ng-icons/core";
import { heroIcons } from "../assets/ngicons-list";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    providers: [provideIcons(heroIcons)],
})
export class AppComponent implements AfterViewInit {
    title = "YourTitle";

    @ViewChild("headerRef") headerRef!: ElementRef<HTMLElement>;

    constructor(
        private cookiesService: CookieService,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
    ) {
        this.cookiesService.clearOldItems(5 * 60 * 1000);
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();

        const headerHeight = this.headerRef?.nativeElement?.offsetHeight || 80;
        this.renderer.setStyle(
            document.querySelector(".main-content"),
            "margin-top",
            `${headerHeight}px`,
        );
    }
}
