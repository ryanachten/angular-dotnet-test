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
        if (photo.isMain) {
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currentUser.photoUrl = photo.url;
          localStorage.setItem("user", JSON.stringify(this.auth.currentUser));
        }
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.auth.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMainPhoto = this.photos.find((p) => p.isMain);
          this.currentMainPhoto.isMain = false;
          photo.isMain = true;
          this.auth.changeMemberPhoto(photo.url);
          this.auth.currentUser.photoUrl = photo.url;
          localStorage.setItem("user", JSON.stringify(this.auth.currentUser));
        },
        (error) => this.alert.error(error)
      );
  }

  deletePhoto(id: number) {
    this.alert.confirm("Are you sure you want to delete this photo", () => {
      this.userService.deletePhoto(this.auth.decodedToken.nameid, id).subscribe(
        () => {
          this.photos.splice(
            this.photos.findIndex((p) => p.id === id),
            1
          );
          this.alert.success("Photo has been deleted");
        },
        (error) => this.alert.error("Failed to delete photo")
      );
    });
  }
}
