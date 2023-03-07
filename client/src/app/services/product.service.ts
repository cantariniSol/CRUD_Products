import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL: string = 'http://localhost:3000/product';

  constructor(private http: HttpClient) { }

  // ___________LISTAR PRODUCTOS ______________
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}`);
  }

  // ___________OBTENER PRODUCTOS ______________
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }

  // _____________CREAR PRODUCTO ________________
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/create`, product);
  }

  // _____________ELIMINAR PRODUCTO ________________
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.BASE_URL}/delete/${id}`);
  }

  // _____________EDITAR PRODUCTO ________________
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.BASE_URL}/update/${id}`, product);
  }
}
