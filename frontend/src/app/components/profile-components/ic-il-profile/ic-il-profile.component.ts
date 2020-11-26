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
  addMoneyShow: boolean = false;

  img: NgxFileDropEntry[] = [];
  imageError: string = 'No Image Has Been Selected';

  profileImage: string = '';

  model = {
    name: '',
    creditCardNumber: '',
    CVV: '',
    exp: '',
    credit: ''
  };

  linkedIn: string = '';
  facebook: string = '';
  twitter: string = '';
  fullName: string = '';
  phone: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.initProfile();
    this.userService
      .getUserImage(this.user._id)
      .subscribe(
        (res) =>
          (this.profileImage =
            res === '' || res === null
              ? ''
              : `http://localhost:5000/api/user/documents/${res}`)
      );

    if (this.sameUser) {
      this.user = this.userService.getCurrentUser();
      this.linkedIn = this.user.profile.linkedIn;
      this.facebook = this.user.profile.facebook;
      this.twitter = this.user.profile.twitter;
    }
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
      }
    }
  }

  addCredit() {
    var val = parseFloat(this.model.credit)
    if (!isNaN(val) && val > 0 && this.sameUser) {
      this.userService
        .updateCredit(this.user._id, val)
        .subscribe(
          (res) => {
            this.userService.setUser(res);
            this.ngOnChanges();
          },
          (err) => console.log(err)
        );
    }
    this.model.credit = '';
    this.addMoneyShow = false;
  }

  onChangeImage() {
    if (this.sameUser) {
      var profile = {
        fullName: '',
        phoneNumber: '',
        linkedIn: this.linkedIn,
        facebook: this.facebook,
        twitter: this.twitter,
      };
      this.userService.updateProfile(this.user._id, profile).subscribe(
        (res) => {
          if (this.img[0] && this.img[0].fileEntry.isFile) {
            const fileEntry = this.img[0].fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              const formData = new FormData();
              formData.append('document', file, this.img[0].relativePath);
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
          } else {
            this.userService.setUser(res);
            this.ngOnChanges();
          }
        },
        (err) => console.log(err)
      );

      this.ngOnChanges();
    }
    this.shouldEditShow = false;
  }
}
