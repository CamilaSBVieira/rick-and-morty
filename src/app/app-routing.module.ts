import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharComponent } from './char/char.component';
import { CharsComponent } from './chars/chars.component';
import { LocationsComponent } from './locations/locations.component';
import { FavsComponent } from './favs/favs.component';
import { CardComponent } from './card/card.component';
import { LocationComponent } from './location/location.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeComponent } from './episode/episode.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'Rick and Morty | Home'
  },
  {
    path: 'char/:id',
    component: CharComponent,
    title: 'Char Details',
    children: [
      { path: 'origin', component: LocationCardComponent },
      { path: 'location', component: LocationCardComponent },
    ]
  },
  {
    path: 'chars',
    component: CharsComponent,
    title: 'All Characters',
  },
  {
    path: 'locations',
    component: LocationsComponent,
    title: 'All Locations',
  },
  {
    path: 'location/:id',
    component: LocationComponent,
    title: 'Location Details',
  },
  {
    path: 'episodes',
    component: EpisodesComponent,
    title: 'All Episodes',
  },
  {
    path: 'episode/:id',
    component: EpisodeComponent,
    title: 'Episdoe Details',
  },
  { 
    path: '',   
    redirectTo: 'home', 
    pathMatch: 'full' }
  // {
  //   path: 'favs',
  //   component: FavsComponent,
  //   title: 'Favorite Chars',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
