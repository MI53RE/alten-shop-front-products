import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private rootApi: string = 'http://localhost';
  private portApi: number = 3000;
  private pathApi: string = 'products'

  constructor(private http: HttpClient) { }

// get all products
getAllProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.rootApi}:${this.portApi}/${this.pathApi}`);
}
// get one product
getOneProduct(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.rootApi}:${this.portApi}/${this.pathApi}/${id}`);
}
// create one product
createProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.rootApi}:${this.portApi}/${this.pathApi}`, {product});
}
// patch one product
patchProduct(id: number, product: Product): Observable<Product> {
  return this.http.patch<Product>(`${this.rootApi}:${this.portApi}/${this.pathApi}/${id}`, {product});
}
// delete one product
deleteProduct(id: number): Observable<{response: string}> {
  return this.http.delete<{response: string}>(`${this.rootApi}:${this.portApi}/${this.pathApi}/${id}`);
}

}
