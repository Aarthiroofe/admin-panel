import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/services/api.service';
import { Router} from '@angular/router';
import { AuthService } from './shared/services/auth.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private auth: ApiService, private router: Router, private authCheck: AuthService) {
    }
 
    ngOnInit() {
    }
}
