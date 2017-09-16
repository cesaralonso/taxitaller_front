import { AuthLocalstorage } from './shared/auth-localstorage.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

/*
* Platform and Environment providers/directives/pipes
*/
import { routing } from './app.routing';
// Configuración
import { Configuration } from './app.constants';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';

import { LocalStorageModule } from 'angular-2-local-storage';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  Configuration
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ConfirmModalComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    LocalStorageModule.withConfig({
        prefix: 'taxytaller',
        storageType: 'localStorage'
    }),
    BootstrapModalModule.forRoot({ container: document.body })
    
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AuthGuard,
    AuthService,
    AuthLocalstorage
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
