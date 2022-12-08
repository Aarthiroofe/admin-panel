import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hp-score',
  templateUrl: './hp-score.component.html',
  styleUrls: ['./hp-score.component.scss']
})
export class HpScoreComponent implements OnInit {
   // Variables
   ListData:any=[];
   UserData:any;
   show:boolean=false;
   loading:boolean=true;
   FilterData:any={};
   barwidth;
   circle1;
   circle2;
   selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
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
    const obj = {
      org_id:localStorage.getItem('org_id'),
      field:result
    }
    this.auth.hpScore(obj).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status == true){
          let mark= res.data;
          this.barwidth = (100 - res.data) + '%';
          let circleValue = res.data - 50;
          this.circle1Fun(circleValue);
          this.UserData= mark;
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

  circle1Fun(data) {
    if (data == 50) {
      this.circle1 = data * 2;
      this.circle2 = 100 - this.circle1;
    }
    else if (data >= 40) {
      this.circle1 = (data - 2.5) * 2;
      this.circle2 = 100 - this.circle1;
    }
    else if (data > 34.5) {
      this.circle1 = data * 2 - 1;
      this.circle2 = 100 - this.circle1;
    }
    else if (data > 0) {
      this.circle1 = data * 2;
      this.circle2 = 100 - this.circle1;
    } else if (data <= 0) {
      this.circle1 = 0;
      this.circle2 = 100 - this.circle1;
    }
  }
}
