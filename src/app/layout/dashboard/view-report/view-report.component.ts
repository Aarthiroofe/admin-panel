import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute ,NavigationEnd,Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { environment } from '../../../../environments/environment';
const baseUrl = environment.baseUrl;


@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})

export class ViewReportComponent implements OnInit {
  pdf_type: any;
  User_id;
  
  constructor(private route:ActivatedRoute,private auth:ApiService, private router: Router) { 
    this.route.params.subscribe(
      (params)=>{
        this.User_id=params.id;
      }
    )
    

  }
 
  ngOnInit() { 
    this.pdf_type = localStorage.getItem('pdf_type');
  }

    
}
