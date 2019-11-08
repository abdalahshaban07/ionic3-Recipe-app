import { RecipesPage } from './../recipes/recipes';
import { ShopingListPage } from './../shoping-list/shoping-list';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  slPage = ShopingListPage
  recipePage = RecipesPage

}
