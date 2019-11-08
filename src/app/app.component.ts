import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  tabsPage = TabsPage
  signinPage = SigninPage
  signupPage = SignupPage
  isAuthenticated = false

  @ViewChild('nav') nav: NavController

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authServ: AuthService
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyBfMOfjIM3Z5xGYRDWtLNKg6XNUoAWrrdk",
      authDomain: "ionic2-recipebook-9c0f8.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true
        this.nav.setRoot(this.tabsPage)
      }
      else {
        this.isAuthenticated = false
        this.nav.setRoot(this.signinPage)
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page)
    this.menuCtrl.close()
  }

  onLogout() {
    this.authServ.logout()
    this.menuCtrl.close()
  }
}

