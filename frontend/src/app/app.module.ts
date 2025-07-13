import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules (only essential ones)
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { StepsModule } from 'primeng/steps';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InplaceModule } from 'primeng/inplace';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';

// Third-party modules
import { NgxSpinnerModule } from 'ngx-spinner';

// App Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';

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
    LandingComponent,
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
    TabViewModule,
    PanelModule,
    FieldsetModule,
    InputSwitchModule,
    SliderModule,
    RatingModule,
    EditorModule,
    FileUploadModule,
    StepsModule,
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
    CarouselModule,
    GalleriaModule,
    ImageModule,
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

    // Third-party modules
    NgxSpinnerModule,

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