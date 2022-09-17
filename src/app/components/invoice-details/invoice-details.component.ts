import { Component, OnInit } from "@angular/core";
import { Invoice } from "../../models/invoice.model";
import { InvoiceService } from "../../services/invoice.service";
import { PrimeNGConfig } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/user.model";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-invoice-details",
  templateUrl: "./invoice-details.component.html",
  styleUrls: ["./invoice-details.component.css"],
  providers: [InvoiceService],
})
export class InvoiceDetailsComponent implements OnInit {
  currentInvoice: Invoice | any;
  userProfile: string | any;
  currentUser: User[] | any;

  constructor(
    private invoiceService: InvoiceService,
    private primengConfig: PrimeNGConfig,
    private route: ActivatedRoute,
    private location: Location,
    public auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.invoiceService.getInvoice(this.route.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.currentInvoice = data;
      },
      error: (e) => console.error(e),
    });
    this.auth.user$.subscribe((profile) => {
      this.userProfile = profile;
      this.userService.findUserByEmail(this.userProfile.email).subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(this.currentUser);
        },
        error: (e) => console.error(e),
      });
    });
  }
  back(): void {
    this.location.back();
  }
}
