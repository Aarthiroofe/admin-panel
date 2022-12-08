import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.scss']
})
export class ComparisionComponent implements OnInit {
  FilterData:any={};
  CompareData:any={};
  ListData:any=[];
  show:boolean=false;
  UserData:any={};
  loading:boolean=true;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  barwidth1;
  barwidth2;
  circle1;
  circle2;
  circle3;
  circle4;
  five1;
  five2;
  five3;
  five4;
  dimension1: any = [];
  dimension2: any = [];
  bgcolor: any = [
    '#fd0100',
    '#fde32f',
    '#2b9349',
    '#c54de6',
    '#fa851d'
];
    // Radar opm 1

  
  constructor(private auth:ApiService,private toastr:ToastrService) {

    
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
            listdata[i].answer=listdata[i][0].answer;
            if(listdata[i][0].question == 'name') {
              this.getdropdownList(listdata[i])
            }
          }
          this.ListData=listdata;
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
    this.loading=true;
    let copyFilterData = Object.assign({}, this.FilterData);
    delete copyFilterData.name;
    let result = Object.keys(copyFilterData).map((key)=> {
      return Array.of(key, copyFilterData[key]) 
    });
    if(this.FilterData.name && this.FilterData.name.length) {
      result.push(['name', this.FilterData.name.length ?  this.FilterData.name.map(x => x.answer) : []])
    }
    let copyCompareData = Object.assign({}, this.CompareData);
    delete copyCompareData.name;
    let result2 = Object.keys(copyCompareData).map((key)=> {
      return Array.of(key, copyCompareData[key]) 
    });
    if(this.CompareData.name && this.CompareData.name.length) {
      result2.push(['name', this.CompareData.name.length ?  this.CompareData.name.map(x => x.answer) : []])
    }

   
    const obj={
      org_id: localStorage.getItem('org_id'),
      field1:result,
      field2:result2
    }
    this.auth.comparisionResult(obj).subscribe(
      (res:any)=>{
        if(res.status == true){ 
          this.show=true;
          this.UserData=res;
          this.dimension1 = res.dimensionscore1;
          this.dimension2 = res.dimensionscore2;
          this.barwidth1 = (100 - res.hplevel1) + '%';
          this.barwidth2 = (100 - res.hplevel2) + '%';
          let circleValue1 = res.hplevel1 - 50;
          let circleValue2 = res.hplevel2 - 50;
          let maturity_index1 = res.maturity_index1 - 2;
          let maturity_index2 = res.maturity_index2 - 2;
          this.personalFun1(maturity_index1);
          this.personalFun2(maturity_index2);
          this.circle1Fun(circleValue1);
          this.circle2Fun(circleValue2);
          let data=[];
          let data1=[];
          let data2=[];
          let data3=[];
          // opm One chart data
          for(let k in this.UserData.opm1){
            if (this.UserData.opm1.hasOwnProperty(k)) {
             data.push(this.UserData.opm1[k].toFixed(1))
           }
          }
          // this.radarChartData[0].backgroundColor= this.bgcolor;
          // opm Two chart data
          for(let k in this.UserData.opm2){
            if (this.UserData.opm2.hasOwnProperty(k)) {
             data1.push(this.UserData.opm2[k].toFixed(1))
           }
          }
           // Eight attitudes one chart data
           for(let k in this.UserData.eightbeingattitude1){
            if (this.UserData.eightbeingattitude1.hasOwnProperty(k)) {
             data2.push(this.UserData.eightbeingattitude1[k].toFixed(1))
           }
          }
         
            // Eight attitudes Two chart data
            for(let k in this.UserData.eightbeingattitude2){
              if (this.UserData.eightbeingattitude2.hasOwnProperty(k)) {
               data3.push(this.UserData.eightbeingattitude2[k].toFixed(1))
             }
            }
           
            this.loading=false;
            // 5 team measures one
            let data4:any=[]
            for(let k in this.UserData.measurement1){
              if (this.UserData.measurement1.hasOwnProperty(k)) {
               data4.push(this.UserData.measurement1[k].toFixed(1))
             }
            }
           
            // 5 team measures one
            let data5:any=[]
            for(let k in this.UserData.measurement2){
              if (this.UserData.measurement2.hasOwnProperty(k)) {
               data5.push(this.UserData.measurement2[k].toFixed(1))
             }
            }
           
            // this.radarChartData5[0].backgroundColor= this.bgcolor;
        }
        else{
          this.show=false;
          this.loading=false;
          this.toastr.error(res.message)
        }
      },
      (err:any)=>{
        this.show=false;
        this.loading=false;
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

  circle2Fun(data) {
    if (data == 50) {
      this.circle3 = data * 2;
      this.circle4 = 100 - this.circle3;
    }
    else if (data >= 40) {
      this.circle3 = (data - 2.5) * 2;
      this.circle4 = 100 - this.circle3;
    }
    else if (data > 34.5) {
      this.circle3 = data * 2 - 1;
      this.circle4 = 100 - this.circle3;
    }
    else if (data > 0) {
      this.circle3 = data * 2;
      this.circle4 = 100 - this.circle3;
    } else if (data <= 0) {
      this.circle3 = 0;
      this.circle4 = 100 - this.circle3;
    }
  }
  personalFun1(data) {
    this.five1 = (data * 5) * 10;
    this.five2 = 100 - this.five1;
  }
  personalFun2(data) {
    this.five3 = (data * 5) * 10;
    this.five4 = 100 - this.five3;
  }
  resetData(form){
    this.FilterData={};
    this.CompareData={};
    this.selectedItems = [];
    this.show = false;
  }
}
