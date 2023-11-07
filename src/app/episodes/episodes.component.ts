import { Component, OnInit } from '@angular/core';
import { Episode } from '../interfaces/episode';
import { EpisodeService } from '../services/episode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {

  episodes: Episode[] = []
  numOfEpisodes!: number
  numOfPages!: number
  currentPage!: number

  constructor(
    private episodeService: EpisodeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.episodeService.episodeList$.subscribe(episodes => this.episodes = episodes)
    this.episodeService.numOfEpisodes$.subscribe(num => this.numOfEpisodes = num)
    this.episodeService.numOfPages$.subscribe(num => this.numOfPages = num)
    this.episodeService.currentPage$.subscribe(num => this.currentPage = num)
    this.router.navigate([], { queryParams: { page: this.currentPage }})
  }

  getNextPage(): void {
    this.episodeService.getNextPageEpisodes()
  }

  getPrevPage(): void {
    this.episodeService.getPrevPageEpisodes()
  }

  getPage(page: number): void {
    this.episodeService.getPageEpisodes(page)
  }

  scrollPageToTop() {
    window.scroll({ top: 0, behavior: 'smooth'})
  }

  handlePrevPageClick() {
    this.getPrevPage()
    this.scrollPageToTop()
  }

  handleNexPageClick() {
    this.getNextPage()
    this.scrollPageToTop()
  }

  handleChangePage(page: number) {
    this.getPage(page)
    this.scrollPageToTop()
  }

}
