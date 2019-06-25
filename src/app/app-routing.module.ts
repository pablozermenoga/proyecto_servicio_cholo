import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'qr', loadChildren: './pages/qr/qr.module#QrPageModule' },
  { path: 'info', loadChildren: './pages/info/info.module#InfoPageModule' },
  { path: 'cct', loadChildren: './cct/cct.module#CctPageModule' },
  { path: 'acercade', loadChildren: './acercade/acercade.module#AcercadePageModule' },
  { path: 'autocomplete', loadChildren: './modal/autocomplete/autocomplete.module#AutocompletePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
