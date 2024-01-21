import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  save(item: string, data: any) {
    localStorage.setItem(item, JSON.stringify(data));
  }

  get(item: string) {
    return localStorage.getItem(item);
  }
}
