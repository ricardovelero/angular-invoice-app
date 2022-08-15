import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.css"],
})
export class ClientAddComponent implements OnInit {
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

  submitted = false;

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
      telephone: this.client.phone,
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
  newClient(): void {
    this.submitted = false;
    this.client = {
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
}
