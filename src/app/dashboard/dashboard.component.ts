import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  error = false;
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    // setTimeout( () => this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes.slice(1, 5), error => {
    //     this.setError();
    //   }) , 25000);

      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5), error => {
        this.setError();
      });
  }

  getHeroesAsync(): void {
    // setTimeout( () => this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes.slice(1, 5), error => {
    //     this.setError();
    //   }) , 25000);

      this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5), error => {
        this.setError();
      });
  }
  setError(){
    this.error = true;
  }
}
