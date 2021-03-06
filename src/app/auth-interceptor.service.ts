import {HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { tap } from 'rxjs/operators'

export class AuthInterceptorService implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const modifiedRequest = req.clone(
			{
				headers: req.headers.append('Auth', 'xyz')
			});
		console.log(modifiedRequest);
		return next.handle(modifiedRequest);
	}
}