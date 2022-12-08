import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ApiService } from '../../../shared/services/api.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    urlArray;
    organization_list:any=[];
    OrgId;
    Admin:boolean=false;
    constructor(private data : ApiService,public router: Router, private activatedRoute : ActivatedRoute, private auth: AuthService) {
        this.router.events.subscribe(value => {
            this.urlArray = router.url.toString().split('/').splice(1, router.url.length);
        });
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        if(localStorage.getItem('admin') == 'S_admin'){
            this.Admin=true;
        }
        else{
            this.Admin=false;
        }
        // this.organization_list = this.data.getOrgList();
        this.ListOrg();
        
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.clear();
    }
    user_name = this.auth.username();
    ListOrg(){
        const obj={
          token:localStorage.getItem('token')
        }
        this.data.OrgList(obj).subscribe(
          (res:any)=>{
            if(res.status ==true){
                this.organization_list= res.OrganizationList;
                let OrgId = localStorage.getItem('org_id');
                if(OrgId) {
                    this.OrgId = OrgId;
                } else {
                    this.OrgId=res.OrganizationList[0].survey_id;
                }
                
              // for(let i =0;i<res.OrganizationList.length;i++){
              //   this.auth.addOrgList(res.OrganizationList[i]);
              // }
              this.router.navigate(['/dashboard']);
              //this.loading=false;
            }
          },
          (err:any)=>{
            console.log(err);
          }
        )
      }
    OrgChange(data, list){
        console.log(data);
        console.log(list);
        let pdf_type = list.find(x => x.survey_id == data);
        //console.log(this.urlArray)
        let url=this.urlArray[0];
        localStorage.setItem('org_id', data);
        localStorage.setItem('org_name', pdf_type.survey_name);
        localStorage.setItem('pdf_type', pdf_type.pdf_type);
        console.log(data);
        //this.router.navigateByUrl('/');
        // if(url == 'dashboard'){
        //     console.log('d');
        //     this.router.navigate(['/report']);
        //     setTimeout(() => {
        //         this.router.navigate(['/dashboard']);
        //     }, 15);
        // }
        // else{
        //     this.router.navigate(['/']);
        // }
        location.reload();
    }
}
