import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, CardTitleComponent } from "../../shared/components/ui/card/card.component";
import { Product } from "../../shared/models/product.model";
import { CurrencyPipe, NgIf } from "@angular/common";
import { ImageLoaderComponent } from "../../shared/components/ui/image-loader/image-loader.component";
import { LucideAngularModule, Plus } from "lucide-angular";
import { Store } from "@ngrx/store";
import { CartActions } from "../../lib/features/cart/cart.actions";
import { selectCart } from "../../lib/features/cart/cart.selectors";

@Component({
    selector: 'app-product',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CardComponent, CardHeaderComponent, CardTitleComponent, CardBodyComponent, CardFooterComponent, CurrencyPipe, NgIf, ImageLoaderComponent, LucideAngularModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {
    @Input() data: Product | null = null;
    readonly Plus = Plus;

    constructor(private store: Store) { }

    addToCart(item: Product) {
        this.store.dispatch(CartActions.addItem(item));
    }
}