import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { InvoiceAddComponent } from "./components/invoice-add/invoice-add.component";
import { InvoicesListComponent } from "./components/invoices-list/invoices-list.component";
import { ItemAddComponent } from "./components/item-add/item-add.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "home", component: DashboardComponent },
  { path: "invoices", component: InvoicesListComponent },
  { path: "invoice-add", component: InvoicesListComponent },
  { path: "invoices/:id", component: InvoiceAddComponent },
  { path: "clients", component: ClientsListComponent },
  { path: "clients/:id", component: ClientDetailsComponent },
  { path: "client-add", component: ClientAddComponent },
  { path: "items", component: ItemsListComponent },
  { path: "items/:id", component: ItemDetailsComponent },
  { path: "item-add", component: ItemAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
