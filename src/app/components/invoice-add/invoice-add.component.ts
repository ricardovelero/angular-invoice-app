import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/client.model";
import { Item } from "../../models/item.model";
import { ItemList } from "../../models/item-list.model";
import { ClientService } from "../../services/client.service";
import { ItemService } from "../../services/item.service";
import { MessageService } from "primeng/api";

import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
  providers: [ClientService, ItemService, MessageService],
})
export class InvoiceAddComponent implements OnInit {
  clients: Client[] = [];
  items: Item[] = [];

  selectedClient?: Client[];
  filteredClients: any[] | any;

  filteredItems: any[] | any;
  products: Array<ItemList> = [];
  newProduct: any = {};

  cols: any[] | any;

  clonedItems: { [s: string]: Item } = {};

  productDialog?: boolean;

  invoice_date?: Date;
  due_date?: Date;
  invoice_notes?: string;
  is_recurrent: boolean = false;

  submitted?: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private clientService: ClientService,
    private itemService: ItemService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
    });

    this.cols = [
      { field: "item_name", header: "Item" },
      { field: "quantity", header: "Cantidad" },
      { field: "unit_cost", header: "Precio" },
      { field: "tax1", header: "Impuesto" },
      { field: "total", header: "Valor" },
    ];
  }

  onAddItemRow() {
    this.newProduct = {
      id: "",
      item_name: "",
      quantity: 1,
      unit_cost: 0,
      tax1: 0,
      total: 0,
    };
    this.products.push(this.newProduct);
  }

  onRowEditInit(item: ItemList | any) {
    this.clonedItems[item.id] = { ...item };
  }

  onRowEditSave(item: ItemList | any, index: any) {
    if (item[index].quantity > 0) {
      delete this.clonedItems[item.id];
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Ítem actuzalizado",
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "La cantidad no puede ser cero",
      });
    }
  }

  onRowEditCancel(item: ItemList | any, index: number) {
    this.items[index] = this.clonedItems[item.id];
    delete this.clonedItems[item.id];
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

  calculateItemTotal(item: ItemList | any, quantity: number) {
    item.total = quantity * item.item_name.unit_cost;
  }
}
