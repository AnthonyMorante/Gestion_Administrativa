import { Injectable } from '@angular/core';
import axios from 'axios';
import { global } from '../../main';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  constructor() { }
  public async get(url: string): Promise<any> {
    return await (axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }));
  }

  public async postForm(url: string, form: any): Promise<any> {
    return await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async putForm(url: string, form: any): Promise<any> {
    return await axios.put(url, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async postFormJson(url: string, form: any): Promise<any> {
    let obj:any={};
    form.forEach(function(value:any, key:string){
      obj[key] = value;
  });
    return await axios.post(url, JSON.stringify(obj), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`
      },
    });
  }

  public async putFormJson(url: string, form: any): Promise<any> {
    let obj:any={};
    form.forEach(function(value:any, key:string){
      obj[key] = value;
  });
    return await axios.put(url, JSON.stringify(obj), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`
      },
    });
  }


  public async postJson(url: string, object: any): Promise<any> {
    return await axios.post(url, JSON.stringify(object), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(global.token.user)}`,
        'Content-Type': `application/json`,
      },
    });
  }
  public async postXForm(url: string, object: any): Promise<any> {
    const body = new URLSearchParams();
    Object.keys(object).forEach(key=>body.append(key,object[key]));
    return await axios.post(url, body.toString(), {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
      },
    });
  }

  public async delete(url: string): Promise<any> {
    return await (axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }));
  }

}
