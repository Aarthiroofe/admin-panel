import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-maturity',
  templateUrl: './maturity.component.html',
  styleUrls: ['./maturity.component.scss']
})
export class MaturityComponent implements OnInit {
   // Variables
   ListData:any=[];
   UserData:any;
   show:boolean=false;
   loading:boolean=true;
   FilterData:any={};
   five1;
   five2;
   selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
   personal_index:any;
  constructor( private auth:ApiService, private toastr:ToastrService) { }

  ngOnInit() {
    this.GetField();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'answer',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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
  GetFilterData(){
    this.loading=true;
    let copyFilterData = Object.assign({}, this.FilterData);
    delete copyFilterData.name;
    let result = Object.keys(copyFilterData).map((key)=> {
      return Array.of(key, copyFilterData[key]) 
    });
    if(this.FilterData.name && this.FilterData.name.length) {
      result.push(['name', this.FilterData.name.length ?  this.FilterData.name.map(x => x.answer) : []])
    }
    console.log(result)
    const obj = {
      org_id:localStorage.getItem('org_id'),
      field:result
    }
    this.auth.maturityIndex(obj).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status == true){
          let mark= res.data;
          this.personal_index = res.data;
          let personalValue = this.personal_index - 2;
          this.personalFun(personalValue);
          this.UserData=Math.round(mark);
          this.loading=false;
          this.show=true;
        }
        else{
          this.loading=false;
          this.toastr.error(res.message);
          this.show=false;
        }
      },
      (err:any)=>{
        this.loading=false;
        this.show=false;
      }
    )
  }
  personalFun(data) {
    this.five1 = (data * 5) * 10;
    this.five2 = 100 - this.five1;
  }
  resetData(form){
    this.FilterData={};
    this.selectedItems = [];
    this.show = false;
  }
}
