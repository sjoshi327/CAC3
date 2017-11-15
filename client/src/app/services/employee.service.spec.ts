import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend,ResponseOptions,Response,RequestMethod } from '@angular/http';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { EmployeeService } from './employee.service';

const makeHeroData = () => [
  { comments: 'engnnfenn', date: '19/02/17' },
  { comments: 'missing', date: '29/03/17' },
  { comments: 'forget', date: '09/05/17' },
]
describe('save and get method', () => {

beforeEach(() => {
  TestBed.configureTestingModule({
      imports:[HttpModule],
     
    providers:[ EmployeeService,{ provide: XHRBackend, useClass: MockBackend }]

  });
});

  it('test getLostCard method',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

      const mockResponse =[{employeeID : "50042950", 
       employeeName: "SHIVAM  BAJPAI",
        dateOfJoining: "20060313",
         project: "SSB-ADM ",
          department: "SSB-CSDM-RP", 
        prev:"Cso", 
      current: "Closed"},      
      ];

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      employeeService.getEmpSql().subscribe((emp) => {
        console.log(emp[0],"helo");
        expect(emp[0].employeeID).toEqual("50042950");
        expect(emp[0].employeeName).toEqual("SHIVAM  BAJPAI");
        expect(emp[0].dateOfJoining).toEqual("20060313");
        expect(emp[0].department).toEqual("SSB-CSDM-RP");
       
      });
    }));

    it('Employee Name Should be equal',
       inject([EmployeeService, XHRBackend], (EmployeeService, mockBackend) => {

       const mockResponse = [
           { employeeID: 50042924, employeeName: 'Shubham' },
           { employeeID: 50042925, employeeName: 'Manoj' }];

       mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });

       EmployeeService.getEmployeeByID().subscribe((employees) => {
         expect(employees.length).toBe(2);
         expect(employees[0].employeeName).toEqual('Shubham');
         expect(employees[1].employeeName).toEqual('Manoj');
        });

   }));
    it('Employee Name Should not be equal',
       inject([EmployeeService, XHRBackend], (EmployeeService, mockBackend) => {

       const mockResponse = [
         
           { employeeID: 50042925, employeeName: 'Manoj' }];

       mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });

       EmployeeService.getEmployeeByID().subscribe((employees) => {
         expect(employees.length).toBe(1);
       
         expect(employees[0].employeeName).not.toEqual('Manojj');
        });

   }));
    it('Employee Name Should be updated',
       inject([EmployeeService, XHRBackend], (EmployeeService, mockBackend) => {

       const mockResponse = [
           { employeeID: 50042924, employeeName: 'Shubham' },
           { employeeID: 50042925, employeeName: 'Manoj' }];

       mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });

       EmployeeService.update().subscribe((employees) => {
         expect(employees[0].employeeID).toEqual(50042924);
         expect(employees[1].employeeID).toEqual(50042925);
        });

   }));
    it('Employee Name Should not be updated',
       inject([EmployeeService, XHRBackend], (EmployeeService, mockBackend) => {

       const mockResponse = [{ employeeID: 50042925, employeeName: 'Manoj' }];

         mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });
        EmployeeService.update().subscribe((employees) => {
        expect(employees[0].employeeID).not.toEqual(5004292);
        });


   }));


  it('test addBuilding',
      inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

  

      mockBackend.connections.subscribe((connection) => {
        expect(connection.request.method).toEqual(RequestMethod.Post);
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

      employeeService.save(mock).subscribe((successResult) => {
        console.log(successResult.status)
               
               expect(successResult.status).toBe(200);

    });
         
    }));
  it('Employee Name Should be equal',
       inject([EmployeeService, XHRBackend], (employeeService, mockBackend) => {

       const mockResponse = [
           { employeeID: 50042924, employeeName: 'Rohan' },
           { employeeID: 50042925, employeeName: 'Maya' }];

       mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });

       employeeService.getEmployee().subscribe((employees) => {
         expect(employees.length).toBe(2);
         expect(employees[0].employeeName).toEqual('Rohan');
         expect(employees[1].employeeName).toEqual('Maya');
        });

   }));
    it('Employee Name Should not be equal',
       inject([EmployeeService, XHRBackend], (EmployeeService, mockBackend) => {

       const mockResponse = [
         
           { employeeID: 50042925, employeeName:'Suman' }];

       mockBackend.connections.subscribe((connection) => {
         connection.mockRespond(new Response(new ResponseOptions({
           body: JSON.stringify(mockResponse)
         })));
       });

       EmployeeService.getEmployee().subscribe((employees) => {
         expect(employees.length).toBe(1);
       
         expect(employees[0].employeeName).not.toEqual('Sumann');
        });

   }));

});
