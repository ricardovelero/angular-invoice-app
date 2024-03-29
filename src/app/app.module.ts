import { LOCALE_ID, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { registerLocaleData } from "@angular/common"
import localeEs from "@angular/common/locales/es"
registerLocaleData(localeEs, "es")

import { AuthModule } from "@auth0/auth0-angular"
import { AuthHttpInterceptor } from "@auth0/auth0-angular"
import { environment as env } from "../environments/environment"

import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { ClientDetailsComponent } from "./components/client-details/client-details.component"
import { ClientsListComponent } from "./components/clients-list/clients-list.component"
import { ClientAddComponent } from "./components/client-add/client-add.component"
import { FooterComponent } from "./shared/footer/footer.component"
import { HeaderComponent } from "./shared/header/header.component"
import { SidebarMenuComponent } from "./shared/sidebar-menu/sidebar-menu.component"
import { InvoicesListComponent } from "./components/invoices-list/invoices-list.component"
import { InvoiceAddComponent } from "./components/invoice-add/invoice-add.component"
import { InvoiceDetailsComponent } from "./components/invoice-details/invoice-details.component"
import { ItemsListComponent } from "./components/items-list/items-list.component"
import { ItemAddComponent } from "./components/item-add/item-add.component"
import { ItemDetailsComponent } from "./components/item-details/item-details.component"
import { ItemService } from "./services/item.service"
import { ClientService } from "./services/client.service"
import { AuthButtonComponent } from "./shared/auth-button/auth-button.component"
import { SignupButtonComponent } from "./shared/signup-button/signup-button.component"
import { HomeComponent } from "./components/home/home.component"
import { ProfileComponent } from "./components/profile/profile.component"
import { SpinnerComponent } from "./shared/spinner/spinner.component"
import { InputComponent } from "./shared/input/input.component"
import { FirstloginComponent } from "./components/firstlogin/firstlogin.component"
import { StepperComponent } from "./shared/stepper/stepper.component"
import { FilesComponent } from "./shared/files/files.component"
import { TestComponent } from "./components/test/test.component"
import { FileDropComponent } from "./shared/file-drop/file-drop.component"
// import {
//   AutoFocusDirective,
//   HighlightDirective,
// } from "./shared/trap-focus.directive";

import { AutoCompleteModule } from "primeng/autocomplete"
import { RippleModule } from "primeng/ripple"
import { TableModule } from "primeng/table"
import { ToastModule } from "primeng/toast"
import { CalendarModule } from "primeng/calendar"
import { DialogModule } from "primeng/dialog"
import { ButtonModule } from "primeng/button"
import { DropdownModule } from "primeng/dropdown"
import { InputTextModule } from "primeng/inputtext"
import { ToolbarModule } from "primeng/toolbar"
import { InputNumberModule } from "primeng/inputnumber"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { ConfirmationService, SharedModule } from "primeng/api"
import { MessageService } from "primeng/api"
import { InputTextareaModule } from "primeng/inputtextarea"
import { ToggleButtonModule } from "primeng/togglebutton"
import { MenubarModule } from "primeng/menubar"
import { TooltipModule } from "primeng/tooltip"
import { FileUploadModule } from "primeng/fileupload"
import { SelectButtonModule } from "primeng/selectbutton"
import { ProgressBarModule } from "primeng/progressbar"

import { NgxPaginationModule } from "ngx-pagination"
import { CdkStepperModule } from "@angular/cdk/stepper"
import { CdkMenuModule } from "@angular/cdk/menu"
import { NgxFileDropModule } from "@bugsplat/ngx-file-drop"
import { UploadsComponent } from "./shared/uploads/uploads.component"
import { FileUploaderComponent } from "./shared/file-uploader/file-uploader.component"
import { AuthSigninComponent } from "./components/auth-signin/auth-signin.component"

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
    FirstloginComponent,
    StepperComponent,
    InputComponent,
    FilesComponent,
    TestComponent,
    FileDropComponent,
    UploadsComponent,
    FileUploaderComponent,
    AuthSigninComponent,
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
    FileUploadModule,
    SelectButtonModule,
    NgxPaginationModule,
    CdkStepperModule,
    CdkMenuModule,
    NgxFileDropModule,
    ProgressBarModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          `http://localhost:8080/api/*`,
          {
            uri: "https://dev-gyc750vd.us.auth0.com/api/v2/*",
            tokenOptions: {
              // The attached token should target this audience
              audience: "https://dev-gyc750vd.us.auth0.com/api/v2/",
              // The attached token should have these scopes
              scope: "read:current_user",
            },
          },
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
    { provide: LOCALE_ID, useValue: "es" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
