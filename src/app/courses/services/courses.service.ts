import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { COURSES, findCourseById, findLessonsForCourse } from '../../../../server/db-data';
import { saveCourse2 } from '../../../../server/save-course.route';
import { searchLessons2 } from '../../../../server/search-lessons.route';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable()
export class CoursesService {

    constructor(private http: HttpClient) {

    }

    findCourseById(courseId: number): Observable<Course> {
        // return this.http.get<Course>(`http://localhost:9000/api/courses/${courseId}`);
        const course = findCourseById(courseId) as Course;
        return of(course)
            .pipe(
                delay(500)
            );
    }

    findAllCourses(): Observable<Course[]> {
        // return this.http.get('http://localhost:9000/api/courses')
        //     .pipe(
        //         map(res => res['payload'])
        //     );
        return of(COURSES)
            .pipe(
                delay(500),
                map(res => {
                    const courses: Course[] = [];
                    Object.keys(res).forEach(key => {
                        const course = res[key] as Course;
                        courses.push(course);
                    });
                    return courses;
                })
            );
    }

    findAllCourseLessons(courseId: number): Observable<Lesson[]> {
        // return this.http.get('http://localhost:9000/api/lessons', {
        //     params: new HttpParams()
        //         .set('courseId', courseId.toString())
        //         .set('pageNumber', '0')
        //         .set('pageSize', '1000')
        // }).pipe(
        //     map(res => res['payload'])
        // );
        const lessons = findLessonsForCourse(courseId) as Lesson[];
        return of(lessons)
            .pipe(
                delay(500),
                map(res => res['payload'])
            );
    }

    findLessons(
        courseId: number,
        pageNumber = 0,
        pageSize = 3
    ): Observable<Lesson[]> {
        // return this.http.get('http://localhost:9000/api/lessons', {
        //     params: new HttpParams()
        //         .set('courseId', courseId.toString())
        //         .set('filter', '')
        //         .set('sortOrder', 'asc')
        //         .set('pageNumber', pageNumber.toString())
        //         .set('pageSize', pageSize.toString())
        // }).pipe(
        //     map(res => res['payload'])
        // );
        const lessons = searchLessons2(
            courseId.toString(),
            '',
            'asc',
            pageNumber.toString(),
            pageSize.toString()
        );
        return of(lessons).pipe(
            delay(500),
            map(res => {
                const lessonArr: Lesson[] = [];
                Object.keys(res).forEach(key => {
                    const lesson = res[key] as Lesson;
                    lessonArr.push(lesson);
                });
                return lessonArr;
            })
        );
    }


    saveCourse(courseId: number, changes: Partial<Course>) {
        // return this.http.put('http://localhost:9000/api/courses/' + courseId, changes);
        const course = saveCourse2(courseId, changes);
        return of(course)
            .pipe(
                delay(500)
            );
    }


}
