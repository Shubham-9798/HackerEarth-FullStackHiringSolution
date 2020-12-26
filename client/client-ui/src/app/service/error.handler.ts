import { HttpErrorResponse  } from '@angular/common/http'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'


function handleError(error: HttpErrorResponse){
    console.log(error);
    return throwError(error);
}

export { handleError as HandleError }