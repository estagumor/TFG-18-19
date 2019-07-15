import { PersonService } from '../../services/person.service';
import { defer } from 'rxjs';
import { Person } from 'src/app/models/person';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

// Given an object return a Promise
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

describe('PersonService', () => {
    // Set the http methods where Jasmine is going to intercept the requests
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy, put: jasmine.Spy };
    let personService: PersonService;

    beforeEach(() => {
        // Instance the spied class and set the http methods to be spied
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
        personService = new PersonService(<any>httpClientSpy);
    });

    it('must return a new person', () => {
        var data = {
            "name": [], "surname": [], "email": [], "photo": "", "telf": "", "allowed": [], "job": "",
            "office": "", "scopusId": "", "professionalStatus": "", "urls": "", "active": null, "_id": "", "__v": 0
        }

        let per = new Person("Test", "Test", "", "", "", true, "HIRED", "", "", "NONE", "", true)

        var test = httpClientSpy.post.and.returnValue(asyncData(data));

        personService.create(per).subscribe(res => {
            expect(res).toEqual(data, 'expected data')
            expect(test).toHaveBeenCalled()
        }, fail)
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

    it('must return the given person', () => {
        let per = new Person("Test", "Test", "", "", "", true, "HIRED", "", "", "NONE", "", true)

        var test = httpClientSpy.get.and.returnValue(asyncData(per));

        personService.getPerson("").subscribe(res => {
            expect(res).toEqual(per, 'expected data')
            expect(test).toHaveBeenCalled()
        }, fail);
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return all the persons', () => {
        var data = [{
            "name": [], "surname": [], "email": [], "photo": "", "telf": "", "allowed": [], "job": "",
            "office": "", "scopusId": "", "professionalStatus": "", "urls": "", "active": null, "_id": "", "__v": 0
        }, {
            "name": [], "surname": [], "email": [], "photo": "", "telf": "", "allowed": [], "job": "",
            "office": "", "scopusId": "", "professionalStatus": "", "urls": "", "active": null, "_id": "", "__v": 0
        }]

        var test = httpClientSpy.get.and.returnValue(asyncData(data));

        personService.getAll().subscribe(res => {
            expect(res).toEqual(data, 'expected data');
            expect(test).toHaveBeenCalled();
        }, fail)
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must update the given person', () => {
        let per = new Person("Test", "Test", "", "", "", true, "HIRED", "", "", "NONE", "", true)

        var test = httpClientSpy.put.and.returnValue(asyncData(per));
        var updated = per
        updated.name = "Me llamo Ralph"

        personService.updatePerson(updated).subscribe(res => {
            expect(res.name).toEqual('Me llamo Ralph', 'expected data')
            expect(test).toHaveBeenCalled()
        }, fail);
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('must delete the given person', () => {
        var data = {
            "name": [], "surname": [], "email": [], "photo": "", "telf": "", "allowed": [], "job": "",
            "office": "", "scopusId": "", "professionalStatus": "", "urls": "", "active": null, "_id": "", "__v": 0
        }

        var test = httpClientSpy.delete.and.returnValue(asyncData(data));

        personService.deletePerson("").subscribe(res => {
            expect(res).toEqual(data, 'expected data')
            expect(test).toHaveBeenCalled()
        }, fail)
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    });
});
