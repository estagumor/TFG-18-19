import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { throwError } from 'rxjs';

export class HandleError {
// 200 -> OK, 201 -> Created, 400 -> Bad Request, 500 -> Internal Server Error, 503 -> Service Unavailable
    public static handleError(error: HttpResponse<any>) {
        // if (error.error instanceof ErrorEvent) {
        //   // A client-side or network error occurred. Handle it accordingly.
        //   console.error('An error occurred:', error);
        // } else {
        //   // The backend returned an unsuccessful response code.
        //   // The response body may contain clues as to what went wrong,
        //   console.error(
        //     `Backend returned code ${error.status}, ` +
        //     `body was: ${error}`);
        // }
        // return an observable with a user-facing error message
        let message
        if(error.status == 500)
            message = `Error en la inesperado en el servidor`
        else if(error.status == 503)
            message = `Error temporal en el servidor, vuelva a intentarlo mas tarde por favor`
        else if(error.status == 400)
            message = `Petición mal estructurada`
        else if(error.status == 201)
            message = `Objeto/s creados correctamente`
        // else if(error.status == 200)
        //     message = `Peticion correcta`
      };
}