import { Recipe } from './../../models/recipe';
import { RecipesService } from './../../services/recipes';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {
  mode = 'New'
  selectOptions = ['Easy', 'Medium', 'Hard']
  recipeForm: FormGroup
  recipe: Recipe
  index: number
  constructor(private navCtrl: NavController, private recipeServ: RecipesService, private toastCtrl: ToastController, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private navParams: NavParams) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode')
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe')
      this.index = this.navParams.get('index')
    }
    this.initForm()
  }

  private initForm() {
    let title = null
    let description = null
    let difficulty = 'Medium'
    let ingredients = []
    if (this.mode === "Edit") {
      title = this.recipe.title
      description = this.recipe.description
      difficulty = this.recipe.difficulty
      for (const ingredient of this.recipe.ingredient) {
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }


  onSubmit() {
    const value = this.recipeForm.value
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return { name: name, amount: 1 }
      })
    }

    if (this.mode == 'Edit') {
      this.recipeServ.updateRecipe(this.index, value.title,
        value.description,
        value.difficulty,
        ingredients)
    } else {
      this.recipeServ.addRecipe(value.title,
        value.description,
        value.difficulty,
        ingredients
      )
    }


    this.recipeForm.reset()
    this.navCtrl.popToRoot()
  }

  onManageIngedients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngedientAlert().present()
          }
        },
        {
          text: 'Remove All Ingredient',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients')
            const len = fArray.length
            for (let i = len - 1; i >= 0; i--) {
              fArray.removeAt(i)
            }
            const toast = this.toastCtrl.create({
              message: 'All Ingredients Were Deleted',
              duration: 2000,
              position: 'bottom'
            })
            toast.present()

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    })

    actionSheet.present()
  }

  private createNewIngedientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() === '' || data.name === null) {
              const toast = this.toastCtrl.create({
                message: 'Please Enter Vaild Value',
                duration: 2000,
                position: 'top'
              })
              toast.present()
              return
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
            const toast = this.toastCtrl.create({
              message: 'Item Added',
              duration: 2000,
              position: 'bottom'
            })
            toast.present()
          }
        }
      ]
    })
  }
}
