import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { DOCUMENT } from "@angular/common";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  menuToggle: boolean = false;

  picture: string = "";
  userProfile: string | any;
  currentUser: User[] | any;

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
    public auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.userProfile = profile;
      this.userService.findUserByEmail(this.userProfile.email).subscribe({
        next: (data) => {
          this.currentUser = data;
          this.picture = this.currentUser.picture;
        },
        error: (e) => console.error(e),
      });
    });
  }
}
