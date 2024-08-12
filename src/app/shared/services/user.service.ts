import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface LoginParams {
  EmailId: 'string';
  Password: 'string';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  endpoint = 'https://freeapi.miniprojectideas.com/api/User';

  constructor() {}

  login(params: any) {
    return this.http.post(`${this.endpoint}/Login`, params);
  }
  register(params: any) {
    return this.http.post(`${this.endpoint}/CreateNewUser`, params);
  }
}
