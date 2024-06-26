import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

import { KilosPipe } from '../../pipes/kilos.pipe';
import { MetrosPipe } from '../../pipes/metros.pipe';

import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { TypeComponent } from '../type/type.component';

@Component({
  selector: 'app-pokemon-info',
  standalone: true,
  imports: [
    CommonModule,
    PokemonCardComponent,
    TypeComponent,
    KilosPipe,
    MetrosPipe,
  ],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.scss'
})
export class PokemonInfoComponent {
  @Input() pokemon?: Pokemon;
  @Input() opened: boolean = false;
  @Output() clicked = new EventEmitter();

  private _pokemonService = inject(PokemonService);

  public description: string = '';

  ngOnChanges(): void {
    if (this.pokemon)  {
      this._pokemonService.getDescription(this.pokemon?.id)
        .subscribe( resp => this.description = resp );
    }
  }
}
