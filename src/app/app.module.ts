import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './Shared-Module/shared.module';
import { provideNgxMask } from 'ngx-mask';
import { ErrorHandlerService } from './Shared-Module/Services/error-handler.service';
import { BusyInterceptor } from './Shared-Module/Interceptors/busy.interceptor';
import { errorHandlerInterceptor } from './Shared-Module/Interceptors/error-handler.interceptor';

@NgModule({
  declarations: [AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([errorHandlerInterceptor])
    ),
    // NotificationService,
    provideNgxMask(),
    // AuthService,
    // SharedService,

    // SharedEndPointService,
    // UserDoesNotExistGuard,UserExistsGuard,
    { provide:ErrorHandler, useClass:ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
    // { provide:ErrorHandlerService, useClass:ErrorHandler , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
