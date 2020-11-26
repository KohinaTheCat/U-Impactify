import { Component, Input, OnInit } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ic-il-profile',
  templateUrl: './ic-il-profile.component.html',
  styleUrls: ['./ic-il-profile.component.css'],
})
export class IcIlProfileComponent implements OnInit {
  @Input()
  user: User;
  email: String;
  username: String;

  @Input()
  sameUser: boolean;
  global: String;
  observing: {};

  isProfileComplete: boolean = false;

  shouldEditShow: boolean = false;

  img: NgxFileDropEntry[] = [];
  imageError: string = 'No Image Has Been Selected';

  linkedIn: string = '';
  facebook: string = '';
  twitter: string = '';
  fullName: string = '';
  phone: string = '';
  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initProfile();
  }

  ngOnChanges(): void {
    this.initProfile();
  }

  /**
   * USER SERVICE STUFF HERE
   */
  initProfile(): void {
    const { fullName, phone } = this.user.profile;
    this.isProfileComplete = !!fullName && !!phone;
  }

  goTo(url: string): void {
    if (!url) return;
    window.open(url, '_blank');
  }

  public droppedProfileImage(image: NgxFileDropEntry[]) {
    this.img = image;
    for (const droppedFile of image) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (
            !(
              file.name.endsWith('.png') ||
              file.name.endsWith('.jpg') ||
              file.name.endsWith('.JPG') ||
              file.name.endsWith('.JPEG') ||
              file.name.endsWith('.jpeg')
            )
          ) {
            this.img = [];
            this.imageError = 'Bad Course Image!';
          } else {
            this.imageError = '';
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  onChangeImage() {
    if (this.sameUser) {
      for (const droppedFile of this.img) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const formData = new FormData();
            formData.append('document', file, droppedFile.relativePath);
            this.userService.postCourseImage(formData, this.user._id).subscribe(
              (res) => {
                this.userService.setUser(res);
                this.ngOnChanges();
              },
              (err) => {
                console.log(err);
              }
            );
          });
        }
      }
    }
  }
}
