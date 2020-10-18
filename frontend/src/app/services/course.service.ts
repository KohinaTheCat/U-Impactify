import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course: Course = JSON.parse(localStorage.getItem('course') || null);

  constructor(private http: HttpClient) {}

  postNewCourse(newCourse): Observable<any> {
    const { title, description, level, tags } = newCourse;
    return this.http.post('http://localhost:5000/course/add', {
      // NgxFileDropEntry : documents[],
      title,
      students: [],
      teachers: ['Winson'],
      description,
      files: [],
      level,
      tags,
    });
  }

  postNewFile(file: any) {
    const formData = new FormData();

    // formData.append("filename", file.name);
    formData.append('file', file);

    const headers = new HttpHeaders({
      'security-token': 'mytoken'
    }) 
    return this.http.post(
      'http://localhost:5000/course/5f8baf446c6a05444459a50e/upload',
      {documents: file, headers: headers, responseType: 'blob' }
    );
  }

  getCourseFiles(CourseId): Observable<any> {
    return this.http.get(`http://localhost:5000/document/${CourseId}`, {});
  }
}
