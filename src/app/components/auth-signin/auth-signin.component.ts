import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-auth-signin",
  templateUrl: "./auth-signin.component.html",
  styleUrls: ["./auth-signin.component.css"],
})
export class AuthSigninComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  signIn() {
    // Add your sign-in logic here
    console.log("Sign-in logic goes here")
  }
}
