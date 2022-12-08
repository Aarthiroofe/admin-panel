import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eight-attitudes',
  templateUrl: './eight-attitudes.component.html',
  styleUrls: ['./eight-attitudes.component.scss']
})
export class EightAttitudesComponent implements OnInit {
  ListData:any=[];
  UserData:any=[];
  loading:boolean=false;
  FilterData:any={};
  show:boolean=false;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  eightfull: any = {};
    // Radar

  constructor(private auth:ApiService, private toastr: ToastrService) {
   
   }

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
      org_id: localStorage.getItem('org_id'),
    }
    this.auth.App_field(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          let listdata=res.field;
          for(let i=0;i<listdata.length;i++){
            listdata[i].label=listdata[i][0].question;
            listdata[i].changelabel=listdata[i][0].question;
            listdata[i].header=listdata[i][0].question;
            listdata[i].answer=listdata[i][0].answer;
            listdata[i].alterlabel=listdata[i].changelabel.split(' ').join('_');
            if(listdata[i][0].question == 'name') {
              this.getdropdownList(listdata[i])
            }
          }
          this.ListData=listdata;
          console.log(this.ListData)
          this.loading=false;
        }
        else{
          this.toastr.error(res.message)
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
    this.auth.Eight_report(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          let data=[]
          this.eightfull = res.data;
          for(let k in res.data){
            if (res.data.hasOwnProperty(k)) {
             data.push(res.data[k].toFixed(1))
           }
          }
         
          this.show=true;
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
  resetData(){
    this.FilterData={};
    this.selectedItems = [];
    this.show = false;
  }
}
