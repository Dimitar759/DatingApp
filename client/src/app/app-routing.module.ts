import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { MemeberDetailComponent } from './members/memeber-detail/memeber-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangedGuard } from './_g/prevent-unsaved-changed.guard';

// import { NotFoundComponent } from './errors/not-found/not-found.component';
// import { ServerErrorComponent } from './errors/server-error/server-error.component';
const routes: Routes = [
  {path:'',component:HomeComponent, pathMatch: 'full'},
  {path:'',
    runGuardsAndResolvers: 'always', 
    canActivate: [authGuard],
    children: [
      {path:'members',component:MemeberListComponent},
      {path:'members/:username',component:MemeberDetailComponent},
      {path:'member/edit',component:MemberEditComponent, canDeactivate: [preventUnsavedChangedGuard]},
      {path:'lists',component:ListsComponent},
      {path:'messages',component:MessagesComponent},
    ]
  },
  {path: 'errors', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
