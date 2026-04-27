import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  message = input<string>('Responses saved!');
  visible = input<boolean>(false);
}
