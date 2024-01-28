import { Injectable } from '@angular/core';
import axios from 'axios';
import { js,global } from '../app.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private router: Router) {
    this.interceptorInit();
  }
  private interceptorInit() {
    axios.interceptors.response.use((response) => response
      ,error => {
        const status = error?.response?.status;
        if(!status){
          this.logout(true);
          this.router.navigate(["/login"]);
          return;
        }
        if ([511, 401, 403].includes(status)) {
          switch (status) {
            case 511: {
              this.logout();
              this.router.navigate(["/login"]);
              js.toastWarning("Su sesión ha caducado");
              break;
            }
            case 401: {
              this.logout();
              js.toastWarning("Su sesión ha caducado");
              this.router.navigate(["/login"]);
              break;
            }

            case 403: {
              this.logout();
              this.router.navigate(["/login"]);
              js.toastWarning("Su sesión ha caducado");
              break;
            }
          }
        }
        return Promise.reject(error);
      });
  }
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

  public async postForm(url: string, formData: FormData): Promise<any> {
    return await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async putForm(url: string, formData: FormData): Promise<any> {
    return await axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      },
    });
  }

  public async postFormJson(url: string, formData: FormData): Promise<any> {
    const obj = await this.formToJson(formData);
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
          obj[key] = numeros.findIndex((x: number) => x == index) >= 0 ? parseFloat(value.replaceAll(",", ".")) : value;
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
    if(!token) return false;
    const url = `${global.BASE_API_URL}api/Security/validateToken`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`,
        'Content-Type': `application/json`,
      },
    }).then(() => true).catch((error) => {
      // console.clear();
      this.logout();
      return false;
    });
  }
  public async getFile(url: string): Promise<any> {
    return await axios({
      method: "GET",
      url,
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          global.token.user
        )}`
      }
    });
  }
  public  logout(internal?:boolean):void{
    try {
      const token = localStorage.getItem(global.token.user);
      if (token == null){
        localStorage.removeItem(global.token.user);
        return;
      }
      const body = new URLSearchParams();
      body.append("token", token);
      body.append("token_type_hint","refresh_token");
      body.append("client_id","Jwt");
      body.append("client_secret","My Client Secret");
      const url = `${global.BASE_API_URL}connect/revocation`;
      axios.post(url, body?.toString(), {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`,
        },
      });
    } finally {
      localStorage.removeItem(global.token.user);
      if(internal)
        if(!!js.document.querySelector(".modal-backdrop")){
          js.top?.location.reload()
        }
    }
  }
}
