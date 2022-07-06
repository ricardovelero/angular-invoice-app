import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-add",
  templateUrl: "./client-add.component.html",
  styleUrls: ["./client-add.component.css"],
})
export class ClientAddComponent implements OnInit {
  client: Client = {
    name: "",
    address: "",
    telephone: "",
    email: "",
    isactive: false,
  };
  submitted = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  saveClient(): void {
    const data = {
      name: this.client.name,
      address: this.client.address,
      telephone: this.client.telephone,
      email: this.client.email,
      isactive: (this.client.isactive = true),
    };
    this.clientService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }
  newClient(): void {
    this.submitted = false;
    this.client = {
      name: "",
      address: "",
      telephone: "",
      email: "",
      isactive: true,
    };
  }
}
