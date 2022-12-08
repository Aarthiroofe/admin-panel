import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-four-being-states',
  templateUrl: './four-being-states.component.html',
  styleUrls: ['./four-being-states.component.scss']
})
export class FourBeingStatesComponent implements OnInit {
  ListData:any=[];
  UserData:any={};
  score;
  loading:boolean=false;
  FilterData:any={};
  show:boolean=false;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  constructor(private auth : ApiService, private toastr: ToastrService) { }

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
    this.auth.Four_report(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          this.UserData=res;
          this.score =  Math.round(res.Overall_Score);
          this.loading=false;
          this.show=true;
        }
        else{
          this.loading=false;
          this.toastr.error(res.message);
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
