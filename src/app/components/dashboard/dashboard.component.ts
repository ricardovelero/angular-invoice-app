import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Invoice } from "src/app/models/invoice.model";
import { InvoiceService } from "src/app/services/invoice.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  invoices: Invoice[] = [];
  total: number = 0;

  constructor(
    public auth: AuthService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.totalPending(invoices);
      },
      error: (e) => {
        console.error(e);
        this.total = 0;
      },
    });
  }
  totalPending(invoices: Invoice[]) {
    invoices.forEach((invoice) => {
      if (invoice.status == "Pendiente") {
        this.total += invoice.total!;
      }
    });
  }
}
