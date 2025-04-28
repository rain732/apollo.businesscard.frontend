import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IconsModule } from '../../../modules/icons/icons.module';

@Component({
  selector: 'app-scroll-up-button',
  templateUrl: './scroll-up-button.component.html',
  styleUrls: ['./scroll-up-button.component.css'],
  standalone : true,
  imports: [
    IconsModule
  ]
})
export class ScrollUpButtonComponent{
  constructor() {}
}
