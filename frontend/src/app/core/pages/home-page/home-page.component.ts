import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-home-page",
    standalone: true,
    imports: [],
    templateUrl: "./home-page.component.html",
    styleUrl: "./home-page.component.css",
})
export class HomePageComponent implements OnInit {
    constructor() {}

    async ngOnInit(): Promise<void> {}
}
