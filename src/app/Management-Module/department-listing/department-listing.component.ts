import { Component } from '@angular/core';
import { SharedService } from '../../Shared-Module/Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeptList } from './models/department-listing.model';

@Component({
  selector: 'app-department-listing',
  templateUrl: './department-listing.component.html',
  styleUrl: './department-listing.component.scss'
})
export class DepartmentListingComponent {
  list:IDeptList[]=[];
  deptAdminName:IDeptList | undefined;
  loading: boolean = true;
 displayedColumns:string[]=[];
  constructor(private sharedService: SharedService,private route: ActivatedRoute,private router:Router){}

  ngOnInit(): void {
  this.displayedColumns = ['teamGroupName', 'employeeName'];
    const teamName = this.route.snapshot.queryParamMap.get('teamId');
    if(!teamName){
      this.router.navigate(['/manage/department']);
      return;
    }
    // Simulate API call with delay
    this.sharedService.getDataAndSetList<IDeptList[]>(()=>this.sharedService.GetApiResponse<IDeptList[],{teamId:string}>('api/Employees/GetTeamsDetails', {teamId:teamName}),(response)=>{
      this.list = response.filter(x => x.isAdmin !== true);
      this.deptAdminName = response.filter(x => x.isAdmin === true)[0];
      setTimeout(() => {
      this.loading = false;
    }, 3000);
    });
    // setTimeout(() => {
    //   this.getEmployeeCounts().subscribe(
    //     (data) => {
    //       this.distinctEmployeeCount = data.distinctEmployeeCount;
    //       this.totalEmployeeCount = data.totalEmployeeCount;
    //       this.loading = false; // Turn off loading after fetching data
    //     },
    //     (error) => {
    //       console.error('Error fetching employee counts', error);
    //       this.loading = false;
    //     }
    //   );
    // }, 1500); // Simulate 1.5 seconds delay
  }

}
