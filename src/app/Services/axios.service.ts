import { ElementRef, Injectable } from '@angular/core';
import axios from 'axios';
import { global, js } from '../../main';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AxiosService{
  constructor(private router:Router) { }

  private async redirect():Promise<void>{
    if(!await this.validateToken()){
      this.router.navigate(["/login"]);
      js.toastWarning("Su sesión ha caducado");
      js.removeError();
    };
  }
  public async get(url: string): Promise<any> {
    this.redirect();
    return await (axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }));
  }

  public async postForm(url: string, formData: FormData): Promise<any> {
    this.redirect();
    return await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async putForm(url: string, formData: FormData): Promise<any> {
    await this.redirect();
    return await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async postFormJson(url: string, formData: FormData): Promise<any> {
    await this.redirect();
    const obj = await this.formToJson(formData);
    console.log(obj);
    return await axios.post(url, JSON.stringify(obj), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`
      },
    });
  }

  public async putFormJson(url: string, formData: FormData): Promise<any> {
    await this.redirect();
    const obj = await this.formToJson(formData);
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
    await this.redirect();
    return await axios.post(url, JSON.stringify(object), {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem(global.token.user)}`,
        'Content-Type': `application/json`,
      },
    });
  }
  public async postXForm(url: string, object: any): Promise<any> {
    const body = new URLSearchParams();
    Object.keys(object).forEach(key => body.append(key, object[key]));
    return await axios.post(url, body.toString(), {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
      },
    });
  }

  public async delete(url: string): Promise<any> {
    await this.redirect();
    return await (axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }));
  }

  public async formToJson(formData: any) {
    await this.redirect();
    return new Promise((resolve: any) => {
      let obj: any = {};
      try {
        let list = Array.from(formData);
        for (let index = 0; index < list.length; index++) {
          const [key, value]: any = list[index];
          obj[key] = value;
          if (index == list.length - 1) resolve(obj);
        }
      } catch (e) {
        console.warn(e);
        resolve(obj);
      }
    });
  }

  public async formToJsonTypes(form: any) {
    await this.redirect();
    return new Promise(async (resolve: any) => {
      let obj: any = {};
      try {
        const referencias = ["numeros", "decimal", "numeros-no-cero", "numeros-no-validate"];
        let numeros: any = await new Promise((res: any) => {
          let numericos: any = [];
          for (let index = 0; index < form.length; index++) {
            try {
              const element = form[index];
              const validate = element?.dataset?.validate;
              if (!!validate && !element?.dataset?.telefono) {
                if (!!referencias.find((x: string) => x == validate)) numericos.push(index);
              }
            } catch (e) {
              console.warn(e);
            }
            if (form.length - 1 == index) res(numericos);
          }
        });
        let formData: any = new FormData(form);
        let list = Array.from(formData);
        for (let index = 0; index < list.length; index++) {
          const [key, value]: any = list[index];
          obj[key] = numeros.findIndex((x: number) => x == index)>=0 ? parseFloat(value.replaceAll(",", ".")) : value;
          if (index == list.length - 1) resolve(obj);
        }
      } catch (e) {
        console.warn(e);
        resolve(obj);
      }
    });
  }

  public async validateToken(): Promise<Boolean> {
    const token = localStorage.getItem(global.token.user);
    const url = `${global.BASE_API_URL}api/Security/validateToken`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }).then(() => true).catch((error) => {
      console.clear();
      try {
        if (token == null) return false;
        const url = `${global.BASE_API_URL}connect/revoque?id_token_hint=${token}`;
        axios.get(url).then().catch(e => console.warn(e));
      } finally {
        localStorage.removeItem(global.token.user);
        return false;
      }
    });
  }


}
