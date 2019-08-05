import { Request, Response } from 'express';

import { LESSONS } from './db-data';

export function searchLessons(req: Request, res: Response) {

    console.log('Searching for lessons ...');

    const queryParams = req.query;

    const courseId = queryParams.courseId,
        filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder,
        pageNumber = parseInt(queryParams.pageNumber, 10) || 0,
        pageSize = parseInt(queryParams.pageSize, 10);

    let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId === courseId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
        lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({ payload: lessonsPage });
    }, 1000);


}

export function searchLessons2(
    courseId: string,
    filter = '',
    sortOrder: 'asc' | 'desc' = 'asc',
    pageNumber: string,
    pageSize: string
) {

    console.log('Searching for lessons 2...');

    const parsedCourseId = parseInt(courseId, 10),
        parsedPageNumber = parseInt(pageNumber, 10) || 0,
        parsedPageSize = parseInt(pageSize, 10);

    let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId === parsedCourseId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
        lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        lessons = lessons.reverse();
    }

    const initialPos = parsedPageNumber * parsedPageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + parsedPageSize);

    return lessonsPage;
}
