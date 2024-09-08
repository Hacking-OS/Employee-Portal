import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification/notification.AlertService';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {
  list: any;
  constructor(private sharedService: SharedService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.sharedService.getDataAndSetList(() => this.sharedService.GetApiResponse<Array<Object>, null>('api/Employees/GetEmployees', null), (response: any | HttpErrorResponse) => {
      if (response instanceof HttpErrorResponse) {
        this.notificationService.addAlert({
          type: 'error',
          message: 'Error: ' + JSON.stringify(response.error)
        })
      } else {
        this.list = response;
      }
    }).catch((error: any) => {
    })
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'salary', 'actions'];  // Columns to display
  items = [
    { id: '1', name: 'Item 1', description: 'Description for Item 1' },
    { id: '2', name: 'Item 2', description: 'Description for Item 2' },
    { id: '3', name: 'Item 3', description: 'Description for Item 3' }
  ];
  onEdit(item: any) {
    console.log('item');
    console.log(item);
    this.notificationService.addAlert({ type: 'info', message: 'info: ' })
  }
  onDelete(item: any) {
    console.log('item');
    console.log(item);
    this.notificationService.addAlert({ type: 'error', message: 'Error: ' });
  }
}
