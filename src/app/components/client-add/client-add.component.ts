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
    lastname: "",
    email: "",
    telephone: "",
    businesstelephone: "",
    businessemail: "",
    nifnumber: "",
    creditlimit: 0,
    address: "",
    isactive: false,
    send_invoice_by: "",
  };
  submitted = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  addClient(): void {
    const data = {
      name: this.client.name,
      lastname: this.client.lastname,
      email: this.client.email,
      telephone: this.client.telephone,
      businesstelephone: this.client.businesstelephone,
      businessemail: this.client.businessemail,
      nifnumber: this.client.nifnumber,
      creditlimit: this.client.creditlimit,
      address: this.client.address,
      isactive: (this.client.isactive = true),
      send_invoice_by: this.client.send_invoice_by,
    };
    this.clientService.createClient(data).subscribe({
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
