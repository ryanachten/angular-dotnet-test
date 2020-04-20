import { Component, OnInit, Input } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Photo } from "src/app/models/photo";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.scss"],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  baseUrl = environment.apiUrl;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.auth.decodedToken.nameId}/photos`,
      authToken: `Bearer ${localStorage.getItem("token")}`,
      isHTML5: true,
      allowedFileType: ["images"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date(),
          });
        });
      },
    });
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = "";

    this.uploader.response.subscribe((res) => (this.response = res));
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
