import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrls: ["./sidebar-menu.component.css"],
})
export class SidebarMenuComponent implements OnInit {
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
