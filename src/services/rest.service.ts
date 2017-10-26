import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class RestService {
  private baseUrl;

  constructor(
    protected http: Http
  ) {
    this.baseUrl = 'http://jsonplaceholder.typicode.com/';
  }

  getItems(url) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    url = this.baseUrl + url;    
    
    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.onCatch)
      .do((res: Response) => {
         this.onSuccess(res);
      }, (error: any) => {
         this.onError(error);
      })
      .finally(() => {
         this.onEnd();
      });
  }

  getItem(url) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    url = this.baseUrl + url;      
    
    return this.http.get(url, options)
      .map((response: Response) => response.json())
      .catch(this.onCatch)
      .do((res: Response) => {
         this.onSuccess(res);
      }, (error: any) => {
         this.onError(error);
      })
      .finally(() => {
         this.onEnd();
      });
  }
  
  saveItem(url, data, update?) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    url = this.baseUrl + url;         
    
    let request;
    if(update) {
      request = this.http.put(
          url, data, options
        );
    } else {
      request = this.http.post(
          url, data, options
        );
    }
    return request.map((response: Response) => response.json())
      .catch(this.onCatch)
      .do((res: Response) => {
         this.onSuccess(res);
      }, (error: any) => {
         this.onError(error);
      })
      .finally(() => {
         this.onEnd();
      });
  }
  
  deleteItem(url) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    url = this.baseUrl + url;     
    
    return this.http.delete(url, options)
      .map((response: Response) => response.json())
      .catch(this.onCatch)
      .do((res: Response) => {
         this.onSuccess(res);
      }, (error: any) => {
         this.onError(error);
      })
      .finally(() => {
         this.onEnd();
      });
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onSuccess(res: Response): void {
    console.log('Request successful');
  }

  private onError(res: Response): void {console.log(res);
    console.log('Error, status code: ' + res.status);
  }

  private onEnd(): void {
    
  }

}
