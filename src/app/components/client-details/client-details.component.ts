import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentClient: Client = {};

  message: string = "";
  toggle: boolean = false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = "";
      this.getClient(this.route.snapshot.params["id"]);
    }
  }
  getClient(id: string): void {
    this.clientService.getClient(id).subscribe({
      next: (data) => {
        this.currentClient = data;
      },
      error: (e) => console.error(e),
    });
  }
  updateStatus(status: boolean): void {
    const data = {
      fullName: this.currentClient.fullName,
      email: this.currentClient.email,
      telephone: this.currentClient.phone,
      businessPhone: this.currentClient.businessPhone,
      businessEmail: this.currentClient.businessEmail,
      nifNumber: this.currentClient.nifNumber,
      creditLimit: this.currentClient.creditLimit,
      streetAddress: this.currentClient.streetAddress,
      zipcode: this.currentClient.zipcode,
      city: this.currentClient.city,
      province: this.currentClient.province,
      country: this.currentClient.country,
      isActive: this.currentClient.isActive,
    };
    this.message = "";
    this.clientService.updateClient(this.currentClient.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentClient.isActive = status;
        this.message = "El estado ha sido actualizado correctamente.";
      },
      error: (e) => console.error(e),
    });
  }
  updateClient(): void {
    this.message = "";
    this.clientService
      .updateClient(this.currentClient.id, this.currentClient)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = "Cliente actualizado con éxito";
        },
        error: (e) => console.error(e),
      });
  }
  deleteClient(): void {
    this.clientService.deleteClient(this.currentClient.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/clients"]);
      },
      error: (e) => console.error(e),
    });
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  openCloseMessage() {
    if (!this.toggle) {
      this.toggle = !this.toggle;
    } else {
      this.toggle = !this.toggle;
    }
    return this.toggle;
  }
}
