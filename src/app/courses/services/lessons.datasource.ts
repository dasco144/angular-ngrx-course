import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { Lesson } from '../model/lesson';
import { CoursesService } from './courses.service';
import { AppState } from '../../reducers';
import { LessonsPageRequested, PageQuery } from '../course.actions';
import { selectLessonsPage } from '../course.selectors';

export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private end = new Subject<any>();

    constructor(private store: Store<AppState>) {

    }

    loadLessons(courseId: number, page: PageQuery) {
        this.store
            .pipe(
                select(selectLessonsPage(courseId, page)),
                tap(lessons => {
                    if (lessons.length > 0) {
                        this.lessonsSubject.next(lessons);
                        this.end.next();
                    } else {
                        this.store.dispatch(new LessonsPageRequested({ courseId, page }));
                    }
                }),
                takeUntil(this.end),
                catchError(err => of([]))
            )
            .subscribe();
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
    }

}

