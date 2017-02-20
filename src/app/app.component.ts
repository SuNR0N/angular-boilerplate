import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'na-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    ngOnInit() {
        console.log('On AppComponent init...');
    }
}
