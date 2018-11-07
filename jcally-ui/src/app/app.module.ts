import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/login/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {PhoneService} from './services/phone.service';
import {HttpClientModule} from '@angular/common/http';
import { WebsocketService } from './services/websocket.service';

import { HeaderComponent } from './pages/login/dashboard/header/header.component';
import { ContentComponent } from './pages/login/dashboard/content/content.component';
import { WsnotifierService } from './services/wsnotifier.service';
import {MatTableModule} from '@angular/material/table';
import { WaitingComponent } from './pages/login/dashboard/content/waiting/waiting.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HoldingBridgeComponent } from './pages/login/dashboard/content/holding-bridge/holding-bridge.component';
import { AriproxyService } from './services/ariproxy.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { Ng2DragDropService} from 'ng2-drag-drop/src/services/ng2-drag-drop.service';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SavebridgeComponent } from './pages/login/dashboard/content/savebridge/savebridge.component';
import { ToastrModule, ToastrService, ToastContainerModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { MixingBridgeComponent } from './pages/login/dashboard/content/mixing-bridge/mixing-bridge.component';
import { ExtensionComponent } from './pages/login/dashboard/content/extension/extension.component';
import { NotifierService } from './services/notifier.service';
import { TreeModule } from 'angular-tree-component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CallLogComponent } from './pages/login/dashboard/content/call-log/call-log.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { RoleModule } from './role/role.module';
import { ProfileComponent } from './pages/login/dashboard/content/profile/profile.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { BridgeDetailsComponent } from './pages/login/dashboard/content/bridge-details/bridge-details.component';
import { ChartsModule } from 'ng2-charts';
import { MetricsComponent } from './pages/login/dashboard/content/metrics/metrics.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] }]

@NgModule({
  declarations: [
    AppComponent,LoginComponent, 
    DashboardComponent, 
    HeaderComponent, ContentComponent, WaitingComponent, 
    HoldingBridgeComponent, SavebridgeComponent, MixingBridgeComponent, ExtensionComponent, CallLogComponent, ProfileComponent, BridgeDetailsComponent, MetricsComponent,
  ],
  imports: [MatExpansionModule,MatInputModule,MatTableModule,CdkTableModule,Ng2DragDropModule,TreeModule,RoleModule,
    MatButtonModule,HttpClientModule,MatMenuModule, FormsModule, ReactiveFormsModule,MatCheckboxModule,
    MatListModule,MatDividerModule,MatTabsModule,MatDialogModule,CommonModule,MatMenuModule,
    MatSidenavModule,MatToolbarModule,MatIconModule,ReactiveFormsModule,MatTooltipModule,
    BrowserModule,BrowserAnimationsModule, MatSelectModule,ToastrModule.forRoot(),ChartsModule,
    MatCardModule,MatProgressSpinnerModule, MatDividerModule,MatPaginatorModule,MatFormFieldModule,RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  entryComponents: [
    SavebridgeComponent,
  ],
  providers: [PhoneService,WebsocketService,Ng2DragDropService,AuthGuard,AuthService,
    WsnotifierService,AriproxyService,ToastrService,NotifierService,
     {provide: MAT_DIALOG_DEFAULT_OPTIONS,
       useValue: {hasBackdrop: false}},{
        provide: MAT_DIALOG_DATA,
        useValue: {} // Add any data you wish to test if it is passed/used correctly
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
