import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../interfaces/location';
import { LocationService } from '../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() id = ''

  location!: Location

  residents!: Character[]

  areThereResidents: boolean = true

  constructor(
    private locationService: LocationService,
    private characterService: CharactersService
  ) { }

  ngOnInit(): void {
    if (history.state.name) {
      this.location = history.state
      this.getResidents(this.location.residents)
    } else {
      this.getLocation()
    }
  }

  getLocation() {
    this.locationService.getLocationById(this.id)
      .subscribe(value => {
        this.getResidents(value.residents)
        this.location = value
      })
  }

  getResidents(residents: string[]) {
    this.characterService.getManyCharacters(residents)
      .subscribe(value => {
        if (value.length > 0) {
          this.residents = value
        }
      })
  }

}
