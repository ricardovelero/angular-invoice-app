import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InvoiceAddComponent } from "./components/invoice-add/invoice-add.component";
import { InvoiceDetailsComponent } from "./components/invoice-details/invoice-details.component";
import { InvoicesListComponent } from "./components/invoices-list/invoices-list.component";
import { ItemAddComponent } from "./components/item-add/item-add.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "invoices", component: InvoicesListComponent },
  { path: "invoice-add", component: InvoiceAddComponent },
  { path: "dashboard/invoice-add", component: InvoiceAddComponent },
  { path: "invoices/:id", component: InvoiceDetailsComponent },
  { path: "clients", component: ClientsListComponent },
  { path: "clients/:id", component: ClientDetailsComponent },
  { path: "client-add", component: ClientAddComponent },
  { path: "dashboard/client-add", component: ClientAddComponent },
  { path: "items", component: ItemsListComponent },
  { path: "items/:id", component: ItemDetailsComponent },
  { path: "item-add", component: ItemAddComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
