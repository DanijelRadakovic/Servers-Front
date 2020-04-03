import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerListComponent } from './server/server-list/server-list.component';


const routes: Routes = [
  { path: '**', component: ServerListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
