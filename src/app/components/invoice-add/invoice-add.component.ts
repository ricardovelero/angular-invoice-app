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
import { ActivatedRoute, Router } from "@angular/router";

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
  lastInvoice: Invoice[] = [];
  newNumber: any;

  selectedClient?: Client[];
  filteredClients: any[] | any;

  filteredItems: any[] | any;
  newProduct: any = {};
  products: any = [];

  cols: any[] | any;

  clonedItems: { [s: string]: Item } = {};

  productDialog?: boolean;

  submitted?: boolean;

  clicked: boolean = false;

  today: Date = new Date();

  defaultDueDate: Date = new Date();

  modalToggle: boolean = false;

  isEditting: boolean = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private clientService: ClientService,
    private itemService: ItemService,
    private invoiceService: InvoiceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.route.snapshot.params["id"]) {
      this.isEditting = true;
      this.getInvoice(this.route.snapshot.params["id"]);
    } else {
      this.newInvoice = {
        ClientId: "",
        number: "",
        date: Date,
        dueDate: Date,
        subtotal: 0,
        taxAmount: 0,
        total: 0,
        isRecurrent: false,
        notes: "",
        status: "Pendiente",
        billingMonth: "",
        items: [],
      };
      this.newInvoice.date = this.today;
      this.newInvoice.dueDate = this.addDays(this.today, 30);
      this.onAddItemRow();
      this.invoiceService.getLastInvoice().subscribe((invoices) => {
        if (invoices) {
          this.lastInvoice = invoices;
          this.checkInvoiceNumber(this.lastInvoice);
        } else {
          this.newInvoice.number = "100";
        }
      });
    }

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
  }

  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getInvoice(id: string): void {
    this.invoiceService.getInvoice(id).subscribe({
      next: (data) => {
        this.newInvoice = data;
        var obj: any = {};
        for (let item of this.newInvoice.Items) {
          obj["item"] = item;
          this.products.push(obj);
        }
        this.client = this.newInvoice.Client;
        this.newInvoice.date = new Date(
          this.newInvoice.date.replace(/-/g, "/")
        );
        this.newInvoice.dueDate = new Date(
          this.newInvoice.dueDate.replace(/-/g, "/")
        );
      },
      error: (e) => console.error(e),
    });
  }

  checkInvoiceNumber(data: any) {
    let lastChar: number = data.number.charAt(data.number.length - 1);
    if (isFinite(lastChar)) {
      lastChar = lastChar * 1 + 1;
      this.newNumber = data.number.replace(/[0-9]$/, lastChar);
    } else {
      this.newNumber = data.number;
    }
    this.newInvoice.number = this.newNumber;
  }

  onAddItemRow() {
    this.newProduct = {
      item: [],
    };
    this.products.push(this.newProduct);
  }

  onRowEditInit(item: ItemList | any) {
    this.clonedItems[item.item.id] = { ...item };
  }

  onRowEditSave(item: ItemList | any, index: any) {
    if (item.item.quantity > 0) {
      delete this.clonedItems[item.id];
      this.messageService.add({
        severity: "success",
        summary: "Éxito",
        detail: "Ítem actuzalizado con éxito",
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
    this.items[index] = this.clonedItems[item.item.id];
    delete this.clonedItems[item.item.id];
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
    this.newInvoice.subtotal = 0;
    this.newInvoice.total = 0;
    for (let product of products) {
      this.newInvoice.total += product.item.total;
      this.newInvoice.subtotal += product.item.subtotal;
      this.newInvoice.taxAmount = product.item.total - product.item.subtotal;
    }
  }

  saveNewInvoice() {
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
    this.router.navigate(["invoices"]);
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
