import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

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

import { AutoCompleteModule } from "primeng/autocomplete";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { SliderModule } from "primeng/slider";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ItemService } from "./services/item.service";
import { ClientService } from "./services/client.service";

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
    RippleModule,
    TableModule,
    ToastModule,
    CalendarModule,
    ToolbarModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    MultiSelectModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ContextMenuModule,
    SliderModule,
    ProgressBarModule,
  ],
  providers: [ItemService, ClientService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
