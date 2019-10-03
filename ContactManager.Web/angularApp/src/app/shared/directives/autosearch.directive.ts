import { Directive, EventEmitter, Output, ElementRef } from '@angular/core';
import { ContactService} from './../services/contact.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appAutosearch]'
})
export class AutosearchDirective {
  @Output() gotSearchResults = new EventEmitter();

  constructor(private repo: ContactService, private ele: ElementRef) { 
    const typeahead$ = fromEvent(this.ele.nativeElement, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2 || text.length === 0),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => {
        let value = this.ele.nativeElement.value;
        if(value.length === 0){
          return this.repo.getData(`api/contact`);
        } else{
          return this.repo.getData(`api/contact/search/${value}`);
        }
      })
    );

    typeahead$.subscribe(data => {
      this.gotSearchResults.emit(data);
    });
  }
}
