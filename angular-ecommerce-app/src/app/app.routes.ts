import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { SuccessPaymentComponent } from './payment/success/success.component';
import { CancelPaymentComponent } from './payment/cancel/cancel.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'payment/success',
        component: SuccessPaymentComponent
    },
    {
        path: 'payment/cancel',
        component: CancelPaymentComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
