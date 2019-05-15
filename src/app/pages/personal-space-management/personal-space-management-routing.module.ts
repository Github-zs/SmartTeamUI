import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalSpaceManagementComponent} from './personal-space-management.component';
import {AddNotePageComponent} from './add-note-page/add-note-page.component';
import {NoteDetailPageComponent} from './note-detail-page/note-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalSpaceManagementComponent,
    children: [
      {
        path: 'personal-space-page',
        loadChildren: './personal-space-page/personal-space-page.module#PersonalSpacePageModule',
      },
      {
        path: 'add-note-page',
        component: AddNotePageComponent,
      },
      {
        path: 'note-detail-page',
        component: NoteDetailPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSpaceManagementRoutingModule {

}
