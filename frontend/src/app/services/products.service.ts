import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import { Product } from '../interfaces/products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private servidor :string;
  private appiusers: string;


  constructor(private http :HttpClient) { 
    this.servidor = "http://localhost:3000/api/"
    this.appiusers = "products/"
  }

  Consultarproduct(): Observable<Product[]>{
    return this.http.get<{data:Product[]}>(`${this.servidor}${this.appiusers}`).pipe(map(response => response.data));
  }
  
  deleteproduct(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servidor}${this.appiusers}${id}`);

  }

  addproduct(product:Product):Observable<void>{
    return this.http.post<void>(`${this.servidor}${this.appiusers}`,product);
  }

  getproduct(id: number): Observable<Product> {
    return this.http.get<{ data: Product }>(`${this.servidor}${this.appiusers}${id}`)
      .pipe(map(response => response.data));
  }
  editproduct(id:number,product:Product):Observable<void>{
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`,product);
  }

  update(id: number, cantLugares: number): Observable<void> {
    return this.http.put<void>(`${this.servidor}${this.appiusers}${id}`, { cantLugares });
}

}
