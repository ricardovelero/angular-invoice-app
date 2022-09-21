import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "@auth0/auth0-angular";
import { UserInfo } from "../app/services/user-info";
import { UserService } from "../app/services/user.service";
import { User } from "../app/models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  profileComplete: boolean = false;
  loginsCount: {} | any;
  userProfile: string | any;
  currentUser: User[] | any;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    sessionStorage.getItem("profileComplete") === "true"
      ? (this.profileComplete = true)
      : (this.profileComplete = false);
    if (!this.profileComplete) {
      this.auth.user$.subscribe((profile) => {
        this.userProfile = profile;
        this.userService.findUserByEmail(this.userProfile.email).subscribe({
          next: (data) => {
            this.currentUser = data;
            const {
              fullName,
              nif,
              phone,
              street,
              city,
              zipcode,
              province,
              country,
              profileComplete,
              id,
            } = this.currentUser;
            sessionStorage.setItem("UserId", id);
            UserInfo.UserId = id;
            sessionStorage.setItem("profileComplete", profileComplete);
            UserInfo.profileComplete = profileComplete;
            this.profileComplete = profileComplete;
          },
          error: (e) => console.error(e),
        });
      });
    }
  }

  setUserInfo() {}
}
