import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InvoicesListComponent } from "./components/invoices-list/invoices-list.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "home", component: DashboardComponent },
  { path: "invoices", component: InvoicesListComponent },
  { path: "invoice-add", component: InvoicesListComponent },
  { path: "clients", component: ClientsListComponent },
  { path: "clients/:id", component: ClientDetailsComponent },
  { path: "client-add", component: ClientAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
