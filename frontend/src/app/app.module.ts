import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules (basic ones only)
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Third-party modules
import { NgxSpinnerModule } from 'ngx-spinner';

// App Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Core Services
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

// Shared Components
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

// Feature Modules
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UsersModule } from './features/users/users.module';
import { BillingModule } from './features/billing/billing.module';
import { SettingsModule } from './features/settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,

    // PrimeNG Modules
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MenuModule,
    SidebarModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    ChartModule,
    TabViewModule,
    PanelModule,
    FieldsetModule,
    InputSwitchModule,
    SliderModule,
    RatingModule,
    ColorPickerModule,
    EditorModule,
    FileUploadModule,
    StepsModule,
    TimelineModule,
    TagModule,
    ChipModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    DividerModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    DataViewModule,
    OrderListModule,
    PickListModule,
    TreeModule,
    TreeTableModule,
    OrganizationChartModule,
    GMapModule,
    CarouselModule,
    GalleriaModule,
    ImageModule,
    LightboxModule,
    MediaModule,
    MessagesModule,
    MessageModule,
    InplaceModule,
    ProgressBarModule,
    SkeletonModule,
    SpeedDialModule,
    SplitButtonModule,
    ToggleButtonModule,
    TooltipModule,
    OverlayPanelModule,
    PrimeSidebarModule,

    // Third-party modules
    NgxSpinnerModule,
    NgxPermissionsModule.forRoot(),
    NgxWebstorageModule.forRoot(),

    // Feature Modules
    AuthModule,
    DashboardModule,
    UsersModule,
    BillingModule,
    SettingsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {} 