import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "ap-search",
  templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onTyping = new EventEmitter<string>();
  @Input() value = "";
  debounce: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debounce
      .pipe(debounceTime(300))
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe((filter) => this.onTyping.emit(filter));
  }

  /* Ele faz parte do ciclo de vida de um componente do Angular, sendo chamado toda vez que um objeto é destruído.
  Significa que quando sairmos de PhotoListComponent, e ele for destruído, o método será chamado, e faremos o unsubscribe() */

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
