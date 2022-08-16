import { Component, Input, OnInit } from "@angular/core";
import { Invoice } from "../../models/invoice.model";
import { InvoiceService } from "../../services/invoice.service";
import { PrimeNGConfig } from "primeng/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.css"],
  providers: [InvoiceService],
})
export class InvoiceDetailsComponent implements OnInit {
  @Input() currentInvoice: Invoice | any;

  constructor(
    private invoiceService: InvoiceService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getInvoice(this.route.snapshot.params["id"]);
  }
  getInvoice(id: string): void {
    this.invoiceService.getInvoice(id).subscribe({
      next: (data) => {
        this.currentInvoice = data;
      },
      error: (e) => console.error(e),
    });
  }
}
