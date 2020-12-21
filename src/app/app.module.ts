import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import {AppState} from './state/app.state';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { UcePipe } from './pipes/uce-pipe.pipe';
// import { SubjectCodePipe } from './pipes/subject-code.pipe';
// import {AngularFireModule} from "@angular/fire";
// import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState], {developmentMode: !environment.production}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: [AppState]}),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [
    // SubjectCodePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
