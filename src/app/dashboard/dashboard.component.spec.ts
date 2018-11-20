import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

// https://jasmine.github.io/api/3.3/jasmine.html

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: HeroService, useValue: heroService }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Heroes');
  });

  it('should call heroService', async(() => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  }));

  it('should set heros', async(() => {
    expect(component.heroes).toEqual(HEROES.slice(1, 5));
  }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

  it('should getHero fail - set Hero', async(() => {
    const e = { error: { code: 'KeyConflict' }};
    getHeroesSpy = heroService.getHeroes.and.returnValue(
      throwError(e)
    );
    spyOn( component, "setError");
    component.getHeroes();
    expect(component.setError).toHaveBeenCalled();
    expect(heroService.getHeroes).toHaveBeenCalled();
  }));

  it('should getHero fail', async(() => {
    const e = { error: { code: 'KeyConflict' }};
    getHeroesSpy = heroService.getHeroes.and.returnValue(
      throwError(e)
    );
    component.getHeroes();
    expect(component.error).toBeTruthy();
  }));

});