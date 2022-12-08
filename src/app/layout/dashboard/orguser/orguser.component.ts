import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from './../../../../environments/environment';
const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-orguser',
  templateUrl: './orguser.component.html',
  styleUrls: ['./orguser.component.scss']
})
export class OrguserComponent implements OnInit {
  @Input() user;
  executiveSummary: any = {};
  UserData: any = {};
  OpmData: any = {};
  loading: boolean = true;
  Top: any = [];
  Bottom: any = [];
  AscendingData: any = [];
  reverseData: any = [];
  Data: any = [];
  img: any = [];
  Box_alignment: any = {};
  intensity: any;
  strength: any;
  external: any;
  personal_index: any;
  executiveLast: any;
  barwidth;
  circle1;
  circle2;
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
  five1;
  five2;
  three1;
  three2;
  three3;
  three4;
  three5;
  three6;
  sortingData: any[] = [];
  sortingObject: any[] = [];
  sortingEightObject: any = [];
  constructor(private route: ActivatedRoute, private auth: ApiService, private router: Router) {
    
  }
  ngOnInit() {
    this.getData();
  }
  loadFrameFun() {
    this.loading = false;
  }
  getData() {
    const obj = {
      token: localStorage.getItem('token'),
      user_id: this.user
    }
    this.auth.ReportView(obj).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.UserData = res;
          this.barwidth = (100 - res.hplevel) + '%';
          let circleValue = res.hplevel - 50;
          this.AscendingData = res.dimension_high_and_lower_score;
          this.OpmData = res.opm;
          let bar1Value = this.OpmData.Trustworthiness - 50;
          let bar2Value = this.OpmData.Employee_Engagement - 50;
          let bar3Value = this.OpmData.SelfLeadership - 50;
          let bar4Value = this.OpmData.Inventiveness - 50;
          let bar5Value = this.OpmData.Gettingdonediscuss - 50;
          let bar6Value = this.OpmData.Customer_Orientation - 50;
          this.circle1Fun(circleValue);
          this.bar1Fun(bar1Value);
          this.bar2Fun(bar2Value);
          this.bar3Fun(bar3Value);
          this.bar4Fun(bar4Value);
          this.bar5Fun(bar5Value);
          this.bar6Fun(bar6Value);

          this.executiveSummary = res.opm_avergae1;
          this.loading = false;
          let data = [];
          let data1 = [];
          this.executiveLast = res.lowscore[0] ? res.lowscore[0] : res.lowscore[0];
          this.Box_alignment.firstdata = res.dimension_alignment_authority_data.D1_D18;
          this.Box_alignment.seconddata = res.dimension_alignment_authority_data.D19_D23;
          this.intensity = res.dimension_intensity_score_data.intensity_score;
          this.strength = res.dimension_inner_strength_score_data.inner_strength_score;
          this.external = res.dimension_external_support_score_data.external_support_score;
          this.personal_index = res.dimension_personal_maturity_index_data.personal_maturity_index;
          let personalValue = this.personal_index - 2;
          this.personalFun(personalValue);
          let intensityValue = this.intensity - 2.4;
          this.intensityFun(intensityValue);

          let strengthValue = this.strength - 2.4;
          this.strengthFun(strengthValue);

          let externalValue = this.external - 2.4;
          this.externalFun(externalValue);
          
          for (let k in this.UserData.opm) {
            if (this.UserData.opm.hasOwnProperty(k)) {
              data.push(this.UserData.opm[k]);
            }
          }
          this.sortingData = data.sort((a: any, b: any) => b - a) ;
          this.sortingObject = Object.keys(res.opm).sort(function(a,b){return res.opm[b]- res.opm[a]})
          this.sortingObject = Object.keys(res.opm).sort(function(a,b){return res.opm[b]- res.opm[a]});
          let eightData = [];
          Object.entries(res.eightbeingattitude).forEach(element => {
            let eightobj = {
              name : element[0],
              value: element[1]
            }
            eightData.push(eightobj);
          });
          eightData.sort((a, b) => {return b.value - a.value})
          this.sortingEightObject = eightData;
          for (let k in this.UserData.eightbeingattitude) {
            if (this.UserData.eightbeingattitude.hasOwnProperty(k)) {
              data1.push(this.UserData.eightbeingattitude[k]);
            }
          }
          for (let j = 0; j < 3; j++) {
            this.Top.push(this.UserData.dimension_high_and_lower_score[j]);
          }
          this.Data = res.dimension_high_and_lower_score;
          this.reverseData = this.Data.reverse();
          for (let i = 0; i < 3; i++) {
            this.Bottom.push(this.reverseData[i]);
          }
          this.AscendingData.reverse();
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

  Download_pdf() {
    let id = this.user;
    window.open(baseUrl + '/download_report/' + id, '_blank')
  }
  // Download_pdf() {
  //   this.loading = true;
  //   const options: any = {
  //     margin: 0,
  //     filename: this.UserData.username + '.pdf',
  //     enableLinks:true,
  //     image: { type: 'jpeg', quality: 0.9 },
  //     html2canvas: { scale: 1, dpi: 72, letterRendering: true },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'p', compress: true }
  //   };
  //   let doc = new jsPDF({ unit: 'in', format: 'letter', orientation: 'p', compress: true });
  //   for (let i = 1; i <= 22; i++) {
  //     const content: any = document.getElementById('page_' + i);
  //     html2pdf().from(content).set(options).outputImg('img').then((res: any) => {
  //       const obj = {
  //         id: i,
  //         src: res.src
  //       }
  //       this.img.push(obj);
  //       if (i == 22) {
  //         setTimeout(() => {
  //           let filteredArray = this.getUnique(this.img, 'id')
  //           this.img = filteredArray;
  //           this.img.sort(function (a: any, b: any) {
  //             return (a.id - b.id)
  //           });
  //           for (let j = 0; j < this.img.length; j++) {
  //             if (this.img[j].id == 1) {
  //               doc.addImage(this.img[j].src, 'jpeg', 0, 0, 800, 0);
  //             }
  //             else {
  //               doc.addPage();
  //               doc.addImage(this.img[j].src, 'jpeg', 0, 0, 800, 0);
  //             }
  //             if (this.img[j].id == 22) {
  //               doc.save(this.UserData.username + '.pdf');
  //               this.loading = false;
  //               return;
  //             }
  //           }
  //         }, 1000);
  //       }
  //     });
  //   }
  // }
  getUnique(arr: any, comp: any) {
    const unique = arr.map((e: any) => e[comp]).map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((e: any) => arr[e]).map((e: any) => arr[e]);
    return unique
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
      this.bar1 = data * 1.9;
      this.bar2 = 100 - this.bar1;
    }
    else if (data > 25) {
      this.bar1 = data * 2;
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
      this.bar3 = data * 1.9;
      this.bar4 = 100 - this.bar3;
    }
    else if (data > 25) {
      this.bar3 = data * 2;
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
      this.bar5 = data * 1.9;
      this.bar6 = 100 - this.bar5;
    }
    else if (data > 25) {
      this.bar5 = data * 2;
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
      this.bar7 = data * 1.9;
      this.bar8 = 100 - this.bar7;
    }
    else if (data > 25) {
      this.bar7 = data * 2;
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
      this.bar9 = data * 1.9;
      this.bar10 = 100 - this.bar9;
    }
    else if (data > 25) {
      this.bar9 = data * 2;
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
      this.bar11 = data * 1.9;
      this.bar12 = 100 - this.bar11;
    }
    else if (data > 25) {
      this.bar11 = data * 2;
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
  intensityFun(data) {
    if (data >= 1.2) {
      this.three1 = 100;
      this.three2 = 100 - this.three1;
    } else {
      this.three1 = (data * 8.3) * 10;
      this.three2 = 100 - this.three1;
    }
  }
  strengthFun(data) {
    if (data >= 1.2) {
      this.three3 = 100;
      this.three4 = 100 - this.three3;
    } else {
      this.three3 = (data * 8.3) * 10;
      this.three4 = 100 - this.three3;
    }
  }
  externalFun(data) {
    if (data >= 1.2) {
      this.three5 = 100;
      this.three6 = 100 - this.three5;
    } else {
      this.three5 = (data * 8.3) * 10;
      this.three6 = 100 - this.three5;
    }
  }
  
  

}
