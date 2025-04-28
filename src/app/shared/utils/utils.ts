import { DatePipe } from '@angular/common';
import { ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
export class Utils {
  public static isNullOrEmpty(str: string | null | undefined) {
    return str === undefined || str === null || str.toString().match(/^ *$/) !== null;
  }

  public static isOnlyLettersAndNumbers(str: string): boolean {
    const regex = /^[A-Za-z0-9\u0621-\u064A\u0660-\u0669 ]+$/;
    return regex.test(str);
  }

  public static isSearchValid(str: string): boolean {
    const regex = /^[A-Z-a-z0-9_.-@\u0621-\u064A\u0660-\u0669 ]+$/;
    return regex.test(str);
  }

  public static isArabicLetters(str: string): boolean {
    const regex = /[\u0621-\u064A\u0660-\u0669 ]+/;
    return regex.test(str);
  }

  public static isArabicLettersAndNumbers(str: string): boolean {
    const regex = /^[0-9\u0621-\u064A\u0660-\u0669 ]+$/;
    return regex.test(str);
  }

  public static isLettersOnly(str: string): boolean {
    const regex = /[A-Za-z\u0621-\u064A\u0660-\u0669 ]+/;
    return regex.test(str);
  }

  public static isOnlyEnglishAndSpecialCharacters(str: string): boolean {
    const regex = /^[_.@a-zA-Z0-9-]+$/;
    return regex.test(str);
  }

  public static isOnlyNumbers(str: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(str);
  }

  public static formatCreatedDate(date: string) {
    const datePipe = new DatePipe('en-US');
    const format = 'yyyy-MM-dd';
    return datePipe.transform(date, format);
  }

  public static isCorrectEmail(str: string): boolean {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(str);
  }

  public static isPriceWithTwoDecimalPlacesAllowed(str: any): boolean {
    const regex = /^[.0-9]+$/;
    return regex.test(str);
  }

  public static isAlphaNumericWithSpecials(str: string): boolean {
    const regex = /^[a-zA-Z0-9\u0600-\u06FF\s.,()%\-\/\\]*$/;
    return regex.test(str);
  }

  public static downloadAttachment(data: any): void {
    let element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:' + data.mimeType + ';base64,' + encodeURIComponent(data.fileStream)
    );
    element.setAttribute('download', data.fileName);
    element.style.display = 'none';
    element.target = '_blank';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  public static exportToExcel(table: ElementRef, fileName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  public static isPasswordMatch(pass: string, confirmPass: string): boolean {
    return pass == confirmPass;
  }

  public static isCorrectUserName(str: string): boolean {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(str);
  }

  public static phoneValidator(str: string): boolean {
    const regex = /^05\d{8}$/;
    return regex.test(str);
  }

  public static isValidNationalId(id: string): boolean {
    if (this.isNullOrEmpty(id)) return false;

    if (id.length !== 10) return false;

    const type = id.substr(0, 1);
    if (type !== '1') return false;

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        let ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(
          -2
        );
        sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
      } else {
        sum += Number(id.substr(i, 1));
      }
    }
    return !!(sum % 10 === 0);
  }
}
