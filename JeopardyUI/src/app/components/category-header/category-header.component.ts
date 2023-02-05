import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css'],
})
export class CategoryHeaderComponent {
  categoryHeader: string = '';

  @Input()
  set setCategoryHeader(categoryHeader: string) {
    this.categoryHeader = categoryHeader;
  }

  @Output()
  headerHeight = new EventEmitter<number>();

  constructor() {}

  @ViewChild('content') content!: ElementRef;

  ngAfterViewInit(): void {
    this.headerHeight.emit(this.content.nativeElement.offsetHeight);
  }
}
