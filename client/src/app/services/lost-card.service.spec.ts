import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { LostCardService } from './lost-card.service';

const makeHeroData = () => [
  { comments: 'engnnfenn', date: '19/02/17' },
  { comments: 'missing', date: '29/03/17' },
  { comments: 'forget', date: '09/05/17' },
]
describe('save and get method', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],

      providers: [LostCardService, { provide: XHRBackend, useClass: MockBackend }]

    });
  });

  it('test getLostCard method',
    inject([LostCardService, XHRBackend], (LostCardService, mockBackend) => {

      const mockResponse = [{ comments: 'ffff', date: '19/02/17' },
        { comments: 'missing', date: '29/03/17' },
        { comments: 'forget', date: '09/05/17' },

      ];

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      LostCardService.getLostCard().subscribe((building) => {
        console.log(building[0]);
        expect(building[1].comments).toEqual('missing');

      });
    }));

  it('test add comments and date',
    inject([LostCardService, XHRBackend], (LostCardService, mockBackend) => {



      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
        connection.mockRespond(new ResponseOptions({ status: 200 }));
      });
      let mock = { comments: 'engnnfenn', date: '19/02/17' }

      LostCardService.save(mock).subscribe((successResult) => {
        console.log(successResult.status)

        expect(successResult.status).toBe(200);

      });

    }));
});
