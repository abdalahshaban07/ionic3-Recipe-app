import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs/Rx'



@Injectable()
export class ShoppingListService {
    BASEURL = `https://ionic2-recipebook-9c0f8.firebaseio.com/`

    private ingredients: Ingredient[] = []

    constructor(private http: Http,
        private authServ: AuthService
    ) { }

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount))
    }

    addItems(items: Ingredient[]) {
        this.ingredients.push(...items)
    }

    getIems() {
        return this.ingredients.slice()
    }

    removeItem(index: number) {
        this.ingredients.splice(index, 1)
    }

    storeList(token: string) {
        const userId = this.authServ.getActiveUser().uid
        return this.http
            .put(`${this.BASEURL}${userId}/shopping-list.json?auth=${token}`, this.ingredients)
            .map((response: Response) => {
                return response.json()
            })
    }

    fetchList(token: string) {
        const userId = this.authServ.getActiveUser().uid
        return this.http
            .get(`${this.BASEURL}${userId}/shopping-list.json?auth=${token}`)
            .map((respons: Response) => {
                return respons.json()
            })
            .do((ingredients: Ingredient[]) => {
                if (ingredients) {
                    this.ingredients = ingredients
                } else {
                    this.ingredients = []
                }
            })
    }
}