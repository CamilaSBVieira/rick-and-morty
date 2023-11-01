import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs'
import { Character } from '../interfaces/character';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  url = 'https://rickandmortyapi.com/api/character'

  private charactersSubject: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([])
  characterList$ = this.charactersSubject.asObservable()
  private numOfCharsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfChars$ = this.numOfCharsSubject.asObservable()
  private numOfPagesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfPages$ = this.numOfPagesSubject.asObservable()
  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  currentPage$ = this.currentPageSubject.asObservable()

  prevUrl: string | null = null
  currentURL: string = 'https://rickandmortyapi.com/api/character'
  nextUrl: string | null = null

  constructor(private http: HttpClient) {
    this.getAllCharacters()
  }

  getTopCharacters(): Observable<Character[]> {
    const url = `${this.url}/1,2,3,4,73`
    return this.http.get<Character[]>(url)
  }

  async getAllCharacters(): Promise<void> {
    this.http.get<{ info: { count: number, pages: number, prev: string, next: string }, results: Character[] }>(this.currentURL)
      .subscribe(value => {
        this.charactersSubject.next(value.results)
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.numOfPagesSubject.next(value.info.pages)
        this.numOfCharsSubject.next(value.info.count)
      })

  }

  async getNextPageCharacters(): Promise<void> {
    this.nextUrl && this.http.get<{ info: { prev: string, next: string }, results: Character[] }>(this.nextUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value + 1)
        this.charactersSubject.next(value.results)
      })
  }

  async getPrevPageCharacters(): Promise<void> {
    this.prevUrl && this.http.get<{ info: { prev: string, next: string }, results: Character[] }>(this.prevUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value - 1)
        this.charactersSubject.next(value.results)
      }
      )
  }

  async getPageCharacters(page: number): Promise<void> {
    const url = `${this.url}?page=${page}`
    this.http.get<{ info: { prev: string, next: string }, results: Character[] }>(url)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(page)
        this.charactersSubject.next(value.results)
      })
  } 

  getManyCharacters(characters: string[]): Observable<Character[]> {
    if (characters.length == 1) {

      const url = characters[0]

      return this.http.get<Character>(url)
        .pipe(
          map((value: Character) => [value]
          )
        )
    }

    let idsArray: string[] = []

    for (let char of characters) {
      const id = new URL(char).pathname.split('/')[3]
      idsArray.push(id)
    }

    const urlEndpoint = idsArray.toString()

    return this.http.get<Character[]>(`${this.url}/${urlEndpoint}`)
  }

  getCharacterById(id: number): Observable<Character> {
    const url = `${this.url}/${id}`
    return this.http.get<Character>(url)
  }

}
