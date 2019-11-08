import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth';
import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
@Component({
  selector: 'page-shoping-list',
  templateUrl: 'shoping-list.html',
})
export class ShopingListPage {

  listItems: Ingredient[]

  constructor(private shopServ: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authServ: AuthService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }


  ionViewWillEnter() {
    this.loadItems()
  }

  onAddItem(form: NgForm) {
    this.shopServ.addItem(form.value.ingredientName, form.value.amount)
    form.reset()
    this.loadItems()
  }




  onCheckItem(index: number) {
    this.shopServ.removeItem(index)
    this.loadItems()
  }

  private loadItems() {
    this.listItems = this.shopServ.getIems()
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
            this.shopServ.fetchList(token).subscribe((list: Ingredient[]) => {
              loading.dismiss()
              if (list) {
                this.listItems = list;
              } else {
                this.listItems = []
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
            this.shopServ.storeList(token).subscribe((data) => {
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
