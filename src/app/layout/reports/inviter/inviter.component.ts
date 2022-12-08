import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared/services/api.service';
@Component({
  selector: 'app-inviter',
  templateUrl: './inviter.component.html',
  styleUrls: ['./inviter.component.scss']
})
export class InviterComponent implements OnInit {
  ListData:any=[];
  UserData:any;
  show:boolean=false;
  loading:boolean=true;
  FilterData:any={};
  userList: any[] = [];
  inviterDetail: any[] = [];
  invitercount: number = 0;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  constructor(private auth: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserList();
    this.GetField();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'answer',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      limitSelection: 1,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  resetData(form){
    this.FilterData={};
    this.selectedItems = [];
    this.show = false;
  }
  GetField(){
    const obj={
      org_id: localStorage.getItem('org_id')
    }
    this.auth.App_field(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          let listdata=res.field;
          for(let i=0;i<listdata.length;i++){
            listdata[i].label=listdata[i][0].question;
            listdata[i].answer=listdata[i][0].answer;
            if(listdata[i][0].question == 'name') {
              this.getdropdownList(listdata[i])
            }
          }
          this.ListData=listdata;
          console.log(this.ListData)
          this.loading=false;
        }
        else{
          this.loading=false;
        }
      },
      (err:any)=>{
        this.loading=false;
      }
    )
  }
  getdropdownList(list) {
    console.log(list)
    let droplist = Object.assign([], list.answer);
    droplist.forEach((element, index) => {
        element.id = index + 1;
    });
    this.dropdownList = droplist;

  }
  getUserList() {
    const obj = {
      org_id: localStorage.getItem('org_id')
    }
    this.auth.userFor360(obj).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.userList = res.user
        }
        else {
          this.loading = false;
        }
      },
      (err: any) => {
        this.loading = false;
      }
    )
  }
  // GetFilterData(){
  //   this.loading=true;
  //   let copyFilterData = Object.assign({}, this.FilterData);
  //   delete copyFilterData.name;
  //   let result = Object.keys(copyFilterData).map((key)=> {
  //     return Array.of(key, copyFilterData[key]) 
  //   });
  //   if(this.FilterData.name && this.FilterData.name.length) {
  //     result.push(['name', this.FilterData.name.length ?  this.FilterData.name.map(x => x.answer) : []])
  //   }
  //   const obj = {
  //     org_id:localStorage.getItem('org_id'),
  //     field:result
  //   }
  //   this.auth.hpScore(obj).subscribe(
  //     (res:any)=>{
  //       console.log(res)
  //       if(res.status == true){
          
  //       }
  //       else{
  //         this.loading=false;
  //         this.toastr.error(res.message);
  //         this.show=false;
  //       }
  //     },
  //     (err:any)=>{
  //       this.loading=false;
  //       this.show=false;
  //     }
  //   )
  // }
  GetFilterData() {
    if(this.FilterData && this.FilterData.name) {
     let name = this.FilterData.name[0].answer;
      if(name) {
        let user_id = this.userList.find((x: any) => x.username== name);
        if(user_id) this.getReportData(user_id.ulid)
      } else {
        
      }
    } else {
      this.toastr.error('Please Select User')
    }

  }
  getReportData(user_id) {
    
    this.loading = true;
    const obj = {
      user_id: user_id
    }
    console.log(obj)
    this.auth.assessmentReportDownload(obj).subscribe(
      (res: any) => {
        console.log(res)
        if(res.status) {
          let result = res.result[0];
          let person = result.person;
          this.invitercount = result.invitercount;
          person.unshift(result.usercontent);
          this.inviterDetail = person;
          this.loading = false;
          this.show = true;
          
        } else {
          this.loading = false;
          this.show = true;
        }

      },
      (err: any) => {
        this.loading = false;
        this.show = false;
      }
    )
  }
}
