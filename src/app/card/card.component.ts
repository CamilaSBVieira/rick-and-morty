import { Component, Input } from '@angular/core';
import { Character } from '../interfaces/character';
import { Location } from '../interfaces/location';
import { Episode } from '../interfaces/episode';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() char?: Character
  @Input() location?: Location
  @Input() episode?: Episode

}
