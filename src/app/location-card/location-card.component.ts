import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit {

  location!: Location

  constructor(
    private locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLocation()
  }

  getLocation() {
    let rt = this.activatedRoute.snapshot.routeConfig!.path!
    let loc
    loc = history.state[rt].url
    this.locationService.getLocationFromURL(loc)
      .subscribe(value => this.location = value)
  }
}
