import { Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { SharedService } from '../../Shared-Module/Services/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  distinctEmployeeCount: number = 0;
  totalEmployeeCount: number = 0;
  loading: boolean = true;

  // Mock employee data (fallback/static data)
  staticData = {
    distinctEmployeeCount: 15,
    totalEmployeeCount: 100,
  };

  list:any;

  constructor(private sharedService: SharedService){}

  ngOnInit(): void {
    // Simulate API call with delay
    this.sharedService.getDataAndSetList<any>(()=>this.sharedService.GetApiResponse<any,null>('api/Employees/GetTeams',null),(response)=>{
      this.list = response;
      setTimeout(() => {
      this.loading = false;
    }, 2000);
    });
  }


  getRandomColorCode(): string {
    const red = Math.floor(Math.random() * 256);   // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const blue = Math.floor(Math.random() * 256);  // Random value between 0 and 255

    // Convert the RGB values to a hex string and return
    return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  }
}
