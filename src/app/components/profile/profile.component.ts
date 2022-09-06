import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { UserService } from "../../services/user.service";
import { MessageService } from "primeng/api";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { passwordMatchingValidator } from "../../shared/input/confirm-password.validator";
import { passwordStrengthValidator } from "../../shared/input/password-strength.validator";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  userProfile: string | any;

  currentUser: User[] | any;

  isEditting: boolean = false;

  profileForm = this.fb.group({
    fullName: [""],
    nif: [""],
    phone: [""],
    address: this.fb.group({
      street: [""],
      city: [""],
      region: [""],
      zip: [""],
      country: [""],
    }),
  });

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

  uploadedFiles: any[] = [];

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm.disable();
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
          } = this.currentUser;
          this.profileForm.patchValue({
            fullName,
            nif,
            phone,
            address: { street, city, zip: zipcode, region: province, country },
          });
        },
        error: (e) => console.error(e),
      });
    });
  }

  updateUser() {
    this.isEditting = false;
    this.profileForm.disable;
    const {
      fullName,
      nif,
      phone,
      address: {
        value: { street, city, zip, region, country },
      },
    } = this.profileForm.controls;
    const data = {
      fullName: fullName.value,
      nif: nif.value,
      phone: phone.value,
      street: street,
      city: city,
      zipcode: zip,
      province: region,
      country: country,
    };
    this.userService.updateUser(data).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Hecho",
          detail: "Datos actualizados",
          life: 3000,
        });
      },
      error: (e) => {
        console.error(e);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: e.error.message,
          life: 5000,
        });
      },
    });
  }

  changePassword() {
    const data = { newPassword: this.passwordForm.controls.password.value };
    this.userService.changeUserPassword(data).subscribe({
      next: (res) => {
        this.pwDialog = false;
        this.messageService.add({
          severity: "success",
          summary: "Hecho",
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

  onUpload(event: any) {
    console.log(event);
    this.messageService.add({
      severity: "info",
      summary: "Imagen Cargada",
      detail: "",
    });
  }

  showUploadError(event: any) {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Error al cargar el archivo",
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
