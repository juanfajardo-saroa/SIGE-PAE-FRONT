const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const keysGlobal = ['Backspace','ArrowLeft','ArrowRight','Delete','Home','End']

export class ValidateInput{
  static OnlyNumber(event){
    if (!(numbers.indexOf(event.key) >= 0) && !(keysGlobal.indexOf(event.key) >= 0)) {
      return false;
    }

    return true;
  }
}
