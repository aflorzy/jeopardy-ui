import { Component, Input } from "@angular/core";

@Component({
  selector: "app-category-header",
  templateUrl: "./category-header.component.html",
  styleUrls: ["./category-header.component.css"],
})
export class CategoryHeaderComponent {
  categoryHeader: string = "";
  fontSize: number = 20;

  @Input()
  set setCategoryHeader(categoryHeader: string) {
    const length = categoryHeader.length;
    const longestWord = this.getLongestWord(categoryHeader);
    switch (true) {
      case length > 40:
        this.fontSize = 18;
        break;
      case length > 25:
        this.fontSize = 20;
        break;
      case length > 15:
        this.fontSize = 25;
        break;
      case length > 10:
        this.fontSize = 30;
        break;
      default:
        this.fontSize = 35;
        break;
    }

    this.categoryHeader = categoryHeader;
  }

  constructor() {}

  getLongestWord(categoryHeader: string) {
    const split = categoryHeader.split(" ");
    let longestWord = split[0];
    for (let word of split) {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }
    return longestWord;
  }
}
