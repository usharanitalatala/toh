import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '../../node_modules/@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

// https://angular.io/api/common/http/testing/HttpTestingController
// https://angular.io/api/common/http/testing/TestRequest

describe('MessageService', () => {
  let httpMock: HttpTestingController
  let heroService: HeroService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService]
    });
    heroService = TestBed.get(HeroService);
    httpMock = TestBed.get(HttpTestingController);
  });
  //inject([HeroService, HttpTestingController], (heroService: HeroService, httpMock: HttpTestingController)

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should getHeroes success', ( done ) => {
    const hero = {
      id: 2,
      name: "test"
    }
    heroService.getHero(1).subscribe( (res : Hero ) => {
      expect(res).toEqual(hero);
      done();
    });

    const getHeros = httpMock.expectOne("api/heroes/1");
    getHeros.flush(hero);
    httpMock.verify();
  });

  it('should getHeroes fail', (done) => {
    const hero = {
      id: 2,
      name: "test"
    }
    heroService.getHero(1).subscribe( (res  ) => {
      done();
    }, error => {
      expect(error.status).toEqual(500);
    });

    const getHeros = httpMock.expectOne("api/heroes/1");
    getHeros.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
    httpMock.verify();
  });
});
