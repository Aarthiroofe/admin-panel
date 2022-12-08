import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginDetail={
    'email':'',
    'password':''
  };
  loading:boolean=false;
  constructor(public router: Router, private toastr: ToastrService, private auth: ApiService) {
  }

  onLoggedin(){
    this.loading=true;
    this.auth.login(this.loginDetail).subscribe(
      (res:any)=>{
        if(res.status == true){
          if(res.user){
            localStorage.setItem('token',res.token);
            this.ListOrg('admin', 1);
          }
          else{
            localStorage.setItem('token',res.token);
            this.ListOrg('user', res.organization_id);
            localStorage.setItem('org_id',res.organization_id)
            this.router.navigate(['/dashboard']);
            this.loading=false;
          }
        }
        else{
          this.toastr.error(res.error);
          this.loading=false;
        }
      },
      (err:any)=>{
        this.loading=false;
        console.log(err)
      }
    )
  }
  ngOnInit() {
  }
  ListOrg(user, id){
    const obj={
      token:localStorage.getItem('token')
    }
    this.auth.OrgList(obj).subscribe(
      (res:any)=>{
        if(res.status ==true){
          
          
          if(user == 'admin') {
            localStorage.setItem('admin','S_admin');
            localStorage.setItem('org_id',res.OrganizationList[0].survey_id);
            localStorage.setItem('org_name',res.OrganizationList[0].survey_name);
            localStorage.setItem('pdf_type', res.OrganizationList[0].pdf_type);
          } else {
            localStorage.setItem('admin','user');
            let pdy_type = res.OrganizationList.find(x => x.survey_id == id);
            localStorage.setItem('org_id',pdy_type.survey_id);
            localStorage.setItem('org_name',pdy_type.survey_name);
            localStorage.setItem('pdf_type', pdy_type.pdf_type);
          }
          this.router.navigate(['/dashboard']);
          this.loading=false;
        }
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }
}
