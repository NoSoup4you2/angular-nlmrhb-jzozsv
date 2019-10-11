import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { IgxInputGroupModule, IgxToggleModule, IgxDropDownModule, IgxIconModule } from "igniteui-angular";
import { DropDownComponent  } from "./ig-dropdown/ig-dropdown.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
		DropDownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
		IgxInputGroupModule,
    IgxToggleModule,
    IgxDropDownModule,
    IgxIconModule
  ],
  providers: [],
  entryComponents: []
})
export class AppModule {}
