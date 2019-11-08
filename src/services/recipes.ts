import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = []
    BASEURL = `https://ionic2-recipebook-9c0f8.firebaseio.com/`

    constructor(private http: Http,
        private authServ: AuthService) {

    }

    addRecipe(title: string, description: string, difficulty: string, ingredient: Ingredient[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredient))
        console.log(this.recipes)
    }

    getRecipe() {
        return this.recipes.slice()
    }

    updateRecipe(index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredient: Ingredient[]
    ) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredient)
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1)
    }

    storeList(token: string) {
        const userId = this.authServ.getActiveUser().uid
        return this.http
            .put(`${this.BASEURL}${userId}/recipes.json?auth=${token}`, this.recipes)
            .map((response: Response) => {
                return response.json()
            })
    }

    fetchList(token: string) {
        const userId = this.authServ.getActiveUser().uid
        return this.http
            .get(`${this.BASEURL}${userId}/recipes.json?auth=${token}`)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : []
                for (const item of recipes) {
                    if (!item.ingredient) {
                        item.ingredient = []
                    }
                }
                return response.json()
            })
            .do((recipes: Recipe[]) => {
                if (recipes) {
                    this.recipes = recipes
                } else {
                    this.recipes = []
                }
            })
    }
}