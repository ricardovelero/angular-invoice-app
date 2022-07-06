import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { ClientListComponent } from "./components/clients-list/clients-list.component";
import { ClientAddComponent } from "./components/client-add/client-add.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    ClientDetailsComponent,
    ClientListComponent,
    ClientAddComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
