import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { Invoice } from "src/app/models/invoice.model";
import { InvoiceService } from "src/app/services/invoice.service";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  invoices: Invoice[] = [];
  page: number = 1;
  total: number = 0;

  picture: string = "";
  userProfile: string | any;
  currentUser: User[] | any;

  constructor(
    public auth: AuthService,
    private invoiceService: InvoiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.userProfile = profile;
      this.userService.findUserByEmail(this.userProfile.email).subscribe({
        next: (data) => {
          this.currentUser = data;
          this.picture = this.currentUser.picture;
        },
        error: (e) => console.error(e),
      });
    });
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
