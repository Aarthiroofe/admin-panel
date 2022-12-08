import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Route } from '@angular/compiler/src/core';
import { NgForm } from '@angular/forms';
import { environment } from './../../../environments/environment';
const baseUrl = environment.baseUrl;
import * as html2pdf from 'html2pdf.js';
import pptxgen from "pptxgenjs";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy, OnInit {
  // datatable variables
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  // Variables
  report:boolean=false;
  ListData:any=[];
  UserData:any=[];
  FilterData:any={};
  TableData:any=[];
  tableInner:any=[];
  selectedItems: any = [];
  dropdownList = [];
  dropdownSettings = {};
  loading:boolean=true;
  Table:boolean=false;
  setFilterDatas: any[] = [];
  img: any = [];
  constructor(private auth:ApiService, private toastr:ToastrService, private router:Router) { }

  ngOnInit() {
    this.GetField();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{
        emptyTable:     "No data available in table",
      }
    }
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
          console.log(listdata)
          for(let i=0;i<listdata.length;i++){
            listdata[i].label=listdata[i][0].question;
            listdata[i].changelabel=listdata[i][0].question;
            listdata[i].header=listdata[i][0].question;
            let answer=[];
            if(listdata[i][0].answer){
              for(let j=0;j<listdata[i][0].answer.length;j++){
                if(listdata[i][0].answer[j].answer){
                  answer.push(listdata[i][0].answer[j]);
                  listdata[i].answer=answer;
                }
              }
            }
            listdata[i].alterlabel=listdata[i].changelabel.split(' ').join('_');
            if(listdata[i][0].question == 'name') {
              this.getdropdownList(listdata[i])
            }
          }
         
          this.ListData=listdata;
          console.log( this.ListData)
          if(this.ListData.length !=0){
            this.GetData();
          }
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
 
  GetData(){
    this.loading=true;
    let result=[];
    const obj = {
      org_id:localStorage.getItem('org_id'),
      field:result
    }
    this.auth.HpList(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          if(res.Organization_Details){
            this.UserData=res.Organization_Details;
            for(let i=0;i<this.UserData.length;i++){
              for(let j=0;j<this.ListData.length;j++){
                if(this.UserData[i][this.ListData[j].alterlabel]){ 
                  let k =this.UserData[i][this.ListData[j].alterlabel];
                  this.tableInner[j]=k;
                }
                else{
                  let k ='Unknown';
                  this.tableInner[j]=k;
                }
              } 
              this.UserData[i].data=this.tableInner;
              this.tableInner=[];
            }
          }
          this.dtTrigger.next();
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
    let obj = {
      org_id:localStorage.getItem('org_id'),
      field:result
    }
    this.auth.getFilterData(result);
    this.auth.HpList(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          let datalist=res.Organization_Details;
          for(let i=0;i<datalist.length;i++){
            for(let j=0;j<this.ListData.length;j++){
              if(datalist[i][this.ListData[j].alterlabel]){ 
                let k =datalist[i][this.ListData[j].alterlabel];
                this.tableInner[j]=k;
              }
              else{
                let k ='Unknown';
                this.tableInner[j]=k;
              }
            } 
            datalist[i].data=this.tableInner;
            this.tableInner=[];
          }
          this.UserData=datalist;
          this.rerender();
          this.dtTrigger.next();
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
  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  ViewReport(data){
      this.router.navigate(['/dashboard/view-report',data.userlogin_id]);
    
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      //this.dtTrigger.next();
    });
  }
  resetData(form:NgForm){
    this.FilterData={};
    this.auth.getFilterData([]);
    this.rerender();
    this.GetData();
    
  }

  downloadReport() {
    let copyFilterData = Object.assign({}, this.FilterData);
    delete copyFilterData.name;
    let result = Object.keys(copyFilterData).map((key)=> {
      return Array.of(key, copyFilterData[key]) 
    });
    if(this.FilterData.name && this.FilterData.name.length) {
      result.push(['name', this.FilterData.name.length ?  this.FilterData.name.map(x => x.answer) : []])
    }
    // let obj = {
    //   org_id:localStorage.getItem('org_id'),
    //   field:result
    // }
    // this.auth.downloadReportExcel(obj).subscribe((res: any) => {
    //   console.log(res)
    // })
    if(result && result.length) {
      window.open(baseUrl + '/excel_export_report/' + localStorage.getItem('org_id') + '/' +  JSON.stringify(result), "_blank");
    } else {
      window.open(baseUrl + '/excel_export_report/' + localStorage.getItem('org_id'), "_blank");
    }
  }
  downloadPpt() {
    this.loading = true;
    let username = localStorage.getItem('org_name');
   
    const options: any = {
      margin: 0,
      image: { type: 'jpeg', quality: 0.9 },
      html2canvas: { scale: 1, dpi: 72, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'p', compress: true }
    };
    let pptx = new pptxgen();

    for (let i = 1; i <= 15; i++) {
      const content: any = document.getElementById('page_' + i);
      html2pdf().from(content).set(options).outputImg('img').then((res: any) => {
        const obj = {
          id: i,
          src: res.src
        }
        this.img.push(obj);
        if (i == 15) {
          setTimeout(() => {
            let filteredArray = this.getUnique(this.img, 'id')
            this.img = filteredArray;
            this.img.sort(function (a: any, b: any) {
              return (a.id - b.id)
            });
            let slide = {};
            slide[0] = pptx.addSlide("MASTER_NAME");
            slide[0].addImage({ data: this.img[0].src, x: 2.43, y: 2.0,  w: 4.91, h: 1.22});
            slide[1] = pptx.addSlide("MASTER_NAME");
            slide[1].addImage({ data: this.img[1].src, x: 1.3, y: 1.9,  w: 7.13, h: 3.26});
            slide[2] = pptx.addSlide("MASTER_NAME");
            slide[2].addImage({ data: this.img[2].src, x: 2.62, y: 0.8,  w: 4.64, h: 3.70});
            slide[3] = pptx.addSlide("MASTER_NAME");
            slide[3].addImage({ data: this.img[3].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[4] = pptx.addSlide("MASTER_NAME");
            slide[4].addImage({ data: this.img[4].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[5] = pptx.addSlide("MASTER_NAME");
            slide[5].addImage({ data: this.img[5].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[6] = pptx.addSlide("MASTER_NAME");
            slide[6].addImage({ data: this.img[6].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[7] = pptx.addSlide("MASTER_NAME");
            slide[7].addImage({ data: this.img[7].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[8] = pptx.addSlide("MASTER_NAME");
            slide[8].addImage({ data: this.img[8].src, x: 1.9, y: 1,  w: 6.18, h: 3.9});
            slide[9] = pptx.addSlide("MASTER_NAME");
            slide[9].addImage({ data: this.img[9].src, x: 1.9, y: 1.73,  w: 6.18, h: 2});
            slide[10] = pptx.addSlide("MASTER_NAME");
            slide[10].addImage({ data: this.img[10].src, x: 1.85, y: 0.3,  w: 5.7, h: 5});
            slide[11] = pptx.addSlide("MASTER_NAME");
            slide[11].addImage({ data: this.img[11].src, x: 1.9, y: 0.2,  w: 6.42, h: 5});
            slide[12] = pptx.addSlide("MASTER_NAME");
            slide[12].addImage({ data: this.img[12].src, x: 1.6, y: 1.54,  w: 6.85, h: 2.10});
            slide[13] = pptx.addSlide("MASTER_NAME");
            slide[13].addImage({ data: this.img[13].src, x: 2.62, y: 0.8,  w: 4.64, h: 3.70});
            slide[14] = pptx.addSlide("MASTER_NAME");
            slide[14].addImage({ data: this.img[14].src, x: 2.62, y: 0.8,  w: 4.64, h: 3.70});
            pptx.writeFile({ fileName: username + ".pptx" });
            this.loading = false;
            // for (let j = 0; j < this.img.length; j++) {
             
            //     let slide = {};
            //     slide[j] = pptx.addSlide("MASTER_NAME");
            //     slide[j].addImage({ data: this.img[j].src, x: 0, y: 0, sizing: { type: "cover", w:8, h: 4 } });
            //     // pptx.writeFile({ fileName: "praveen.pptx" });
            //     // slide.addImage({ path: this.img[j].src, x: 1, y: 2 });
            //   if (this.img[j].id == 14) {
            //     // console.log(this.img)
            //     pptx.writeFile({ fileName: "praveen.pptx" });
            //     // doc.save(this.UserData.username + '.pdf');
            //     this.loading = false;
            //     return;
            //   }
            // }
          }, 1000);
        }
      });
    }
  }

  getUnique(arr: any, comp: any) {
    const unique = arr.map((e: any) => e[comp]).map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e]).map((e: any) => arr[e]);
    return unique
  }
}
