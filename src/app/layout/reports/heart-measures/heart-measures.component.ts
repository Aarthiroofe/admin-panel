import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';
const baseUrl = environment.baseUrl;
@Component({
  selector: 'app-heart-measures',
  templateUrl: './heart-measures.component.html',
  styleUrls: ['./heart-measures.component.scss']
})
export class HeartMeasuresComponent implements OnInit {
  UserData:any={};
  ListData:any=[];
  FilterData:any={};
  loading:boolean=false;
  show:boolean=false;
  report_id;
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  constructor(private auth:ApiService, private toastr: ToastrService) { }

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
    let droplist = Object.assign([], list.answer);
    droplist.forEach((element, index) => {
        element.id = index + 1;
    });
    this.dropdownList = droplist;

  }
  resetData(form){
    this.FilterData={};
    this.show = false;
  }
  GetHeartMeasureData(){
    let copyFilterData = Object.assign({}, this.FilterData);
    delete copyFilterData.name;
    let result = Object.keys(copyFilterData).map((key)=> {
      return Array.of(key, copyFilterData[key]) 
    });
    if(this.FilterData.name && this.FilterData.name.length) {
      result.push(['name', this.FilterData.name.length ?  this.FilterData.name.map(x => x.answer) : []])
    }
    const obj_data={
      // user_id:this.FilterData.name
      org_id:localStorage.getItem('org_id'),
      field:result
    }
 
    this.auth.heartMeasure(obj_data).subscribe({
      next:(resp:any)=>{
        if(resp.status == true){
          this.report_id=resp.report_id;
          this.UserData=resp.data;
          this.show=true;
        }
        else{
          this.show=false;
          this.toastr.error(resp.message);
        }
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  Download_pdf() {
   
    window.open(baseUrl + '/pdf_heart_measures_download_report/' + this.report_id, '_blank');
    
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
