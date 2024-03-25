import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSimpleTextEditorModule } from 'ngx-simple-text-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { JobapplicationRoutingModule } from './jobapplication-routing.module';
import { JobapplicationlistComponent } from './jobapplicationlist/jobapplicationlist.component';
import { CreatejobapplicationComponent } from './createjobapplication/createjobapplication.component';


@NgModule({
  declarations: [
    JobapplicationlistComponent,
    CreatejobapplicationComponent
  ],
  imports: [
    CommonModule,
    JobapplicationRoutingModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatTableModule, MatPaginatorModule, MatCardModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,
    MatDatepickerModule, AngularEditorModule
  ],
  providers: [
    MatNativeDateModule,
    NgxSimpleTextEditorModule
  ]
})
export class JobapplicationModule { }

