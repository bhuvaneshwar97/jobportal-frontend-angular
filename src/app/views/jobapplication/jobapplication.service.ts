import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {

  constructor(private http: HttpClient) { }

  getAllDistricts() {
    return this.http.get('http://localhost:3005/getallapplications')
  }
  getAllJobApplicationsWithPages(page: number, limit: number, searchText: string) {
    return this.http.get('http://localhost:3005/getallapplications?page=' + page + '&limit=' + limit + '&search=' + searchText)
  }
  deleteJobApplication(id: string) {
    return this.http.delete('http://localhost:3005/deletejobapplication/' + id)
  }
  getOneJobApplication(id: string) {
    return this.http.get('http://localhost:3005/getonejobapplicationdetails/' + id)
  }
  postJobApplication(payload: any) {
    return this.http.post('http://localhost:3005/addjobapplication', payload)
  }
  updateJobApplication(id: string, payload: any) {
    return this.http.put(`http://localhost:3005/updatejobApplicationDetails/${id}`, payload);
  }
}
