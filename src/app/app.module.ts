import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule

  ],
  providers: [
    {
      provide: 'apiUrl',
      useValue: 'http://newnorthwindapi.azurewebsites.net/api'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
