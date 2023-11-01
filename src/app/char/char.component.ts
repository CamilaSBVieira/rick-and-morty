import { Component, inject, Input, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '../services/characters.service';
import { EpisodeService } from '../services/episode.service';
import { Episode } from '../interfaces/episode';

@Component({
  selector: 'app-char',
  templateUrl: './char.component.html',
  styleUrls: ['./char.component.css']
})
export class CharComponent implements OnInit {

  @Input() char?: Character

  showEpisodes = false

  episodes?: Episode[]

  constructor(
    private charService: CharactersService,
    private episodeService: EpisodeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (history.state.name) {
      this.char = history.state
      return
    }
    this.getCharById()
  }

  getCharById() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.charService.getCharacterById(id)
      .subscribe(char => this.char = char)
  }

  handleShowEpisodes() {
    this.showEpisodes = !this.showEpisodes
    if (this.showEpisodes) {
      this.episodeService.getEpisodesByIds(this.char!.episode)
        .subscribe((value: Episode[]) => this.episodes = value)
    }
  }

}
