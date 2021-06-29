import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user: IProfile = {} as IProfile;

  constructor(
    private translocoService: TranslocoService
  ) { }

  private setEmail(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tempEmail = `${this.user.firstName?.trim()?.toLocaleLowerCase()}.${this.user.lastName?.trim()?.toLocaleLowerCase()}@blueface.com`;

        if (!(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$/).test(tempEmail)) reject({ error: this.translocoService.translate('email_error') });

        if (Math.round(Math.random())) {
          this.user.email = tempEmail;
          resolve(this.user);
        }

        reject({ error: this.translocoService.translate('email_error') });
      }, Math.random() * 5000);

    });
  }

  public getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email: 'michael.collins@blueface.com',
            age: 30
          };

          resolve(this.user);
        }

        reject({ error: this.translocoService.translate('profile_not_found') });
      }, Math.random() * 5000);
    });
  }

  async setName(firstName: string, lastName: string): Promise<IProfile> {
    const originalUser = { ...this.user };

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.user) return;

        if (Math.round(Math.random())) {
          this.user.firstName = firstName;
          this.user.lastName = lastName;
          resolve(this.user);
        }

        reject({ error: this.translocoService.translate('invalid_name') });
      }, Math.random() * 5000);
    });

    try {
      return await this.setEmail();
    } catch (e) {
      this.user.firstName = originalUser.firstName;
      this.user.lastName = originalUser.lastName;
      throw e;
    }
  }
}
