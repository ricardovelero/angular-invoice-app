import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";

import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
  providers: [ClientService],
})
export class InvoiceAddComponent implements OnInit {
  modalToggle: boolean = false;
  clients: Client[] = [];

  selectedClientAdvanced?: any[];
  filteredClients: any[] | any;

  constructor(
    private clientService: ClientService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  filterClient(event: any) {
    let query = event.query;
    this.clientService.findClientByName(query).subscribe((clients) => {
      this.filteredClients = clients;
    });
  }

  opencloseModal() {
    if (!this.modalToggle) {
      this.modalToggle = !this.modalToggle;
    } else {
      this.modalToggle = !this.modalToggle;
    }
    return this.modalToggle;
  }
}
