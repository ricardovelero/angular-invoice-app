import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AutoCompleteModule } from "primeng/autocomplete";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientsListComponent } from "./components/clients-list/clients-list.component";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SidebarMenuComponent } from "./shared/sidebar-menu/sidebar-menu.component";
import { InvoicesListComponent } from "./components/invoices-list/invoices-list.component";
import { InvoiceAddComponent } from "./components/invoice-add/invoice-add.component";
import { InvoiceDetailsComponent } from "./components/invoice-details/invoice-details.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { ItemAddComponent } from "./components/item-add/item-add.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    ClientDetailsComponent,
    ClientsListComponent,
    ClientAddComponent,
    SidebarMenuComponent,
    InvoicesListComponent,
    InvoiceAddComponent,
    InvoiceDetailsComponent,
    ItemsListComponent,
    ItemAddComponent,
    ItemDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
