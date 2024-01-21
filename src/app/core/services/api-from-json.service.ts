import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Concept, Product, SubCategory } from 'src/app/shared/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ApiFromJsonService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>("assets/data/products.json");
  }

  async getProductById(uuid: string) {
    const data = await this.getProducts().toPromise();
    return data.find(x => x.uuid == uuid);
  }

  getSubCategories(): Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>("assets/data/subcategories.json");
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>("assets/data/categories.json");
  }

  getConcepts(): Observable<Concept[]>{
    return this.http.get<Concept[]>("assets/data/concepts.json");
  }
}
