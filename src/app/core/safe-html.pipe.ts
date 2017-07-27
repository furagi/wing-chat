import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: string): SafeStyle {
    console.log(value);
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
