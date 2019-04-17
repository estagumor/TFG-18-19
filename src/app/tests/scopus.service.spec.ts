// import { defer } from 'rxjs';

// import { ScopusService } from '../services/scopus.service';

// function asyncData<T>(data: T) {
//   return defer(() => Promise.resolve(data));
// }

// describe("Scopus's service", () => {
//   // Set the http methods where Jasmine is going to intercept the requests
//   let httpClientSpy: { get: jasmine.Spy };
//   let scopusService: ScopusService;

//   beforeEach(() => {
//     // Instance the spied class and set the http methods to be spied
//     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//     scopusService = new ScopusService(<any>httpClientSpy);
//   });

//   it('must several publications', () => {
    
    

//     // The httpClientSpy will return the previous project on a 'GET' request
//     var test = httpClientSpy.get.and.returnValue(asyncData(null));
//     // Just test if it does one call because its an external API and we can't mock the returned data
//     scopusService.getPubs().subscribe(
      
//     );
//     // Expect that the httpClientSpy has received just one request
//     expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
//   });


// });

// // Given an object return a Promise
// export function asyncError<T>(errorObject: any) {
//   return defer(() => Promise.reject(errorObject));
// }