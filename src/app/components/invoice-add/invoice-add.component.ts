import { Component, OnInit } from "@angular/core";
import { Invoice } from "src/app/models/invoice.model";
import { Client } from "../../models/client.model";
import { Item } from "../../models/item.model";
import { ItemList } from "../../models/item-list.model";
import { ClientService } from "../../services/client.service";
import { ItemService } from "../../services/item.service";
import { InvoiceService } from "src/app/services/invoice.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
  providers: [ClientService, ItemService, InvoiceService],
})
export class InvoiceAddComponent implements OnInit {
  newInvoice: any = {};

  clients: Client[] = [];
  client: any = {};
  items: Item[] = [];

  selectedClient?: Client[];
  filteredClients: any[] | any;

  filteredItems: any[] | any;
  newProduct: any = {};
  products: any = [];

  cols: any[] | any;

  clonedItems: { [s: string]: Item } = {};

  productDialog?: boolean;

  submitted?: boolean;

  constructor(
    private primengConfig: PrimeNGConfig,
    private clientService: ClientService,
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
      { field: "name", header: "Item" },
      { field: "quantity", header: "Cantidad" },
      { field: "cost", header: "Precio" },
      { field: "tax1", header: "Impuesto" },
      { field: "total", header: "Valor" },
    ];

    this.newInvoice = {
      clientId: "",
      number: "",
      date: Date,
      dueDate: Date,
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      isRecurrent: false,
      notes: "",
      status: "",
      billingMonth: "",
      items: [],
    };
  }

  onAddItemRow() {
    this.newProduct = {
      item: [],
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

  calculateInvoiceTotal(products: any) {
    this.newInvoice.total = 0;
    for (let product of products) {
      this.newInvoice.total += product.item.total;
    }
  }

  saveNewInvoice(theInvoice: any) {
    console.log(theInvoice);
    this.invoiceService.createInvoice(this.newInvoice).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Exitoso",
          detail: "Factura creada",
          life: 3000,
        });
      },
      error: (e) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: e,
          life: 5000,
        }),
    });
  }
}
