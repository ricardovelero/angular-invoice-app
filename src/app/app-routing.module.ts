import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";

const routes: Routes = [
  { path: "", redirectTo: "clients", pathMatch: "full" },
  { path: "clients", component: ClientsListComponent },
  { path: "clients/:id", component: ClientDetailsComponent },
  { path: "add", component: ClientAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
