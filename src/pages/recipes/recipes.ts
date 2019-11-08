import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth';
import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[]
  constructor(private navCtrl: NavController,
    private recipeServ: RecipesService,
    private authServ: AuthService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController
  ) { }
  ionViewWillEnter() {
    this.recipes = this.recipeServ.getRecipe()
  }


  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' })
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index })
  }

  onShowOptions(event) {
    const loading = this.loadCtrl.create({
      content: 'Please Wait',
    })
    const popover = this.popoverCtrl.create(DatabaseOptionsPage)
    popover.present({ ev: event })
    popover.onDidDismiss(data => {
      if (!data) {
        return
      }
      if (data.action === 'load') {
        loading.present()
        this.authServ.getActiveUser().getIdToken()
          .then((token: string) => {
            this.recipeServ.fetchList(token).subscribe((recipe: Recipe[]) => {
              loading.dismiss()
              if (recipe) {
                this.recipes = recipe;
              } else {
                this.recipes = []
              }
            }, error => {
              loading.dismiss()
              this.handleError(error.message)
            })
          })
          .catch(error => {
            this.handleError(error.message)
          })

      } else if (data.action === 'store') {
        loading.present()
        this.authServ.getActiveUser().getIdToken()
          .then((token: string) => {
            // console.log(token)
            // let payload = token.split('.')[1]
            // payload = JSON.parse(window.atob(payload))
            // console.log(payload)
            this.recipeServ.storeList(token).subscribe((data) => {
              loading.dismiss()
            }, error => {
              loading.dismiss()
              this.handleError(error.message)
            })
          })
          .catch(error => {
            loading.dismiss()
            this.handleError(error.message)
          })
      }
    })
  }

  private handleError(error: string) {
    const alert = this.alertCtrl.create({
      title: 'An Error Occured',
      message: error,
      buttons: ['OK']
    })
    alert.present()
  }
}
