import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Photo } from "src/app/models/photo";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.scss"],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  currentMainPhoto: Photo;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  response: string;
  baseUrl = environment.apiUrl;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.auth.decodedToken.nameid}/photos`,
      authToken: `Bearer ${localStorage.getItem("token")}`,
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => (file.withCredentials = false);
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.currentMainPhoto = this.photos.find((p) => p.isMain);
    this.currentMainPhoto.isMain = false;
    photo.isMain = true;
    this.getMemberPhotoChange.emit(photo.url);
    this.userService
      .setMainPhoto(this.auth.decodedToken.nameid, photo.id)
      .subscribe(
        () => console.log("Success set main"),
        (error) => this.alert.error(error)
      );
  }
}
