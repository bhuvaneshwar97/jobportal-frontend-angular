import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobapplicationlistComponent } from './jobapplicationlist/jobapplicationlist.component';
import { CreatejobapplicationComponent } from './createjobapplication/createjobapplication.component';
const routes: Routes = [
  {
    path: '',
    children:
      [
        {
          path: 'jobapplications', component: JobapplicationlistComponent
        },
        {
          path: 'jobapplications/createjobapplication/:id', component: CreatejobapplicationComponent
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule]
})
export class JobapplicationRoutingModule { }
