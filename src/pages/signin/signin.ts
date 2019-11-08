import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authServ: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }
  onSignin(form: NgForm) {

    const loading = this.loadingCtrl.create({
      content: 'Signin You In..'
    })
    loading.present()
    this.authServ.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data)
        loading.dismiss()
      })
      .catch(error => {
        loading.dismiss()
        const alert = this.alertCtrl.create({
          title: 'Signin Failed...',
          message: error.message,
          buttons: ['OK']
        })
        alert.present()
      })
  }

}
