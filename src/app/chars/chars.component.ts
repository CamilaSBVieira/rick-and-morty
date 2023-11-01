import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { CharactersService } from '../services/characters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css']
})
export class CharsComponent implements OnInit {

  chars: Character[] = []
  numOfChars!: number
  numOfPages!: number
  currentPage!: number

  constructor(
    private charService: CharactersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.charService.characterList$.subscribe(chars => this.chars = chars)
    this.charService.numOfChars$.subscribe(num => this.numOfChars = num)
    this.charService.numOfPages$.subscribe(num => this.numOfPages = num)
    this.charService.currentPage$.subscribe(num => this.currentPage = num)
    this.router.navigate([], { queryParams: { page: this.currentPage } })
  }

  getNextPage(): void {
    this.charService.getNextPageCharacters()
  }

  getPrevPage(): void {
    this.charService.getPrevPageCharacters()
  }

  getPage(page: number): void {
    this.charService.getPageCharacters(page)
  }

  scrollPageToTop() {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  handleNexPageClick() {
    this.getNextPage()
    this.scrollPageToTop()
  }

  handlePrevPageClick() {
    this.getPrevPage()
    this.scrollPageToTop()
  }

  handleChangePage(page: number) {
    this.getPage(page)
    this.scrollPageToTop()
  }
}
