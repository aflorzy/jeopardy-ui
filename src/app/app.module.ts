import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClueTileComponent } from "./components/clue-tile/clue-tile.component";
import { GameBoardComponent } from "./components/game-board/game-board.component";
import { CategoryHeaderComponent } from "./components/category-header/category-header.component";

@NgModule({
  declarations: [
    AppComponent,
    ClueTileComponent,
    GameBoardComponent,
    CategoryHeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
