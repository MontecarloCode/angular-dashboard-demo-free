import { Component } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  constructor(private toasterService: ToasterService) {}

  config: ToasterConfig;

  position: string = 'toast-top-right';
  animationType: string = 'fade';
  title: string = 'HI there!';
  content: string = `I'm cool toaster!`;
  timeout: number = 5000;
  toastsLimit: number = 5;
  type: string = 'default';

  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  types: string[] = ['default', 'info', 'success', 'warning', 'error'];
  animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
  positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
    'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];

  quotes = [
    { title: null, body: 'We rock at <i>Angular</i>' },
    { title: null, body: 'Titles are not always needed' },
    { title: null, body: 'Toastr rock!' },
    { title: 'What about nice html?', body: '<b>Sure you <em>can!</em></b>' },
  ];

  makeToast() {
    this.showToast(this.type, this.title, this.content);
  }

  openRandomToast () {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];

    this.showToast(type, quote.title, quote.body);
  };

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
    };
    this.toasterService.popAsync(toast);
  }

  clearToasts() {
    this.toasterService.clear();
  }
}
