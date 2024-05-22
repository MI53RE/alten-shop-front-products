import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'app/shared/utils/product/product.model';
import { ProductService } from 'app/shared/utils/product/product.service';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.scss']
})
export class PublicDashboardComponent implements OnInit {
  private subs: Subscription[] = []

  protected products: Product[] = [];

  protected sortOptions: SelectItem[] = [
    {
      label: 'name',
      value: '1-name'
    },
    {
      label: 'price',
      value: '2-price'
    },
    {
      label: 'rating',
      value: '3-rating'
    }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
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

}
