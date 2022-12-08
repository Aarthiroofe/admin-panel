import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-opm',
  templateUrl: './opm.component.html',
  styleUrls: ['./opm.component.scss']
})
export class OpmComponent implements OnInit {
  //variable
  ListData:any=[];
  UserData:any={};
  loading:boolean=true;
  FilterData:any={};
  show:boolean=false;
  bar1;
  bar2;
  bar3;
  bar4;
  bar5;
  bar6;
  bar7;
  bar8;
  bar9;
  bar10;
  bar11;
  bar12;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  // Radar
 
  constructor(private auth : ApiService, private toastr: ToastrService) { 
   
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
          this.loading=false;
        }
      },
      (err:any)=>{
        console.log(err)
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
    this.auth.Opm_Report(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          this.UserData=res.data;
          let data=[]
          for(let k in res.data){
            if (res.data.hasOwnProperty(k)) {
             data.push(res.data[k].toFixed(1))
           }
          }
         
          let bar1Value = this.UserData.Trustworthiness - 50;
          let bar2Value = this.UserData.Employee_Engagement - 50;
          let bar3Value = this.UserData.SelfLeadership - 50;
          let bar4Value = this.UserData.Inventiveness - 50;
          let bar5Value = this.UserData.Gettingdonediscuss - 50;
          let bar6Value = this.UserData.Customer_Orientation - 50;
          this.bar1Fun(bar1Value);
          this.bar2Fun(bar2Value);
          this.bar3Fun(bar3Value);
          this.bar4Fun(bar4Value);
          this.bar5Fun(bar5Value);
          this.bar6Fun(bar6Value);
          this.show=true;
          this.loading=false;
        }
        else{
          this.toastr.error(res.message);
          this.show=false;
          this.loading=false;
        }
      },
      (err:any)=>{
        this.show=false;
        this.loading=false;
      }
    )
  }


  bar1Fun(data) {
    if (data == 50) {
      this.bar1 = data * 2;
      this.bar2 = 100 - this.bar1;
    }
    else if (data >= 40) {
      this.bar1 = (data - 2.5) * 2;
      this.bar2 = 100 - this.bar1;
    }
    else if (data > 34.5) {
      this.bar1 = data * 2 - 1;
      this.bar2 = 100 - this.bar1;
    }
    else if (data > 0) {
      this.bar1 = data * 2;
      this.bar2 = 100 - this.bar1;
    } else if (data <= 0) {
      this.bar1 = 0;
      this.bar2 = 100 - this.bar1;
    }
  }

  bar2Fun(data) {
    if (data == 50) {
      this.bar3 = data * 2;
      this.bar4 = 100 - this.bar3;
    }
    else if (data >= 40) {
      this.bar3 = (data - 2.5) * 2;
      this.bar4 = 100 - this.bar3;
    }
    else if (data > 34.5) {
      this.bar3 = data * 2 - 1;
      this.bar4 = 100 - this.bar3;
    }
    else if (data > 0) {
      this.bar3 = data * 2;
      this.bar4 = 100 - this.bar3;
    } else if (data <= 0) {
      this.bar3 = 0;
      this.bar4 = 100 - this.bar3;
    }
  }
  bar3Fun(data) {
    if (data == 50) {
      this.bar5 = data * 2;
      this.bar6 = 100 - this.bar5;
    }
    else if (data >= 40) {
      this.bar5 = (data - 2.5) * 2;
      this.bar6 = 100 - this.bar5;
    }
    else if (data > 34.5) {
      this.bar5 = data * 2 - 1;
      this.bar6 = 100 - this.bar5;
    }
    else if (data > 0) {
      this.bar5 = data * 2;
      this.bar6 = 100 - this.bar5;
    } else if (data <= 0) {
      this.bar5 = 0;
      this.bar6 = 100 - this.bar5;
    }
  }
  bar4Fun(data) {
    if (data == 50) {
      this.bar7 = data * 2;
      this.bar8 = 100 - this.bar7;
    }
    else if (data >= 40) {
      this.bar7 = (data - 2.5) * 2;
      this.bar8 = 100 - this.bar7;
    }
    else if (data > 34.5) {
      this.bar7 = data * 2 - 1;
      this.bar8 = 100 - this.bar7;
    }
    else if (data > 0) {
      this.bar7 = data * 2;
      this.bar8 = 100 - this.bar7;
    } else if (data <= 0) {
      this.bar7 = 0;
      this.bar8 = 100 - this.bar7;
    }
  }
  bar5Fun(data) {
    if (data == 50) {
      this.bar9 = data * 2;
      this.bar10 = 100 - this.bar9;
    }
    else if (data >= 40) {
      this.bar9 = (data - 2.5) * 2;
      this.bar10 = 100 - this.bar9;
    }
    else if (data > 34.5) {
      this.bar9 = data * 2 - 1;
      this.bar10 = 100 - this.bar9;
    }
    else if (data > 0) {
      this.bar9 = data * 2;
      this.bar10 = 100 - this.bar9;
    } else if (data <= 0) {
      this.bar9 = 0;
      this.bar10 = 100 - this.bar9;
    }
  }
  bar6Fun(data) {
    if (data == 50) {
      this.bar11 = data * 2;
      this.bar12 = 100 - this.bar11;
    }
    else if (data >= 40) {
      this.bar11 = (data - 2.5) * 2;
      this.bar12 = 100 - this.bar11;
    }
    else if (data > 34.5) {
      this.bar11 = data * 2 - 1;
      this.bar12 = 100 - this.bar11;
    }
    else if (data > 0) {
      this.bar11 = data * 2;
      this.bar12 = 100 - this.bar11;
    } else if (data <= 0) {
      this.bar11 = 0;
      this.bar12 = 100 - this.bar11;
    }
  }
  resetData(form){
    this.FilterData={};
    this.selectedItems = [];
    this.show = false;
  }
}
