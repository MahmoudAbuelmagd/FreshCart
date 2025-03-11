import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID= inject(PLATFORM_ID)
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      let savedLanguage = localStorage.getItem('lang')
      if (savedLanguage) {
        this._TranslateService.use(savedLanguage!)
      }
      this._TranslateService.setDefaultLang('en')
      this.changeDirection()
    }
  }
  // change direction of the page
  changeDirection(): void{
    if (localStorage !== undefined) {
      let savedLanguage = localStorage.getItem('lang')
      if ( savedLanguage === "ar") {
        document.documentElement.setAttribute("dir", "rtl")
      } else if (savedLanguage === "en") {
        document.documentElement.setAttribute("dir", "ltr")
      }
    }
  }
  changeLang(lang : string):void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang' , lang);
    }

    this._TranslateService.use(lang);
    this.changeDirection();
  }

}
