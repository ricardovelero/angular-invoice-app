import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Invoice } from "src/app/models/invoice.model";
import { Client } from "../../models/client.model";
import { ClientService } from "../../services/client.service";
import { ItemService } from "../../services/item.service";
import { InvoiceService } from "src/app/services/invoice.service";

import {
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
} from "primeng/api";

@Component({
  selector: "app-invoice-add",
  templateUrl: "./invoice-add.component.html",
  styleUrls: ["./invoice-add.component.css"],
  providers: [ClientService, ItemService, InvoiceService],
})
export class InvoiceAddComponent implements OnInit {
  clients: Client[] = [];
  client: any = null;
  items: any = [];
  products: any = [];
  newProduct: any = {};
  theViewItem: any = {};

  newInvoice: any = {};
  lastInvoice: Invoice[] = [];
  newNumber: any;

  filteredClients: any[] | any;
  filteredItems: any[] | any;

  today: Date = new Date();
  defaultDueDate: Date = new Date();

  displayModal: boolean = false;
  displayItemModal: boolean = false;
  displayItemViewModal: boolean = false;

  isEditting: boolean = false;
  isEmpty: boolean = true;

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
        ClientId: 0,
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
        Items: [],
      };
      this.newInvoice.date = this.today;
      this.newInvoice.dueDate = this.addDays(this.today, 30);
      this.onAddItemRow();
      this.invoiceService.getLastInvoice().subscribe(
        (invoices) => {
          if (invoices) {
            this.lastInvoice = invoices;
            this.checkInvoiceNumber(this.lastInvoice);
          } else {
            this.newInvoice.number = "100";
          }
        },
        (err) => {
          err.error = "Cannont find last Invoice"
            ? (this.newInvoice.number = "100")
            : console.log(err.error);
        },
        () => console.log("Processing Last Invoice Complete.")
      );
    }

    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
    this.itemService.getAllItems().subscribe((items) => {
      this.items = items;
      this.items.forEach((element: any) => {
        Object.assign(element, { quantity: 0 });
        element = { ...this.items };
      });
    });
  }

  getInvoice(id: string): void {
    this.invoiceService.getInvoice(id).subscribe({
      next: (data) => {
        this.newInvoice = data;
        var obj: any = {};
        for (let [i, item] of this.newInvoice.Items.entries()) {
          obj["item"] = item;
          this.products = [...this.products, obj];
          item.quantity = item.InvoiceItems.quantity;
          item.subtotal = item.quantity * item.cost;
          item.total = item.subtotal * (1 + item.tax1 / 100);
          obj = {};
        }
        this.client = this.newInvoice.Client;
        this.newInvoice.date = new Date(
          this.newInvoice.date.replace(/-/g, "/")
        );
        this.newInvoice.dueDate = new Date(
          this.newInvoice.dueDate.replace(/-/g, "/")
        );
        this.calculateInvoiceTotal(this.products);
        if (this.route.snapshot.url[1].path === "duplicate") {
          this.isEditting = false;
          this.invoiceService.getLastInvoice().subscribe((invoices) => {
            if (invoices) {
              this.lastInvoice = invoices;
              this.checkInvoiceNumber(this.lastInvoice);
            } else {
              this.newInvoice.number = "100";
            }
          });
          this.newInvoice.id = null;
          this.newInvoice.date = this.today;
          this.newInvoice.dueDate = this.addDays(this.today, 30);
        }
      },
      error: (e) => console.error(e),
    });
  }

  checkInvoiceNumber(data: any) {
    if (isFinite(data.number)) {
      this.newNumber = data.number * 1 + 1;
    } else {
      let lastChar = data.number.charAt(data.number.length - 1);
      if (isFinite(lastChar)) {
        lastChar = lastChar * 1 + 1;
        this.newNumber = data.number.replace(/[0-9]$/, lastChar);
      } else {
        this.newNumber = data.number;
      }
    }
    this.newInvoice.number = this.newNumber;
  }

  onAddItemRow() {
    this.newProduct = {
      item: [],
    };
    this.products.push(this.newProduct);
    this.isEmpty = false;
  }

  onRemoveItemRow(index: number) {
    if (index > -1) {
      this.products.splice(index, 1);
      this.newInvoice.Items.splice(index, 1);
    }
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
      this.filteredItems.forEach((element: any) => {
        Object.assign(element, { quantity: 1 });
        element = { ...this.items };
        element = { ...this.filteredItems };
      });
    });
  }

  calculateInvoiceTotal(products: any) {
    this.newInvoice.subtotal = 0;
    this.newInvoice.taxAmount = 0;
    this.newInvoice.total = 0;
    for (let product of products) {
      if (product.item && product.item.total && product.item.subtotal) {
        this.newInvoice.total += product.item.total;
        this.newInvoice.subtotal += product.item.subtotal;
        this.newInvoice.taxAmount += product.item.total - product.item.subtotal;
      }
    }
  }

  calculateItemTotal(event: any, product: any) {
    if (!isFinite(event) || !event || event < 0) event = 0;
    if (product.item) {
      product.item.total =
        event * product.item.cost * (1 + product.item.tax1 / 100);
      product.item.subtotal = event * product.item.cost;
    }

    this.calculateInvoiceTotal(this.products);
  }

  saveNewInvoice() {
    this.reformatDates();
    this.invoiceService.createInvoice(this.newInvoice).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Exitoso",
          detail: "Nueva Factura guardada",
          life: 3000,
        });
      },
      error: (e) =>
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: e.message,
          life: 5000,
        }),
    });
    this.router.navigate(["invoices"]);
  }
  updateTheInvoice() {
    this.reformatDates();
    this.checkDuplicateItems();
    this.invoiceService
      .updateInvoice(this.newInvoice.id, this.newInvoice)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: "success",
            summary: "Exitoso",
            detail: "Factura guardada",
            life: 3000,
          });
        },
        error: (e) =>
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: e.message,
            life: 5000,
          }),
      });
    this.router.navigate(["invoices"]);
  }
  eraseInvoice(invoice: Invoice | any) {
    this.confirmationService.confirm({
      message:
        "¿Está seguro que quiere borrar la Factura Nº " + invoice.number + "?",
      header: "Por favor, confirmar...",
      acceptLabel: "Sí",
      rejectLabel: "No",
      icon: "pi pi-exclamation-triangle",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.invoiceService.deleteInvoice(invoice.id).subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: "success",
              summary: "Operación exitosa",
              detail: "Factura borrada",
              life: 3000,
            });
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "La factura no ha podido ser borrada",
              life: 5000,
            }),
        });
        this.router.navigate(["invoices"]);
      },
    });
  }

  checkDuplicateItems() {
    let values = this.newInvoice.Items;
    const lookup = values.reduce((a: any, e: any) => {
      a[e.id] = ++a[e.id] || 0;
      return a;
    }, {});

    console.log(values.filter((e: { id: string | number }) => lookup[e.id]));
  }

  showModalDialog() {
    this.displayModal = true;
  }
  clientFromChild(client: any) {
    this.client = client;
    this.newInvoice.ClientId = this.client.id;
  }
  showItemModalDialog() {
    this.displayItemModal = true;
  }
  itemFromChild(item: any) {
    var obj: any = {};
    const qty = 1;
    var total: number = qty * item.cost * (1 + item.tax1 / 100);
    var subtotal: number = qty * item.cost;
    Object.assign(item, { quantity: qty, total: total, subtotal: subtotal });
    obj["item"] = item;
    if (Object.keys(this.products[0].item).length === 0) {
      this.products[0].item = { ...item };
    } else {
      this.products.push(obj);
    }
    this.newInvoice.Items.push(item);
    console.log(this.products);
    this.calculateInvoiceTotal(this.products);
  }

  itemViewDetails(item: any) {
    this.displayItemViewModal = true;
    this.theViewItem = item.item;
  }

  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  reformatDates() {
    this.newInvoice.date = new Date(
      Date.UTC(
        this.newInvoice.date.getFullYear(),
        this.newInvoice.date.getMonth(),
        this.newInvoice.date.getDate()
      )
    );
    this.newInvoice.dueDate = new Date(
      Date.UTC(
        this.newInvoice.dueDate.getFullYear(),
        this.newInvoice.dueDate.getMonth(),
        this.newInvoice.dueDate.getDate()
      )
    );
  }
}
