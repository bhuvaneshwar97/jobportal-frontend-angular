import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobapplicationService } from '../jobapplication.service';

@Component({
  selector: 'app-createjobapplication',
  templateUrl: './createjobapplication.component.html',
  styleUrls: ['./createjobapplication.component.scss']
})
export class CreatejobapplicationComponent implements OnInit {
  myForm: FormGroup;
  currentId = '';
  files = [{ name: 'none', type: 'JPG', size: 256 }];
  resumeUploaded = '';
  additionalDocsUploaded = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['upload', 'uploadUrl']]
  };

  constructor(
    private fb: FormBuilder,
    private jobservice: JobapplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      dob: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      resume: [null, [Validators.required]],
      additionalDocs: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param: any) => {
      this.currentId = param.get('id');

      if (this.currentId !== 'new') {
        this.jobservice.getOneJobApplication(this.currentId).subscribe(
          (res: any) => {
            this.resumeUploaded = res.resume;
            this.additionalDocsUploaded = res.additionalDocs;
            this.myForm.patchValue({
              name: res.name,
              dob: new Date(res.dob),
              city: res.city,
              phone: res.phone,
              description: res.description
            });
          },
          (err: any) => console.log(err)
        );
      }
    });
  }
  getResumeDownloadUrl(): string {
    return `http://localhost:3005/downloadResume/${this.resumeUploaded}`;
  }
  getDocumentDownloadUrl(): string {
    return `http://localhost:3005/downloadAdditionalDocs/${this.currentId}`;
  }
  onSubmit() {
    if (this.currentId !== 'new') {
      if (this.myForm.touched) {
        this.postDataToDatabase();
      }
      else {
        Swal.fire({
          icon: 'success',
          text: this.currentId === 'new' ? 'Successfully saved job application details..!' : 'Successfully updated job application details..!',
        });
        setTimeout(() => {
          this.navigate('/jobapplications');
        }, 2000);
      }
    }
    else {
      if (this.myForm.valid) {
        this.postDataToDatabase();
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'Please fill in all required fields and correct any validation errors before submitting.',
        });
      }
    }
  }
  postDataToDatabase() {
    const formData = new FormData();
    if (this.myForm.value.name) {
      formData.append('name', this.myForm.value.name);
    }
    if (this.myForm.value.dob) {
      formData.append('dob', this.myForm.value.dob.toISOString());
    }
    if (this.myForm.value.city) {
      formData.append('city', this.myForm.value.city);
    }
    if (this.myForm.value.phone) {
      formData.append('phone', this.myForm.value.phone);
    }
    if (this.myForm.value.description) {
      formData.append('description', this.myForm.value.description);
    }
    if (this.myForm.value.resume) {
      formData.append('resume', this.myForm.value.resume);
    }
    if (this.myForm.value.additionalDocs && this.myForm.value.additionalDocs.length > 0) {
      for (const file of this.myForm.value.additionalDocs) {
        formData.append('additionalDocs', file);
      }
    }
    const request = (this.currentId === 'new') ?
      this.jobservice.postJobApplication(formData) :
      this.jobservice.updateJobApplication(this.currentId, formData)

    request.subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          text: this.currentId === 'new' ? 'Successfully saved job application details..!' : 'Successfully updated job application details..!',
        });
        setTimeout(() => {
          this.navigate('/jobapplications');
        }, 2000);
      },
      (err: any) => {
        Swal.fire({
          icon: 'warning',
          text: err.error,
        });
      }
    );
  }
  onResumeFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.myForm.patchValue({ resume: file });
      this.myForm.markAsTouched();
    }
  }
  onAdditionalDocsFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const additionalDocsFiles = [];
      for (let i = 0; i < files.length; i++) {
        additionalDocsFiles.push(files[i]);
      }
      this.myForm.patchValue({ additionalDocs: additionalDocsFiles });
      this.myForm.markAsTouched();
    }
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }
}
