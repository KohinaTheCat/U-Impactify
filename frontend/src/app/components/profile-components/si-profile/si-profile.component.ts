import { Component, Input, OnInit } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-si-profile',
  templateUrl: './si-profile.component.html',
  styleUrls: ['./si-profile.component.css'],
})
export class SiProfileComponent implements OnInit {
  @Input()
  searchedUser?: User;

  @Input()
  sameUser?: boolean = false;

  img: NgxFileDropEntry[] = [];
  imageError: string = 'No Image Has Been Selected';

  profileImage: string;

  isLoggedIn: boolean;

  user: User;
  basic = false;
  registeredNumber: string;
  businessNumber: string;
  location: string;
  hours: string;
  phone: string;
  email: string;
  opened: boolean = false;
  amount: number;
  current: string = 'edit';
  error: string = '';

  items: string[] = ['Item1', 'Item2', 'Item3'];
  vertical = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.userService.getCurrentUser();

    if (this.searchedUser) {
      this.user = this.searchedUser;
    } else {
      this.sameUser = true;
      this.user = this.userService.getCurrentUser();
    }
    this.doNotChange();

    this.userService
      .getUserImage(this.user._id)
      .subscribe(
        (res) =>
          (this.profileImage =
            res === '' || res === null
              ? ''
              : `https://uimpactify.herokuapp.com/api/user/documents/${res}`)
      );
  }

  ngOnChanges() {
    this.isLoggedIn = !!this.userService.getCurrentUser();

    if (this.searchedUser) {
      this.user = this.searchedUser;
    } else {
      this.sameUser = true;
      this.user = this.userService.getCurrentUser();
    }
    this.doNotChange();

    this.userService
      .getUserImage(this.user._id)
      .subscribe(
        (res) =>
          (this.profileImage =
            res === '' || res === null
              ? ''
              : `https://uimpactify.herokuapp.com/api/user/documents/${res}`)
      );
  }

  onChangeImage() {
    if (this.sameUser) {
      for (const droppedFile of this.img) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const formData = new FormData();
            formData.append('document', file, droppedFile.relativePath);
            this.userService.postUserImage(formData, this.user._id).subscribe(
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

  add(): void {
    this.userService
      .addSocialInitiativeProfile(
        this.registeredNumber,
        this.businessNumber,
        this.location,
        this.hours,
        this.phone,
        this.email,
        this.user._id
      )
      .subscribe(
        (res) => {
          if (this.img[0]) this.onChangeImage();
          else {
            this.userService.setUser(res);
            this.user = res;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  doNotChange(): void {
    const {
      registeredNumber,
      businessNumber,
      location,
      hours,
      phone,
      email,
    } = this.user.socialInitiative;

    this.registeredNumber = registeredNumber;
    this.businessNumber = businessNumber;
    this.location = location;
    this.hours = hours;
    this.phone = phone;
    this.email = email;
  }

  onDonate() {
    this.opened = !this.opened;
  }

  onOkay() {
    if (!this.sameUser) {
      const user = this.userService.getCurrentUser();
      this.userService.updateCredit(user._id, -1 * this.amount).subscribe(
        (res) => {
          this.userService.setUser(res);
        },
        (err) => {
          this.error = err.message;
        }
      );
      this.userService
        .updateCredit(this.searchedUser._id, this.amount)
        .subscribe();
    }
  }
}
