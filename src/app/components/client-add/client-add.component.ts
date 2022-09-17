import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { Country } from "src/app/models/country.model";
import { CountryService } from "src/app/services/country.service";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.css"],
})
export class ClientAddComponent implements OnInit {
  @Input() isShort: boolean = false;
  @Input() clientToEdit: {} = {};
  @Output() displayModal = new EventEmitter<boolean>();
  @Output() theClient = new EventEmitter<object>();

  countries: Country[] | any;

  clientShortForm = this.fb.group({
    id: [0],
    fullName: ["", Validators.required, Validators.minLength(3)],
    email: ["", Validators.email],
    nifNumber: ["", Validators.required],
    streetAddress: ["", Validators.required],
    city: ["", Validators.required],
    zipcode: ["", Validators.required],
    province: ["", Validators.required],
    country: ["", Validators.required],
  });

  client: Client = {
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    nifNumber: "",
    creditLimit: 0,
    streetAddress: "",
    zipcode: "",
    city: "",
    province: "",
    country: "",
    isActive: true,
  };

  submitted: boolean = false;

  constructor(
    private clientService: ClientService,
    private countryService: CountryService,
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.clientShortForm.controls.country?.setValue("España", {
      onlySelf: true,
    });
  }

  ngOnInit(): void {
    this.countryService.getCountries().then((data) => {
      this.countries = data;
    });
  }

  addClient(): void {
    const data = {
      fullName: this.client.fullName,
      email: this.client.email,
      phone: this.client.phone,
      businessName: this.client.businessName,
      businessPhone: this.client.businessPhone,
      businessEmail: this.client.businessEmail,
      nifNumber: this.client.nifNumber,
      creditLimit: this.client.creditLimit,
      streetAddress: this.client.streetAddress,
      zipcode: this.client.zipcode,
      city: this.client.city,
      province: this.client.province,
      country: this.client.country,
      isActive: this.client.isActive,
    };
    this.clientService.createClient(data).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }
  addShortClient(): void {
    const data = this.clientShortForm.value;
    this.clientService.createClient(data).subscribe({
      next: (res) => {
        this.submitted = true;
        this.theClient.emit(res);
      },
      error: (e) => console.error(e),
    });
  }

  editClient(client: Client) {
    const {
      id,
      fullName,
      email,
      nifNumber,
      streetAddress,
      city,
      province,
      zipcode,
      country,
    } = this.clientShortForm.controls;
    id.setValue(client.id!);
    fullName.setValue(client.fullName!);
    email.setValue(client.email!);
    nifNumber.setValue(client.nifNumber!);
    streetAddress.setValue(client.streetAddress!);
    city.setValue(client.city!);
    province.setValue(client.province!);
    zipcode.setValue(client.zipcode!);
    country.setValue(client.country!);
    this.client = { ...client };
  }

  newClient(): void {
    this.submitted = false;
    this.client = {
      id: 0,
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      businessPhone: "",
      businessEmail: "",
      nifNumber: "",
      creditLimit: 0,
      streetAddress: "",
      zipcode: "",
      city: "",
      province: "",
      country: "",
      isActive: true,
    };
  }
  toClientList(): void {
    this.router.navigate(["clients"]);
  }
  parentModal(value: boolean) {
    this.displayModal.emit(value);
  }
  changeCountry(e: any) {
    this.clientShortForm.controls.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
