import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map , catchError, tap} from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient){}

  createAndStorePosts(title: string, content: string) {
  	const postData: Post = {title: title, content: content};
    this.http.post(
      'https://angular-test-backend-1f2b5.firebaseio.com/posts.json',
      postData,
      {
     	 observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
    	this.error.next(error.message);
    });
  }

  fetchPosts() {
  	// return an Observable
  	//let searchParams = new HttpHeaders();
  	//searchParams = searchParams.append('print', 'pretty');
  	//searchParams = searchParams.append('custom', 'value');
    return this.http.get<{ [key: string]: Post }>(
    	'https://angular-test-backend-1f2b5.firebaseio.com/posts.json',
    {
    	headers: new HttpHeaders({'Custom': 'Hello'}),
    	params: new HttpParams().set('print', 'pretty')
    	//params: searchParams
    })
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key], id: key});
        }
      }
      return postsArray;
    }),
      catchError(errorRes => {
      	return throwError(errorRes);
      })
    );
  }

  deletePosts() {
	return this.http.delete('https://angular-test-backend-1f2b5.firebaseio.com/posts.json',
		{
			observe: 'events',
			responseType: 'text'
		})
	.pipe(tap(event => {
		console.log(event);
	}));
  }
}
