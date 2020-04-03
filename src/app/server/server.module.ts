import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerCardComponent } from './server-card/server-card.component';
import { ServerListComponent } from './server-list/server-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ServerCardComponent, ServerListComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServerModule { }
