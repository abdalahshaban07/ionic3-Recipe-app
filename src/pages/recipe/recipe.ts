import { RecipesService } from './../../services/recipes';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../models/recipe';
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number
  constructor(private navCtrl: NavController, private navParams: NavParams, private shopServ: ShoppingListService, private recipServ: RecipesService) { }
  ngOnInit() {
    this.recipe = this.navParams.get('recipe')
    this.index = this.navParams.get('index')
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index })
  }
  onAddIngredients() {
    this.shopServ.addItems(this.recipe.ingredient)
  }
  onDeleteRecipe() {
    this.recipServ.removeRecipe(this.index)
    this.navCtrl.popToRoot()
  }
}
