import {TranslateService} from "@ngx-translate/core";


export class Accessibility {

  constructor(private translate: TranslateService) {
  }

  // better sounding for screenreader users
  public progressInterpolation(fileItem, limit) {

    const timer = setInterval(() => {
        if ((fileItem as any).progressValue > limit)
          clearInterval(timer);
        else {
          const newValue = (fileItem as any).progressValue += 10;
          // this.setAriaLiveValue(newValue + "%");
        }
      },
      1000);
  }

  public setAriaLiveValue(value) {

    document.getElementById('aria-live').innerHTML = value;
  }


  // TODO: should come this data from backend report modeller??
  public getAccessibilityLevelAsWord(color) {
    // console.log(color);
    color = color.toLowerCase();

    var asWord = 'undefined';
    if (color === "red")
      this.translate.get('BACC.LEGEND_LEVELS.VERY_STRONG').subscribe((res: string) => {
        asWord = res;
      });
    else if (color === 'orange')
      this.translate.get('BACC.LEGEND_LEVELS.STRONG').subscribe((res: string) => {
        asWord = res;
      });
    else if (color === 'yellow')
      this.translate.get('BACC.LEGEND_LEVELS.PARTIALLY').subscribe((res: string) => {
        asWord = res;
      });
    else if (color === 'yellowgreen')
      this.translate.get('BACC.LEGEND_LEVELS.MINOR').subscribe((res: string) => {
        asWord = res;
      });
    else if (color === 'green')
      this.translate.get('BACC.LEGEND_LEVELS.NONE').subscribe((res: string) => {
        asWord = res;
      });

    return asWord;
  }
}
