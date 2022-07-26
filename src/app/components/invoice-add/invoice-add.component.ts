import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { Item } from "../../models/item.model";
import { ClientService } from "../../services/client.service";
import { ItemService } from "../../services/item.service";

import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
  providers: [ClientService, ItemService],
})
export class InvoiceAddComponent implements OnInit {
  modalToggle: boolean = false;

  clients: Client[] = [];
  items: Item[] = [];

  selectedClient?: Client[];
  filteredClients: any[] | any;

  selectedItem?: Item[];
  filteredItems: any[] | any;

  qty: number = 1;

  constructor(
    private clientService: ClientService,
    private itemService: ItemService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
    });
  }

  filterClient(event: any) {
    let query = event.query;
    this.clientService.findClientByName(query).subscribe((clients) => {
      this.filteredClients = clients;
    });
  }

  filterItem(event: any) {
    let query = event.query;
    this.itemService.findItemByName(query).subscribe((items) => {
      this.filteredItems = items;
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
