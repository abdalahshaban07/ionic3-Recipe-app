import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authServ: AuthService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  onSignup(form: NgForm) {
    const loading = this.loadCtrl.create({
      content: 'Signing You Up ...',
    })
    loading.present()
    this.authServ.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss()
      })
      .catch(error => {
        loading.dismiss()
        const alert = this.alertCtrl.create({
          title: 'Signup Failed',
          message: error.message,
          buttons: ['Ok']
        })
        alert.present()
      })
  }

}
