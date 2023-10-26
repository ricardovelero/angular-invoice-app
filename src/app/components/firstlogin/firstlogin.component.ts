import { Component, OnInit, ViewChild } from "@angular/core"
import { CdkStepper } from "@angular/cdk/stepper"
import { AbstractControl, FormBuilder } from "@angular/forms"
import { Country } from "src/app/models/country.model"
import { CountryService } from "src/app/services/country.service"
import { UserService } from "../../services/user.service"
import { MessageService } from "primeng/api"
import { Router } from "@angular/router"
import { AuthService } from "@auth0/auth0-angular"
import { HttpClient } from "@angular/common/http"
import { concatMap, tap } from "rxjs"

@Component({
  selector: "app-firstlogin",
  templateUrl: "./firstlogin.component.html",
  styleUrls: ["./firstlogin.component.css"],
})
export class FirstloginComponent implements OnInit {
  @ViewChild("cdkStepper") cdkStepper: CdkStepper | undefined

  frmStepper = this.fb.group({
    steps: this.fb.array([
      this.fb.group({
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
      }),
    ]),
  })

  countries: Country[] | any

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
    public auth: AuthService,
    private http: HttpClient
  ) {
    this.frmStepper.controls.steps
      .at(0)
      .controls.address.controls.country?.setValue("España", {
        onlySelf: true,
      })
  }

  ngOnInit(): void {
    this.countryService.getCountries().then((data) => {
      this.countries = data
    })
  }

  // formArray getter
  get formArray(): AbstractControl {
    return this.frmStepper.controls.steps
  }

  submit(): void {
    this.frmStepper.disable
    const {
      fullName,
      nif,
      phone,
      address: {
        value: { street, city, zip, region, country },
      },
    } = this.frmStepper.controls.steps.at(0).controls
    const data = {
      fullName: fullName.value,
      nif: nif.value,
      phone: phone.value,
      street: street,
      city: city,
      zipcode: zip,
      province: region,
      country: country,
      profileComplete: true,
    }
    const auth0Data = {
      name: fullName,
      phone_number: phone.value,
      app_metadata: {
        nif: nif.value,
        address: `${street}, ${city}, ${region}, ${zip}, ${country}`,
        profileComplete: true,
      },
    }
    this.auth.user$
      .pipe(
        concatMap((user) =>
          // Use HttpClient to make the call
          this.http.patch(
            encodeURI(
              `https://dev-gyc750vd.us.auth0.com/api/v2/users/${user?.sub}`
            ),
            auth0Data
          )
        ),
        tap((res) => {
          console.log(res)
        })
      )
      .subscribe()
    this.userService.updateUser(data).subscribe({
      next: (res) => {
        sessionStorage.setItem("profileComplete", "true")
        this.messageService.add({
          severity: "success",
          summary: "Hecho",
          detail: "Datos actualizados",
          life: 3000,
        })
        // this.router.navigate(["invoice-add"]);
        setTimeout(() => {
          window.location.assign("invoice-add")
        }, 3000)
      },
      error: (e) => {
        console.error(e)
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: e.error.message,
          life: 5000,
        })
      },
    })
  }
}
