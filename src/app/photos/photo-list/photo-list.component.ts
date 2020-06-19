import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "ap-photo-list",
  templateUrl: "./photo-list.component.html",
  styleUrls: ["./photo-list.component.css"],
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  filter = "";
  debounce: Subject<string> = new Subject<string>();
  hasMore = true;
  currentPage: number = 1;
  userName: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data["photos"];
    this.debounce
      .pipe(debounceTime(300))
      .subscribe((filter) => (this.filter = filter));
  }
  /*
  Ele faz parte do ciclo de vida de um componente do Angular, sendo chamado toda vez que um objeto é destruído.
  Significa que quando sairmos de PhotoListComponent, e ele for destruído, o método será chamado, e faremos o unsubscribe() */
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.photos = this.photos.concat(photos);
        if (!photos.length) {
          this.hasMore = false;
        }
      });
  }
}
