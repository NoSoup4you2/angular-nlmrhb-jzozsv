import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, retry} from 'rxjs/operators';
import {environment} from './environments/enviroment';
import {IDropdownCache, ServerDropdownOption} from './models/server-dropdown';

@Injectable({
  providedIn: 'root'
})
export class CustomDropdownService {

  private cache: Array<IDropdownCache> = [];
  data1: Array<IDropdownCache> = 
    [
        {
            "id": "1",
            "name": "Phone & Email Update"
        },
        {
            "id": "2",
            "name": "Farm Updates Titel Pro"
        },
        {
            "id": "3",
            "name": "Farm Updates ToolBox"
        },
        {
            "id": "4",
            "name": "Divorce Leads"
        }
    ]

  constructor(private http: HttpClient) { }

  fetchData(guid) {
    switch(guid) {
    case '820E04E0-8084-4D9C-A268-D8C0D21E74F6': { 
      console.log(this.data1);
      return this.data1 
      break; 
   } 
    }
    

  }

  private cacheResult(guid: string, res: Array<ServerDropdownOption>) {
    //
  }


}
