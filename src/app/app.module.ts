import { DatabaseOptionsPage } from './../pages/database-options/database-options';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { RecipesService } from './../services/recipes';
import { TabsPage } from './../pages/tabs/tabs';
import { ShopingListPage } from './../pages/shoping-list/shoping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ShoppingListService } from '../services/shopping-list';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShopingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShopingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule { }
