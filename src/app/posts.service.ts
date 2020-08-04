import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map , catchError} from 'rxjs/operators'
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
      postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
    	this.error.next(error.message);
    });
  }

  fetchPosts() {
  	// return an Observable
    return this.http.get<{ [key: string]: Post }>('https://angular-test-backend-1f2b5.firebaseio.com/posts.json',
    {
    	headers: new HttpHeaders({
    		'Custom': 'Hello'
    	})
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
	return this.http.delete('https://angular-test-backend-1f2b5.firebaseio.com/posts.json');
  }
}
