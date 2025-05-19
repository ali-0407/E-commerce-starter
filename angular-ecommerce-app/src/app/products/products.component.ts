import { Component, signal } from "@angular/core";
import { ProductList } from "./product-list/product-list.component";
import { ProductsService } from "./products.service";
import { ProductsSkeletonComponent } from "./shared/products-skeleton/products-skeleton.component";
import { Product } from "../shared/models/product.model";
import { RouterLink } from "@angular/router";
import { LucideAngularModule, ShoppingBag } from "lucide-angular";
import { selectCart } from "../lib/features/cart/cart.selectors";
import { Store } from "@ngrx/store";

@Component({
    selector: 'products',
    imports: [ProductList, ProductsSkeletonComponent, RouterLink, LucideAngularModule],
    providers: [ProductsService],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
})
export class ProductsComponent {
    readonly ShoppingBag = ShoppingBag;
    data = signal<Product[] | []>([]);
    isLoading = signal<boolean>(true);
    cartToastShow: boolean = false;
    timer: ReturnType<typeof setTimeout> | null = null

    constructor(private productsService: ProductsService, private store: Store) { }

    ngOnInit() {
        this.productsService.getProducts().subscribe(buffer => { this.data.set(buffer), this.isLoading.set(false) });
        this.store.select(selectCart).subscribe(state => {
            if (this.cartToastShow) return;

            this.timer = setTimeout(() => {
                this.cartToastShow = state.totalQuantities > 0 ? true : false;
            });

            this.timer = setTimeout(() => {
                this.cartToastShow = false
            }, 5000)
        })
    }

    ngAfterViewInit() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.cartToastShow = false
        });
    }

    ngOnDestroy() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
}