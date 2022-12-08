import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
const baseUrl: any = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  items = [];
  constructor(private http: HttpClient) {}
  login(login){
    return this.http.post(baseUrl + '/hplogin',login);
  }
  App_field(data){
    return this.http.post( baseUrl+'/dashboard_field',data);
  }
  HpList(data){
    return this.http.post(baseUrl + '/hplist',data);
  }
  hpScore(data){
    return this.http.post(baseUrl +'/report_hp_score',data);
  }
  maturityIndex(data){
    return this.http.post(baseUrl +'/report_maturity_index',data);
  }
  dimensions(data){
    return this.http.post(baseUrl +'/report_dimension_high_and_lower_score',data);
  }
  
  Opm_Report(data){
    return this.http.post( baseUrl +'/report_opm',data);
  }
  Four_report(data){
    return this.http.post( baseUrl +'/opm_four_being_states',data);
  }
  Eight_report(data){
    return this.http.post( baseUrl+'/report_eight_attributes',data);
  }
  ReportView(data){
    return this.http.post( baseUrl +'/viewreport',data);
  }
  comparisionResult(data){
    return this.http.post( baseUrl+'/comparison',data);
  }
  OrgList(data){
    return this.http.post( baseUrl +'/organization_list',data);
  }
  teamMeasures(data){
    return this.http.post( baseUrl+'/team_measure',data);
  }
  heartMeasure(data){
    return this.http.post(baseUrl+'/heart_in_bussiness_report_download',data);
  }
  addOrgList(data) {
    this.items.push(data);
  }
  downloadReportExcel(data){
    return this.http.post( baseUrl +'/new_excel_export_report',data);
  }
  getOrgList() {
    return this.items;
  }

  private pptFilter = new BehaviorSubject([]);
  pptFilterObserve = this.pptFilter.asObservable();

  getFilterData(data) {
    this.pptFilter.next(data);
  }
  userFor360(data){
    return this.http.post( baseUrl+ '/assessment360_user', data);
  }
  assessmentReportDownload(data: any){
    return this.http.post( baseUrl +'/assessment360web_report_download',data);
  }
  DownloadHeartMeasureReport(data){
    return this.http.post(baseUrl+'/pdf_heart_measures_download_report',data);
  }
}

