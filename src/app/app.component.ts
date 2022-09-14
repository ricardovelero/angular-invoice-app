import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "@auth0/auth0-angular";
import { concatMap, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  profileComplete: boolean = false;
  loginsCount: {} | any;
  metadata: {} | any;
  userId: number | any;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    if (sessionStorage.getItem("profileComplete") === "true")
      this.profileComplete = true;
    this.loginsCount = sessionStorage.getItem("logins_count");
    if (!sessionStorage.getItem("UserId") && !this.loginsCount) {
      this.auth.user$
        .pipe(
          concatMap((user) =>
            // Use HttpClient to make the call
            this.http.get(
              encodeURI(`https://fzdev.eu.auth0.com/api/v2/users/${user?.sub}`)
            )
          ),
          tap((meta) => {
            this.metadata = meta;
            console.log(this.metadata);
            sessionStorage.setItem(
              "UserId",
              this.metadata.app_metadata.apiUserId
            );
            sessionStorage.setItem("logins_count", this.metadata.logins_count);
          })
        )
        .subscribe();
    }
  }
}
