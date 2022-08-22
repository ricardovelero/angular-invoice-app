import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.css"],
})
export class ClientAddComponent implements OnInit {
  @Input() isShort: boolean = false;
  @Output() displayModal = new EventEmitter<boolean>();
  @Output() theClient = new EventEmitter<object>();

  clientShortForm = new FormGroup({
    id: new FormControl(""),
    fullName: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl("", [Validators.email]),
    nifNumber: new FormControl("", [Validators.required]),
    streetAddress: new FormControl("", [Validators.required]),
    zipcode: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    province: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
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
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}

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
}
