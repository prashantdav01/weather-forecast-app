import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { PageLayoutComponent } from './page-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    PageLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PageLayoutComponent,
  ]
})
export class PageLayoutModule { }
