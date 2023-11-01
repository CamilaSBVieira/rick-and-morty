import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  topChars: Character[] = []

  constructor(private charService: CharactersService) {}

  ngOnInit(): void {
    this.getTopChars()
  }

  getTopChars(): void {
    this.charService.getTopCharacters().subscribe(chars => this.topChars = chars)
  }

}
