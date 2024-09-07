// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// // import { UserLoginComponent } from './app/user-module/user-login/user-login.component';

// const appConfig = {
//   providers: [
//     provideHttpClient(withFetch()), // Configure HttpClient to use fetch
//     provideRouter(routes) // Provide the application routes
//   ]
// };

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

//   // bootstrapApplication(UserLoginComponent)
//   // .catch(err => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// const appConfig = {
//   providers: [
//     provideHttpClient(withFetch()), // Configure HttpClient to use fetch
//     provideRouter(routes), // Provide the application routes
//     BrowserAnimationsModule // Import BrowserAnimationsModule
//   ]
// };

// bootstrapApplication(AppComponent, appConfig)
//   .catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// const appConfig = {
//   providers: [
//     provideHttpClient(withFetch()), // Configure HttpClient to use fetch
//     provideRouter(routes), // Provide the application routes
//     BrowserAnimationsModule, // Import BrowserAnimationsModule
//   ]
// };

// bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
