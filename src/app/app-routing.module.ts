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

import { AuthGuard } from "@auth0/auth0-angular";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "invoices",
    component: InvoicesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "invoice-add",
    component: InvoiceAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "invoice-add/:id",
    component: InvoiceAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "invoice-add/duplicate/:id",
    component: InvoiceAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "invoices/:id",
    component: InvoiceDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clients",
    component: ClientsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "clients/:id",
    component: ClientDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "client-add",
    component: ClientAddComponent,
    canActivate: [AuthGuard],
  },
  { path: "items", component: ItemsListComponent, canActivate: [AuthGuard] },
  {
    path: "items/:id",
    component: ItemDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: "item-add", component: ItemAddComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },

  { path: "", component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
