import { Component, OnInit, ViewChild } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { Invoice } from "../../models/invoice.model";
import { InvoiceService } from "../../services/invoice.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Router } from "@angular/router";
import { DropDownAnimation, CogRotation } from "./animations";

@Component({
  selector: "app-invoices-list",
  templateUrl: "./invoices-list.component.html",
  styleUrls: ["./invoices-list.component.css"],
  providers: [InvoiceService],
  animations: [DropDownAnimation, CogRotation],
})
export class InvoicesListComponent implements OnInit {
  @ViewChild("dt") dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  invoices: Invoice[] = [];
  invoice: Invoice | any;
  invoiceDialog: boolean = false;
  submitted: boolean = false;
  selectedInvoices: Invoice[] = [];
  ids: string[] = [];
  es: any;
  showSpinner: boolean = true;
  isEmpty: boolean = false;
  paymentDialog: boolean = false;
  loading: boolean = false;

  state: string = "default";
  queryId: string = "";
  rotate(id: any) {
    this.queryId = id;
    this.state = this.state === "default" ? "rotated" : "default";
  }
  constructor(
    private invoiceService: InvoiceService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.primengConfig.ripple = true;
    this.invoiceService.getAllInvoices().subscribe((invoices) => {
      this.invoices = invoices;
      this.isEmpty = invoices.length < 1 ? true : false;
      this.loading = false;
    });
    this.showSpinner = false;
  }
  toEditSelectedInvoice(invoice: any) {
    this.router.navigate([`invoice-add/${invoice.id}`]);
  }
  toDuplicateSelectedInvoice(invoice: any) {
    this.router.navigate([`invoice-add/duplicate/${invoice.id}`]);
  }
  toDetailsInvoice(invoice: any) {
    this.router.navigate([`invoices/${invoice.id}`]);
  }
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
  openNew() {
    this.invoice = {};
    this.submitted = false;
    this.invoiceDialog = true;
  }
  hideDialog() {
    this.invoiceDialog = false;
    this.submitted = false;
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  updateStatus(invoice: Invoice | any) {
    let status = invoice.status == "Pendiente" ? "Pagada" : "Pendiente";
    const data = { status: status };
    this.invoiceService.updateInvoice(invoice.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: "success",
          summary: "Operación exitosa",
          detail: "Estado cambiado",
          life: 3000,
        });
        const invoiceIndex = this.invoices.findIndex(
          (obj) => obj.id == invoice.id
        );
        this.invoices[invoiceIndex].status = status;
      },
      error: (e) =>
        this.messageService.add({
          severity: "error",
          summary: "Error en la operación",
          detail: "El estado no ha podido ser cambiado",
          life: 5000,
        }),
    });
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
            this.invoices = this.invoices.filter(
              (val) => val.id !== invoice.id
            );
          },
          error: (e) =>
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "La factura no ha podido ser borrada",
              life: 5000,
            }),
        });
        this.invoice = {};
      },
    });
  }
  deleteSelectedInvoices() {
    this.confirmationService.confirm({
      message: "¿Está seguro de que quiere borrar los ítems seleccionados?",
      header: "Confirme",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        const invoicesToDelete = this.invoices.filter((val) =>
          this.selectedInvoices.includes(val)
        );
        invoicesToDelete.forEach((theInvoice) => {
          let id = theInvoice.id;
          this.ids.push(id!);
        });
        this.invoiceService.deleteInvoice(this.ids).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Operación exitosa",
              detail: "invoice borrado",
              life: 3000,
            });
          },
          error: (e) => {
            this.messageService.add({
              severity: "error",
              summary: "Error en la operación",
              detail: "El ítem no ha podido ser borrado",
              life: 5000,
            });
          },
        });
        this.invoices = this.invoices.filter(
          (val) => !this.selectedInvoices.includes(val)
        );
        this.selectedInvoices = [];
        this.ids = [];
      },
    });
  }
}
