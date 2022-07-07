import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentClient: Client = {
    name: "",
    address: "",
    telephone: "",
    email: "",
    isactive: false,
  };

  message = "";

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
    this.clientService.get(id).subscribe({
      next: (data) => {
        this.currentClient = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  updatePublished(status: boolean): void {
    const data = {
      name: this.currentClient.name,
      address: this.currentClient.address,
      telephone: this.currentClient.telephone,
      email: this.currentClient.email,
      isactive: status,
    };
    this.message = "";
    this.clientService.update(this.currentClient.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentClient.isactive = status;
        this.message = "El estado ha sido actualizado correctamente.";
      },
      error: (e) => console.error(e),
    });
  }
  updateClient(): void {
    this.message = "";
    this.clientService
      .update(this.currentClient.id, this.currentClient)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = "Cliente actualizado con éxito";
        },
        error: (e) => console.error(e),
      });
  }
  deleteClient(): void {
    this.clientService.delete(this.currentClient.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["/clients"]);
      },
      error: (e) => console.error(e),
    });
  }
}
