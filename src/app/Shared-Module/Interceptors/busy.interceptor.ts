import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from './busy.service';
import { LoadingService } from './loading.service';
import { finalize, catchError } from 'rxjs/operators';

export const BusyInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);          // Injecting BusyService
  const loadingService = inject(LoadingService);    // Injecting LoadingService

  console.log('BusyInterceptor triggered:', req.url);
  const msg = req.method === 'GET' ? 'Loading ...' : 'Saving ...';
  console.log(msg);

  // Set loading state to true when request starts
  loadingService.setLoadingState(true);
  busyService.increment(msg);

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        loadingService.setLoadingState(false);
        busyService.decrement();
      }, 2000);  // Delay to simulate slower response (adjust if needed)
    }),
    catchError((error) => {
      loadingService.setLoadingState(false);  // Ensure loading state is off on error
      busyService.decrement();
      throw error;  // Propagate the error
    })
  );
};
