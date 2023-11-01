import { Component, OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeService } from '../services/episode.service';
import { Episode } from '../interfaces/episode';
import { CharactersService } from '../services/characters.service';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  @Input() id = ''

  episode!: Episode

  characters!: Character[]

  constructor(
    private episodeService: EpisodeService,
    private characterService: CharactersService
  ) { }

  ngOnInit(): void {
    if (history.state.air_date) {
      this.episode = history.state
      this.getCharacters(this.episode.characters)
    } else {
      this.getEpisode()
    }
  }

  getEpisode() {
    this.episodeService.getEpisodeById(this.id)
      .subscribe(value => {
        this.getCharacters(value.characters)
        this.episode = value
      })
  }

  getCharacters(characters: string[]) {
    this.characterService.getManyCharacters(characters)
      .subscribe(value => this.characters = value)
  }

}
