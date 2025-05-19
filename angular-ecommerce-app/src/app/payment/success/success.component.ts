import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ChevronRight, LucideAngularModule } from "lucide-angular";
import { CartActions } from "../../lib/features/cart/cart.actions";
import { Store } from "@ngrx/store";

@Component({
    selector: 'success-payment',
    imports: [RouterLink, LucideAngularModule],
    templateUrl: './success.component.html',
    styleUrl: './success.component.scss',
})
export class SuccessPaymentComponent {
    readonly ChevronRight = ChevronRight;

    constructor(private store: Store) { }

    ngOnInit() {
        this.store.dispatch(CartActions.resetCart());
    }
}