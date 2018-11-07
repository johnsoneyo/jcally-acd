import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Payload } from '../datatransferobjects/payload';



@Injectable()
export class PhoneService {

  constructor(private http : HttpClient){
  }
 
  originate(extension : string): Observable<any>{
       let p = new Payload();
      p.extension = extension;
      p.callerId = "crm-0001";
      p.timeout = 120;
      p.app = "hello-world";
      p.endpoint = "SIP/astero";

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    return this.http.post('http://localhost:8080/ari-proxy/channels',p, httpOptions );
   }
 
   
 

}
