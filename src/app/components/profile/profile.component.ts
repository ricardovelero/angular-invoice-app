import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { UserService } from "../../services/user.service";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchingValidator } from "../../shared/input/confirm-password.validator";
import { passwordStrengthValidator } from "../../shared/input/password-strength.validator";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  userProfile: string | any;

  isEditting: boolean = false;

  passwordForm = new FormGroup(
    {
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator,
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
    },
    { validators: [passwordMatchingValidator] }
  );

  newPassword: string | any;
  repeatPassword: string | any;
  pwDialog: boolean = false;
  showPassword: boolean = false;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => (this.userProfile = profile));
  }

  changePassword() {
    const data = { newPassword: this.passwordForm.controls.password.value };
    this.userService.changeUserPassword(data).subscribe({
      next: (res) => {
        this.pwDialog = false;
        this.messageService.add({
          severity: "success",
          summary: "Exitoso",
          detail: "Contraseña cambiada",
          life: 3000,
        });
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: e.error.message,
          life: 5000,
        });
      },
    });
  }
  showErrors() {
    const { invalid, dirty, touched } = this.passwordForm;
    return invalid && (dirty || touched);
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }
}
