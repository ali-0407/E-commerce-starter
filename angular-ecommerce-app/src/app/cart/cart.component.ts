import { Component, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { CartActions } from "../lib/features/cart/cart.actions";
import { selectCart } from "../lib/features/cart/cart.selectors";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartProductList } from "./cart-product-list/cart-product-list.component";
import { CartState } from "../lib/features/cart/cart.reducer";
import { CurrencyPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { LucideAngularModule, ChevronRight } from "lucide-angular";

@Component({
    selector: 'cart',
    imports: [RouterLink, RouterLinkActive, CartProductList, CurrencyPipe, LucideAngularModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    readonly ChevronRight = ChevronRight;
    data = signal<CartState>({
        items: [],
        totalQuantities: 0,
        totalAmount: 0
    });
    isLoading: boolean = false;

    constructor(private store: Store, private http: HttpClient) {
        this.store.select(selectCart).subscribe(state => this.data.set(state))
    }

    resetCart() {
        this.store.dispatch(CartActions.resetCart());
    }

    async checkout() {
        this.isLoading = true;

        this.http.post<{ url: string }>(`${environment.serverUrl ?? 'https://angular-ecommerce-omega.vercel.app'}/api/payment/create-checkout-session`, {
            items: this.data().items.map(item => ({
                name: item.title,
                description: item.description,
                images: [item.image],
                price: item.price,
                quantity: item.quantity
            }))
        }).subscribe(async (session) => {
            window.location.href = session.url
        })
    }
}
