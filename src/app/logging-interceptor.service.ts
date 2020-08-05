import {HttpInterceptor, HttpRequest, HttpHandler, HttpEventType} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		console.log('Request Logging Started');
		console.log(req.url);
		return next.handle(req).pipe(tap(event => {
			if (event.type === HttpEventType.Response) {
				console.log('Response event');			
				console.log(event.status);			
				console.log(event.body);
				console.log('Exit from Response event');								
			}
			if (event.type === HttpEventType.Sent) {
				console.log('Sent event');			
				console.log(event);			
				console.log('Exit from Sent event');						
			}
		}));
	}
}