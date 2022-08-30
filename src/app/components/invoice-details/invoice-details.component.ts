import { Component, OnInit } from "@angular/core";
import { Invoice } from "../../models/invoice.model";
import { InvoiceService } from "../../services/invoice.service";
import { PrimeNGConfig } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.css"],
  providers: [InvoiceService],
})
export class InvoiceDetailsComponent implements OnInit {
  currentInvoice: Invoice | any;

  constructor(
    private invoiceService: InvoiceService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.invoiceService.getInvoice(this.route.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.currentInvoice = data;
      },
      error: (e) => console.error(e),
    });
  }
  back(): void {
    this.location.back();
  }
}
