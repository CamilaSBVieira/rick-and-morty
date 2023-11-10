import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { CharComponent } from './char/char.component';
import { CharsComponent } from './chars/chars.component';
import { LocationsComponent } from './locations/locations.component';
import { FavsComponent } from './favs/favs.component';
import { LocationComponent } from './location/location.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { EpisodesComponent } from './episodes/episodes.component';
import { EpisodeComponent } from './episode/episode.component';
import { FillArrayPipePipe } from './pipes/fill-array-pipe.pipe';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft as fasChevronLeft, faChevronRight as fasChevronRight, faBackwardStep as fasBackwardStep, faForwardStep as fasForwardStep } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    CardComponent,
    HomeComponent,
    CharComponent,
    CharsComponent,
    LocationsComponent,
    FavsComponent,
    LocationComponent,
    LocationCardComponent,
    EpisodesComponent,
    EpisodeComponent,
    FillArrayPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasChevronLeft, fasChevronRight, fasBackwardStep, fasForwardStep)
  }
}
