import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/location';
import { Observable } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Location[] = []
  numOfLocations!: number
  numOfPages!: number
  currentPage!: number

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.locationService.locationList$.subscribe(locations => this.locations = locations)
    this.locationService.numOfEpisodes$.subscribe(num => this.numOfLocations = num)
    this.locationService.numOfPages$.subscribe(num => this.numOfPages = num)
    this.locationService.currentPage$.subscribe(num => this.currentPage = num)
    this.router.navigate([], { queryParams: { page: this.currentPage } })
  }

  getNextPage(): void {
    this.locationService.getNextPageLocations()
  }

  getPrevPage(): void {
    this.locationService.getPrevPageLocations()
  }

  getPage(page: number): void {
    this.locationService.getPageLocations(page)
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
