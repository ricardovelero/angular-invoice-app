import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthModule } from "@auth0/auth0-angular";
import { AuthHttpInterceptor } from "@auth0/auth0-angular";
import { environment as env } from "../environments/environment";

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
import { ItemService } from "./services/item.service";
import { ClientService } from "./services/client.service";
import { AuthButtonComponent } from "./shared/auth-button/auth-button.component";
import { SignupButtonComponent } from "./shared/signup-button/signup-button.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SpinnerComponent } from "./shared/spinner/spinner.component";

import { AutoCompleteModule } from "primeng/autocomplete";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { ToolbarModule } from "primeng/toolbar";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToggleButtonModule } from "primeng/togglebutton";
import { MenubarModule } from "primeng/menubar";
import { InputComponent } from "./shared/input/input.component";
import { TooltipModule } from "primeng/tooltip";

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
    AuthButtonComponent,
    SignupButtonComponent,
    HomeComponent,
    ProfileComponent,
    SpinnerComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ToggleButtonModule,
    MenubarModule,
    TooltipModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          `https://facturazen-backend-9tcee.ondigitalocean.app/api/*`,
        ],
      },
    }),
  ],
  providers: [
    ItemService,
    ClientService,
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
