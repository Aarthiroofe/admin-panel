import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from './../../../../environments/environment';
import * as html2pdf from 'html2pdf.js';
import pptxgen from "pptxgenjs";
const baseUrl = environment.baseUrl;
@Component({
  selector: 'app-normaluser',
  templateUrl: './normaluser.component.html',
  styleUrls: ['./normaluser.component.scss']
})
export class NormaluserComponent implements OnInit {
  @Input() user;
  User_id: any;
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
  five1;
  five2;
  circle1;
  circle2;
  three1;
  three2;
  three3;
  three4;
  three5;
  three6;
  constructor(private route: ActivatedRoute, private auth: ApiService, private router: Router) {

  }

  ngOnInit() {
    this.getData();

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
          this.circle1Fun(circleValue);

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
    window.open(baseUrl + '/download_report/' + id, '_blank');
  }
 

  personalFun(data) {
    this.five1 = (data * 5) * 10;
    this.five2 = 100 - this.five1;
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
  downloadPpt() {
    this.loading = true;
    const options: any = {
      margin: 0,
      image: { type: 'jpeg', quality: 0.9 },
      html2canvas: { scale: 1, dpi: 72, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'p', compress: true }
    };
    let pptx = new pptxgen();

    for (let i = 1; i <= 14; i++) {
      const content: any = document.getElementById('page_' + i);
      html2pdf().from(content).set(options).outputImg('img').then((res: any) => {
        console.log(res.src)
        const obj = {
          id: i,
          src: res.src
        }
        this.img.push(obj);
        if (i == 14) {
          setTimeout(() => {
            let filteredArray = this.getUnique(this.img, 'id')
            this.img = filteredArray;
            this.img.sort(function (a: any, b: any) {
              return (a.id - b.id)
            });
            
            for (let j = 0; j < this.img.length; j++) {
             
                let slide = {};
                slide[j] = pptx.addSlide("MASTER_NAME");
                slide[j].addImage({ data: this.img[j].src, x: 1, y: 2, sizing: { type: "cover", w: 3, h: 2 } });
                // pptx.writeFile({ fileName: "praveen.pptx" });
                // slide.addImage({ path: this.img[j].src, x: 1, y: 2 });
              if (this.img[j].id == 14) {
                // console.log(this.img)
                pptx.writeFile({ fileName: "praveen.pptx" });
                // doc.save(this.UserData.username + '.pdf');
                this.loading = false;
                return;
              }
            }
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
