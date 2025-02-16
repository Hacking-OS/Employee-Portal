import { Component } from '@angular/core';
import { SharedService } from '../../Shared-Module/Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeptList } from './models/department-listing.model';
import { error } from 'node:console';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-department-listing',
  templateUrl: './department-listing.component.html',
  styleUrl: './department-listing.component.scss'
})
export class DepartmentListingComponent {
  list:IDeptList[]=[];
  deptAdminName:IDeptList | undefined;
  // loading: boolean = true;
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
    },(error)=>{
      this.router.navigate(['/manage/department']);
    });


// Define the API response type
type DeptResponse = IDeptList[];

// Function to get API response with error handling
const getSafeApiResponse = (teamId: string): Observable<DeptResponse> => {
  return this.sharedService.GetApiResponse<DeptResponse, { teamId: string }>(
    'api/Employees/GetTeamsDetails',
    { teamId }
  ).pipe(
    catchError((error) => {
      console.error(`Error fetching data for team ${teamId}:`);
      // console.error(`Error fetching data for team ${teamId}:`, error);
      return of([] as DeptResponse); // Default to empty array on error
    })
  );
};

// Calling forkJoin
this.sharedService.getDataAndSetList<IDeptList[][]>(() =>
  forkJoin([
    getSafeApiResponse(teamName),
    getSafeApiResponse('TeamB'),
    getSafeApiResponse('TeamC'),
    getSafeApiResponse(teamName),
    getSafeApiResponse('TeamE'),
    getSafeApiResponse('TeamF'),
    getSafeApiResponse('TeamG'),
    getSafeApiResponse(teamName),
    getSafeApiResponse('TeamI'),
    getSafeApiResponse(teamName),
  ]).pipe(
    // map((responses: DeptResponse[]) => responses.flat()) // Merge all responses into a single array
  )
, (response: IDeptList[][]) => {
  console.log('Final Merged Response:', response);

  response.forEach((dept, index) => {
    console.log(`Dept ${index + 1}:`, dept);
  });

}, (error) => {
  console.error("A major error occurred:", error);
  // this.router.navigate(['/manage/department']);
});
    // this.sharedService.getDataAndSetList<IDeptList[][]>(() => 
    //   forkJoin([
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
    //   ])
    // , (response) => {
    //   console.log(response); // response is now IDeptList[][] (Array of Arrays)
    //   // You can access individual responses like:
    //   console.log(response[0]); // First API response
    //   console.log(response[1]); // Second API response
    // }, (error) => {
    //   this.router.navigate(['/manage/department']);
    // });
    

// this.sharedService.getDataAndSetList<IDeptList[]>(() => 
//   forkJoin([
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//     this.sharedService.GetApiResponse<IDeptList[], { teamId: string }>('api/Employees/GetTeamsDetails', { teamId: teamName }),
//   ]).pipe(
//     map((responses: IDeptList[][]) => responses.flat()) // Correctly typed map function
//   )
// , (response) => {
//   console.log(response); // Now response is of type IDeptList[]
// }, (error) => {
//   this.router.navigate(['/manage/department']);
// });

    



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
