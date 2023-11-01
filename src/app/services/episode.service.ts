import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from '../interfaces/episode';
import { BehaviorSubject, Observable, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  url = 'https://rickandmortyapi.com/api/episode'

  private episodesSubject: BehaviorSubject<Episode[]> = new BehaviorSubject<Episode[]>([])
  episodeList$ = this.episodesSubject.asObservable()
  private numOfEpisodesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfEpisodes$ = this.numOfEpisodesSubject.asObservable()
  private numOfPagesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  numOfPages$ = this.numOfPagesSubject.asObservable()
  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  currentPage$ = this.currentPageSubject.asObservable()

  prevUrl: string | null = null
  currentUrl: string = 'https://rickandmortyapi.com/api/episode'
  nextUrl: string | null = null

  constructor(private http: HttpClient) {
    this.getAllEpisodes()
  }

  async getAllEpisodes(): Promise<void> {
    this.http.get<{ info: { count: number, pages: number, prev: string, next: string}, results: Episode[] }>(this.url)
      .subscribe(value => {
        this.episodesSubject.next(value.results)
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.numOfPagesSubject.next(value.info.pages)
        this.numOfEpisodesSubject.next(value.info.count)
      })
  }

  async getNextPageEpisodes(): Promise<void> {
    this.nextUrl && this.http.get<{ info: { count: number, pages: number, prev: string, next: string}, results: Episode[] }>(this.nextUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value + 1)
        this.episodesSubject.next(value.results)
      })
  }

  async getPrevPageEpisodes(): Promise<void> {
    this.prevUrl && this.http.get<{ info: { count: number, pages: number, prev: string, next: string}, results: Episode[] }>(this.prevUrl)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(this.currentPageSubject.value - 1)
        this.episodesSubject.next(value.results)
      })
  }

  async getPageEpisodes(page: number): Promise<void> {
    const url = `${this.url}?page=${page}`
    this.http.get<{ info: { count: number, pages: number, prev: string, next: string}, results: Episode[] }>(url)
      .subscribe(value => {
        this.nextUrl = value.info.next
        this.prevUrl = value.info.prev
        this.currentPageSubject.next(page)
        this.episodesSubject.next(value.results)
      })
  }

  getEpisodeById(id: string): Observable<Episode> {
    return this.http.get<Episode>(`${this.url}/${id}`)
  }

  getEpisodesByIds(episodes: string[]): Observable<Episode[]> {

    if (episodes.length == 1) {

      const url = episodes[0]

      return this.http.get<Episode>(url)
        .pipe(
          map((value: Episode) => [value]
          )
        )
    }

    let idsArray: string[] = []

    for (let ep of episodes) {
      const id = new URL(ep).pathname.split('/')[3]
      idsArray.push(id)
    }

    const urlEndpoint = idsArray.toString()

    return this.http.get<Episode[]>(`${this.url}/${urlEndpoint}`)
  }
}
