import { Component } from '@angular/core';
import { BusyPayload, BusyService } from './Shared-Module/Interceptors/busy.service';
import { observeOn, asapScheduler, delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Employee-Portal-System';
  busy: boolean = false;
  constructor(private busyService:BusyService){
    this.busyService.busyState$.pipe(observeOn(asapScheduler)).subscribe((bs: BusyPayload) => (this.busy = bs.isBusy));
  }
  ngOnInit(): void {
  }
}
