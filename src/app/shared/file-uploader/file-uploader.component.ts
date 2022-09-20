import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpUploadProgressEvent,
} from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgxFileDropEntry } from "@bugsplat/ngx-file-drop";
import {
  BehaviorSubject,
  bindCallback,
  filter,
  finalize,
  from,
  map,
  mergeMap,
  Observable,
  scan,
  switchMap,
  takeWhile,
} from "rxjs";
import { FileUploadProgress } from "../../models/file-upload-progress";
import { v4 as uuid } from "uuid";
import { FilesTableEntry } from "src/app/models/files-table-entry";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.css"],
})
export class FileUploaderComponent implements OnInit {
  @Output() picture = new EventEmitter<string>();

  uploads$?: Observable<FileUploadProgress[]>;
  files$?: Observable<FilesTableEntry[]>;
  id: string = uuid();
  fileExt: string | any;

  private getFilesSubject = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) {
    this.files$ = this.getFilesSubject
      .asObservable()
      .pipe(
        switchMap(() =>
          this.httpClient.get<FilesTableEntry[]>(
            "https://facturazen-backend-9tcee.ondigitalocean.app/api/files"
          )
        )
      );
  }

  ngOnInit(): void {}
  onFilesDropped(files: NgxFileDropEntry[]): void {
    this.uploads$ = from(files).pipe(
      mergeMap((selectedFile) => {
        const id = this.id;
        const fileEntry = selectedFile.fileEntry as FileSystemFileEntry;
        const observableFactory = bindCallback(fileEntry.file) as any;
        const file$ = observableFactory.call(fileEntry) as Observable<File>;
        return file$.pipe(
          switchMap((file) =>
            this.uploadFile(file).pipe(
              takeWhile((event) => event.type !== HttpEventType.Response),
              filter(isHttpProgressEvent),
              map((event) => {
                const name = file.name;
                const loaded = event.loaded ?? 0;
                const total = event.total ?? 1;
                const progress = Math.round((loaded / total) * 100);
                const failed = false;
                const done = progress === 100;
                return {
                  id,
                  name,
                  progress,
                  failed,
                  done,
                };
              })
            )
          )
        );
      }),
      scan((acc, next) => {
        acc[next.id] = next;
        return {
          ...acc,
        };
      }, {} as Record<string, FileUploadProgress>),
      map((progress) => Object.values(progress)),
      finalize(() => {
        this.getFilesSubject.next(null);
        this.picture.emit(
          `https://facturazen-backend-9tcee.ondigitalocean.app/api/files/${this.id}.${this.fileExt}`
        );
      })
    );
  }
  private uploadFile(file: File): Observable<HttpEvent<unknown>> {
    const url =
      "https://facturazen-backend-9tcee.ondigitalocean.app/api/files/upload";
    const formData: FormData = new FormData();
    const fileExt = file.name.split(".").pop();
    this.fileExt = fileExt;

    formData.append("file", file, `${this.id}.${fileExt}`);

    return this.httpClient.post(url, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
function isHttpProgressEvent(
  input: HttpEvent<unknown>
): input is HttpUploadProgressEvent {
  return input.type === HttpEventType.UploadProgress;
}
