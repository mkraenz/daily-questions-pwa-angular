import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
})
export class Toast {
  message = input<string>('Responses saved!');
  visible = input<boolean>(false);
}
