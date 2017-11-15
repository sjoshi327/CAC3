import { TestBed, async, inject } from '@angular/core/testing';

import {HttpModule,Http,Response,ResponseOptions,XHRBackend} from '@angular/http';

import { MockBackend } from '@angular/http/testing';

import { ThirdPartyService } from './third-party.service';

describe('ThirdPartyService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({

      imports: [HttpModule],

      providers: [ThirdPartyService,

        { provide: XHRBackend, useClass: MockBackend },

      ]

    });

  });

 describe('getThird()', () => {

    it('Employee Name Should be equal',

        inject([ThirdPartyService, XHRBackend], (ThirdPartyService, mockBackend) => {

        const mockResponse = [

            { employeeID: 50042924, employeeName: 'Shubham' },

            { employeeID: 50042925, employeeName: 'Mano' }];

        mockBackend.connections.subscribe((connection) => {

          connection.mockRespond(new Response(new ResponseOptions({

            body: JSON.stringify(mockResponse)

          })));

        });

        ThirdPartyService.getThird().subscribe((employees) => {

          expect(employees.length).toBe(2);

          expect(employees[0].employeeName).toEqual('Shubham');

          expect(employees[1].employeeName).toEqual('Mano');

         });

    }));

     it('Employee Name Should not be equal',

        inject([ThirdPartyService, XHRBackend], (ThirdPartyService, mockBackend) => {

        const mockResponse = [

          

            { employeeID: 50042925, employeeName: 'Manoj' }];

        mockBackend.connections.subscribe((connection) => {

          connection.mockRespond(new Response(new ResponseOptions({

            body: JSON.stringify(mockResponse)

          })));

        });

        ThirdPartyService.getThird().subscribe((employees) => {

          expect(employees.length).toBe(1);

         

          expect(employees[0].employeeName).not.toEqual('Mano');

         });

    }));

   });

 describe('thirdpartyInsert()', () => {

it('test third party insert',

     inject([ThirdPartyService, XHRBackend], (employeeService, mockBackend) => {

 

     mockBackend.connections.subscribe((connection) => {

       

       connection.mockRespond(new ResponseOptions({status:200}));

     });

     const mock=[{employeeID : "50042950",

      employeeName: "SHIVAM  BAJPAI",

       dateOfJoining: "20060313",

        project: "SSB-ADM ",

         department: "SSB-CSDM-RP",

       prev:"Cso",

     current: "Closed"},      

     ];

     

     employeeService.thirdPartyInsert(mock).subscribe((successResult) => {

       console.log(successResult.status)

       expect(successResult.status).toBe(200);

   });

       

   }));

 })

});