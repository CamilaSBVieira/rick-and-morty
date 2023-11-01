import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  charPage?: number

  constructor(private charService: CharactersService) {}

  ngOnInit(): void {
    this.charService.currentPage$.subscribe(currentPage => this.charPage = currentPage)
  }
}
