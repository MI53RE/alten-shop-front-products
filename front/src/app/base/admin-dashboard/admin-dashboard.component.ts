import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/utils/product/product.model';
import { CrudItemOptions } from 'app/shared/utils/crud-item-options/crud-item-options.model';
import { ControlType } from 'app/shared/utils/crud-item-options/control-type.model';
import { ProductService } from 'app/shared/utils/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  
  private subs: Subscription[] = []

  protected products: Product[] = [];
  protected tableConfig: CrudItemOptions[] = [];

  private columns: {key: string, type: string}[] = [
    {key: 'id', type: 'number'},
    {key: 'code', type: 'text'},
    {key: 'name', type: 'text'},
    {key: 'description', type: 'text'},
    {key: 'price', type: 'number'},
    {key: 'quantity', type: 'number'},
    {key: 'inventoryStatus', type: 'text'},
    {key: 'category', type: 'text'},
    {key: 'image', type: 'text'},
    {key: 'rating', type: 'number'}
  ]

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    //data mockup
    // Table's columns init
    this.tableConfig = this.columns.map(column => {
      return {
        key: column.key,
        label: column.key,
        controlType: ControlType.INPUT,
        type: column.type,
        // By default, only 'code' and 'name' column are displayed.
        columnOptions: {filterable: true, sortable: true, default: ['code', 'name'].includes(column.key)} 
      }
    });
    this.subs.push(this.productService.getAllProducts().subscribe({
      next : (products) => {
          this.products = products
      },
      error: (err) => {
        console.error(err);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.map(sub => {
      sub.unsubscribe();
    })
  }

  // Used to transmit entity Product to child component
  get ProductType(): typeof Product {
    return Product;
  }

  create(product) {
      this.subs.push(this.productService.createProduct(product).subscribe({
        next: (product) => {
          this.products.push(product);
        },
        error: (err) => console.error(err)
      }));
  }
  delete(ids: number[]) {
    ids.map(id => {
      this.subs.push(this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => console.error(err)
      }));
    });
  }

}
