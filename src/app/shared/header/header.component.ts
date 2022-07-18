import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  menuToggle: boolean = false;

  opencloseMenu() {
    if (!this.menuToggle) {
      this.menuToggle = !this.menuToggle;
    } else {
      this.menuToggle = !this.menuToggle;
    }
    return this.menuToggle;
  }

  constructor() {}

  ngOnInit(): void {}
}
