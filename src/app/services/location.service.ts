import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../interfaces/location';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url = 'https://rickandmortyapi.com/api/location'

  private locationSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])
  locationList$ = this.locationSubject.asObservable()
  private numOfLocationsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfEpisodes$ = this.numOfLocationsSubject.asObservable()
  private numOfPagesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfPages$ = this.numOfPagesSubject.asObservable()
  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  currentPage$ = this.currentPageSubject.asObservable()

  prevUrl: string | null = null
  currentUrl: string = 'https://rickandmortyapi.com/api/location'
  nextUrl: string | null = null
  
  constructor( private http: HttpClient) {
    this.getAllLocations()
  }

  async getAllLocations(): Promise<void> {
    this.http.get<{ info: { count: number, pages: number, prev: string, next: string }, results: Location[] }>(this.currentUrl)
      .subscribe(value => {
        this.locationSubject.next(value.results)
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.numOfPagesSubject.next(value.info.pages)
        this.numOfLocationsSubject.next(value.info.count)
      }
    )
  }

  async getNextPageLocations(): Promise<void> {
    this.nextUrl && this.http.get<{ info: { prev: string, next: string }, results: Location[] }>(this.nextUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value + 1)
        this.locationSubject.next(value.results)
      })
  }

  async getPrevPageLocations(): Promise<void> {
    this.prevUrl && this.http.get<{ info: { prev: string, next: string }, results: Location[] }>(this.prevUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value - 1)
        this.locationSubject.next(value.results)
      }
      )
  }

  async getPageLocations(page: number): Promise<void> {
    const url = `${this.url}?page=${page}`
    this.http.get<{ info: { prev: string, next: string }, results: Location[] }>(url)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(page)
        this.locationSubject.next(value.results)
      })
  } 

  getLocationById(id: string) {
    const url = `${this.url}/${id}`
    return this.http.get<Location>(url)
  }

  getLocationFromURL(url: string) {
    return this.http.get<Location>(url)
  }

}
