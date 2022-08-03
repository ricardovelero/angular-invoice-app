import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";

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

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}
}
