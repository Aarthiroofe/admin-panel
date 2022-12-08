import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../../shared/services/api.service';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.scss']
})
export class PptComponent implements OnInit {
   barwidth;
   circle1;
   circle2;
   five1;
   five2;
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
   hpData:any;
   opmData:any = {};
   fourData:any = {};
   dimensions: any = [];
   sortingObject: any[] = [];
   personal_index:any;
   eightfull: any = {};
   mesure: any = {};
  constructor(private auth: ApiService) { }

  ngOnInit() {
    this.auth.pptFilterObserve.subscribe(res => {
      if(res) {
        this.GetFilterData(res);
      }
    })
  }
  GetFilterData(datas){
    const obj = {
      org_id:localStorage.getItem('org_id'),
      field:datas
    }
    this.auth.hpScore(obj).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status == true){
          let mark= res.data;
          this.barwidth = (100 - res.data) + '%';
          let circleValue = res.data - 50;
          this.circle1Fun(circleValue);
          this.hpData= mark;
        }
        else{
        }
      },
      (err:any)=>{
      }
    );
    this.auth.Opm_Report(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          this.opmData=res.data;
          let data=[]
          for(let k in res.data){
            if (res.data.hasOwnProperty(k)) {
             data.push(res.data[k].toFixed(1))
           }
          }
          this.sortingObject = Object.keys(res.data).sort(function(a,b){return res.data[b]- res.data[a]});
          let bar1Value = res.data.Trustworthiness - 50;
          let bar2Value = res.data.Employee_Engagement - 50;
          let bar3Value = res.data.SelfLeadership - 50;
          let bar4Value = res.data.Inventiveness - 50;
          let bar5Value = res.data.Gettingdonediscuss - 50;
          let bar6Value = res.data.Customer_Orientation - 50;
          this.bar1Fun(bar1Value);
          this.bar2Fun(bar2Value);
          this.bar3Fun(bar3Value);
          this.bar4Fun(bar4Value);
          this.bar5Fun(bar5Value);
          this.bar6Fun(bar6Value);
        }
        else{
        }
      },
      (err:any)=>{
      }
    )
    this.auth.Four_report(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          this.fourData=res;
        }
        else{
        }
      },
      (err:any)=>{
      }
    )
    this.auth.dimensions(obj).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status == true){
          let mark= res.data;
          this.dimensions = res.data;
        }
        else{
        }
      },
      (err:any)=>{
      }
    )
    this.auth.maturityIndex(obj).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status == true){
          this.personal_index = res.data;
          let personalValue = this.personal_index - 2;
          this.personalFun(personalValue);
        }
        else{
        }
      },
      (err:any)=>{
      }
    )
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
         
        }
        else{
        }
      },
      (err:any)=>{
      }
    )
    this.auth.teamMeasures(obj).subscribe(
      (res:any)=>{
        if(res.status==true){
          this.mesure = res.data;
          let data=[]
          for(let k in res.data){
            if (res.data.hasOwnProperty(k)) {
             data.push(res.data[k].toFixed(1))
           }
         }
        }
        else{
         
        }
      },
      (err:any)=>{
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
  personalFun(data) {
    this.five1 = (data * 5) * 10;
    this.five2 = 100 - this.five1;
  }
}
