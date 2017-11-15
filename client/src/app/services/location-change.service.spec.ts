import { TestBed, async, inject } from '@angular/core/testing';
import {
HttpModule,
Http,
Response,
ResponseOptions,
XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocationChangeService } from './location-change.service';
describe('LocationChangeService', () => {

beforeEach(() => {

 TestBed.configureTestingModule({
    imports: [HttpModule],
    providers: [
      LocationChangeService,
      { provide: XHRBackend, useClass: MockBackend },
    ]
  });
});

describe('getLocationChange()', () => {

   it('can instantiate service when inject service',
   inject([LocationChangeService], (service: LocationChangeService) => {
     expect(service instanceof LocationChangeService).toBe(true);
 }));

    it('can provide the mockBackend as XHRBackend',
   inject([XHRBackend], (backend: MockBackend) => {
     expect(backend).not.toBeNull('backend should be provided');
 }));


 it('should return an Observable<Array>',
      inject([LocationChangeService, XHRBackend], (locationService, mockBackend) => {

     const mockResponse =
     
          { empid: "50042930",empname:"prashant" };    
     

     mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

     locationService.getLocationChange().subscribe((user) => {
        expect(user.empid).toEqual('50042930');
        expect(user.empname).toEqual('prashant');
     
      });

 }));

  it('should return an Observable of data on post',
      inject([LocationChangeService, XHRBackend], (locationService, mockBackend) => {

     const mockResponse =
     
          { empid: "50042930",empname:"prashant" };    
     

     mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

     locationService.locationChangeMethod().subscribe((user) => {
        expect(user.empid).toEqual('50042930');
        expect(user.empname).toEqual('prashant');
     
      });

 }));

});
});