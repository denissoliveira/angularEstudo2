import { Injectable } from '@angular/core';
import { ShoppingcartService } from '../restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from '../restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Observable } from 'rxjs/Observable';
import { Order } from './order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MEAT_API } from 'app/app.api';
import { LoginService } from 'app/security/login/login.service';

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingcartService,
        private http: HttpClient,
        private loginService: LoginService) {}

    itemsValue(): number {
        return this.cartService.total()
      }

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem) {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.cartService.decreaseQty(item)
    }

    removeItem(item: CartItem) {
        this.cartService.removeItem(item)
    }

    clear() {
        this.cartService.clear();
    }

    checkOrder(order: Order): Observable<string> {
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()) {
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`);
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            .map(order2 => order2.id);
    }
}