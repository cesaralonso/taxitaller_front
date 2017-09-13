import { Component, OnInit } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.html',
})
export class ProfileEdit implements OnInit {

  defaultPicture = 'assets/img/theme/no-photo.png';

  profile: any = {
    picture: 'assets/img/app/profile/Cesar.png',
  };

  fileUploaderOptions: NgUploaderOptions = {
    url: 'http://localhost/slim/v1/uploadImagen/123',
  };

  constructor() {
  }

  ngOnInit() {
  }
}
