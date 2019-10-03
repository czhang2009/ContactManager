import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'contact', loadChildren: './contact/contact.module#ContactModule'},
      {path: '404', component : NotFoundComponent},
      {path: '500', component: InternalServerComponent},
      {path: '', redirectTo: '/contact', pathMatch: 'full'},
      {path: "**", redirectTo: '/404', pathMatch: 'full'}
   ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
