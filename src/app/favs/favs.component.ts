import { Component } from '@angular/core';
import { Character } from '../interfaces/character';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent {

  chars!: Character[]

  constructor(private charService: CharactersService) {}

  
}
