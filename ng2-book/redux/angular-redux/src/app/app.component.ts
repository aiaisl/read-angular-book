import { Component, Inject } from '@angular/core';
import { Store } from 'redux';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  counter: number;

  constructor(
    @Inject
  ) {}

  readState() {
    let state: AppState = this.sote
  }
}
