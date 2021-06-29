import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { IProfile, ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  public user: IProfile = {} as IProfile;

  public language: string = 'en';
  public loading: boolean = true;
  public saving: boolean = false;
  public error: string = '';

  public readonly userProfileFrom: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  constructor(
    private profile: ProfileService,
    private translocoService: TranslocoService
  ) { }

  private setUser(user: IProfile): void {
    this.user = user;

    this.userProfileFrom.setValue({
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  public changeLanguage(): void {
    this.translocoService.setActiveLang(this.language);
  }

  public setError(error: string = ''): void {
    this.error = error;
  }

  public async saveProfile(): Promise<void> {
    this.saving = true;
    this.setError();

    try {
      const user: IProfile = await this.profile.setName(this.userProfileFrom.get('firstName')?.value, this.userProfileFrom.get('lastName')?.value);
      this.setUser({ ...user });
    } catch (e) {
      this.setUser(this.user);
      this.setError(e.error);
    } finally {
      this.saving = false;
    }
  }

  public async loadProfile() {
    try {
      this.userProfileFrom.disable();
      const res: IProfile = await this.profile.getProfileUser();
      this.setUser({ ...res });
      this.userProfileFrom.enable();
      this.loading = false;
    } catch (e) {
      console.error(e.error);
      this.loadProfile();
    }
  }

  public ngOnInit(): void {
    this.loadProfile();
  }

}
