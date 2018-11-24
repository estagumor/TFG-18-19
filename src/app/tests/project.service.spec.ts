import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { ProjectService } from '../services/project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('GithubApiService', () => {
    // let injector: TetBed;
    // let service: ProjectService;
    // let httpMock: HttpTestingController;

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         imports: [HttpClientTestingModule],
    //         providers: [ProjectService]
    //     });

    //     injector = getTestBed();
    //     service = injector.get(ProjectService);
    //     httpMock = injector.get(HttpTestingController);
    // });

    // describe('#getUsers', () => {
    //     it('should return an Observable<User[]>', () => {
    //         console.log(service.getProjects().map(result => {console.log(result);}));
    //         ;
    //         var res: string = "";
    //         service.getProjects().toPromise().then(result => { res = result; expect(res.length).toBe(22); });
    //         console.log(res);
    //         res = service.getProjectsV2();
    //         console.log(res);

    //     });
    // });

    // it('should create the app', () => {
    //     const fixture = TestBed.createComponent(ProjectService);2
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app).toBeTruthy();
    // });

    // it(`should have as title 'TFG'`, () => {
    //     const fixture = TestBed.createComponent(ProjectService);
    //     const app = fixture.debugElement.componentInstance;
    //     expect(app.title).toEqual('TFG');
    // });

    // it('should render title in a h1 tag', () => {
    //     const fixture = TestBed.createComponent(ProjectService);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to TFG!');
    // });
});
