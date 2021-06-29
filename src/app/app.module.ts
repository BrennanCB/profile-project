import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { TranslocoRootModule } from './transloco/transloco-root.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    TranslocoRootModule
  ],
  declarations: [
    AppComponent,
    ProfileSettingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
