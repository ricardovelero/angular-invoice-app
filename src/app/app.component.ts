import { Component, Input } from "@angular/core"
import { AuthService } from "@auth0/auth0-angular"
import { UserInfo } from "../app/services/user-info"
import { UserService } from "../app/services/user.service"
import { User } from "../app/models/user.model"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  profileComplete: boolean = false
  loginsCount: {} | any
  userProfile: string | any
  currentUser?: User

  constructor(public auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    sessionStorage.getItem("profileComplete") === "true"
      ? (this.profileComplete = true)
      : (this.profileComplete = false)
    if (!this.profileComplete) {
      this.auth.user$.subscribe((profile: any) => {
        this.userProfile = profile
        this.userService.findUserByEmail(this.userProfile.email).subscribe({
          next: (data: any) => {
            this.currentUser = data
            const { profileComplete, id } = data
            sessionStorage.setItem("UserId", id)
            UserInfo.UserId = id
            sessionStorage.setItem("profileComplete", profileComplete)
            UserInfo.profileComplete = profileComplete
            this.profileComplete = profileComplete
          },
          error: (e: any) => console.error(e),
        })
      })
    }
  }

  setUserInfo() {}
}
