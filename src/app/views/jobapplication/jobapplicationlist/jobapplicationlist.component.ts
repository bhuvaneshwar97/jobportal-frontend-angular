import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from "sweetalert2";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobapplicationService } from '../jobapplication.service';

interface TableData {
  _id: string;
  name: string;
  city: string;
  phone: string;
  dob: Date;
  resume: string | null;
  additionalDocs: string | null;
}

@Component({
  selector: 'app-jobapplicationlist',
  templateUrl: './jobapplicationlist.component.html',
  styleUrls: ['./jobapplicationlist.component.scss']
})
export class JobapplicationlistComponent {
  constructor(private router: Router, private ds: JobapplicationService, private toastr: ToastrService, private http: HttpClient) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  jobApplications: TableData[] = [];
  displayedColumns = ['serialNo', 'name', 'city', 'phone', 'dob', 'resume', 'additionalDocs', 'actions'];
  tableSize = 2;
  page = 1;
  totalCount = 0;
  searchKeyword: string = '';
  isSearch = false;
  ngOnInit(): void {
    if (this.isSearch) {
      this.search(this.page);
    }
    else {
      this.getAll();
    }
  }

  getAll(): void {
    this.ds.getAllJobApplicationsWithPages(this.page, this.tableSize, "").subscribe(
      (res: any) => {
        this.jobApplications = res.jobApplications;
        this.totalCount = res.totalCount;
        this.page = res.currentPage;
      },
      (err: any) => console.log(err)
    );
  }

  createJobApplication(): void {
    this.router.navigate(['/jobapplications/createjobapplication/new']);
  }

  delete(e: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.deleteJobApplication(e._id).subscribe(
          (res: any) => {
            Swal.fire({
              icon: "success",
              text: "Successfully deleted..!"
            });
            this.getAll();
          },
          (err: any) => console.log(err)
        );
      }
    });
  }

  edit(e: any): void {
    this.router.navigate(['/jobapplications/createjobapplication/' + e._id]);
  }

  onTableDataChange(event: any): void {
    this.page = event;
    if (this.isSearch) {
      this.search(this.page);
    }
    else {
      this.getAll();
    }

  }

  downloadResume(row: TableData): void {
    if (row.resume) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
      this.http.get(`http://localhost:3005/downloadResume/${row.resume}`, { headers: headers, responseType: 'blob' }).subscribe(
        (res: Blob) => {
          const fileURL = URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = fileURL;
          a.download = row.resume ? row.resume : "Resume.pdf";
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL);
        },
        (err: any) => console.log(err)
      );
    }
  }

  downloadAdditionalDocs(row: TableData): void {
    if (row.additionalDocs && row.additionalDocs.length > 0) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/zip' });
      this.http.get(`http://localhost:3005/downloadAdditionalDocs/${row._id}`, { headers: headers, responseType: 'blob' }).subscribe(
        (res: Blob) => {
          const fileURL = URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = fileURL;
          a.download = 'AdditionalDocs.zip';
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL);
        },
        (err: any) => {
          console.log(err);
          this.toastr.error('Error downloading AdditionalDocs');
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'No AdditionalDocs to download'
      });
    }
  }
  search(pageNum: number) {
    if (this.searchKeyword.trim() !== '') {
      this.ds.getAllJobApplicationsWithPages(pageNum, this.tableSize, this.searchKeyword).subscribe(
        (res: any) => {
          this.jobApplications = res.jobApplications;
          this.totalCount = res.totalCount;
          this.page = res.currentPage;
          this.isSearch = true;
        },
        (err: any) => console.log(err)
      );
    } else {
      this.isSearch = false;
      this.getAll();
    }
  }
  onSearchClear() {
    if (this.searchKeyword.trim() === '') {
      this.isSearch = false;
      this.getAll();
    }
  }
}
