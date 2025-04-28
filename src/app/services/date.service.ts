// import { DatePipe } from '@angular/common';
// import { Injectable } from '@angular/core';
// import {
//   NgbDate,
//   NgbDateStruct,
//   NgbDateStructAdapter,
// } from '@ng-bootstrap/ng-bootstrap';
// import moment from 'moment';
// import { Utils } from '../shared/utils/utils';

// @Injectable({
//   providedIn: 'root',
// })
// export class DateService {
//   constructor() {}

//   GetHijriArabicDate() {
//     return new Date().toLocaleString('ar-SA');
//   }

//   // Usage >> Get Day Name Of Current Date
//   // Param >> ar >> true (get name of day in arabic) - false (get name of day on English)
//   GetDateName = function (ar: boolean) {
//     let days =
//       ar == true
//         ? [
//             'الاحد',
//             'الاثنين',
//             'الثلاثاء',
//             'الاربعاء',
//             'الخميس',
//             'الجمعة',
//             'السبت',
//           ]
//         : [
//             'Sunday',
//             'Monday',
//             'Tuesday',
//             'Wednesday',
//             'Thursday',
//             'Friday',
//             'Saturday',
//           ];
//     let d = new Date();
//     return days[d.getDay()];
//   };

//   // Usage >> Get Month Name Of Current Date
//   // Param >> ar >> true (get name of Month in arabic) - false (get name of Month on English)
//   GetMonthName = function (ar: boolean) {
//     let months =
//       ar == true
//         ? [
//             'يناير',
//             'فبراير',
//             'مارس',
//             'ابريل',
//             'مايو',
//             'يونيو',
//             'يوليو',
//             'اغسطس',
//             'سبتمبر',
//             'اكتوبر',
//             'نوفمبر',
//             'ديسمبر',
//           ]
//         : [
//             'January',
//             'February',
//             'March',
//             'April',
//             'May',
//             'June',
//             'July',
//             'August',
//             'September',
//             'October',
//             'November',
//             'December',
//           ];
//     let d = new Date();
//     return months[d.getMonth()];
//   };

//   // TO ADD NO OF MONTH TO DATE
//   GetEndDate(start: any, month: any) {
//     return moment(new Date(start)).add(month, 'months').format('YYYY-MM-DD');
//   }

//   // Usage > convert date from calender from object {date:,month:,year:} to yyyy-mm-dd
//   getDatefromCalender(_date: any) {
//     if (Utils.isNullOrEmpty(_date)) return null;
//     let Calenderdate;
//     if (_date.type == 'blur') Calenderdate = _date.target.value;
//     // when text blur get date to check if remove value or not
//     else Calenderdate = _date?.year + '-' + _date?.month + '-' + _date?.day; // if select date from calender
//     return Calenderdate;
//   }
//   convertStringDateToNgbDateStruct(Date: any) {
//     let Hijridate: NgbDateStruct;
//     if (!Utils.isNullOrEmpty(Date)) {
//       let date = Date.split('-');
//       Hijridate = {
//         year: parseInt(date[0]),
//         month: parseInt(date[1]),
//         day: parseInt(date[2]),
//       };
//       return Hijridate;
//     }
//     return {
//       year: 1970,
//       month: 1,
//       day: 1,
//     };
//   }

//   convertStringDateTostring(Date: any): string {
//     if (!Utils.isNullOrEmpty(Date)) {
//       let date = Date.split('-');
//       return `${parseInt(date[0])}-${parseInt(date[1])}-${parseInt(date[2])}`;
//     }
//     return '1970-1-1';
//   }

//   getGregTodayDate(): string {
//     let now: Date = new Date();
//     return ` ${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
//   }

//   getDurationInDayes(startDateString: string, endDateString: string): number {
//     if (!startDateString || !endDateString) return 0;

//     let startDate = new Date(startDateString);
//     let endDate = new Date(endDateString);

//     let count = 0;
//     let date = new Date(startDate.getTime());

//     while (date < endDate) {
//       date.setDate(date.getDate() + 1);
//       count++;
//     }

//     return count;
//   }

//   getToDate(startDateString: string, duration: number): NgbDateStruct | null {
//     if (!startDateString || !duration) return null;

//     let startDate = new Date(startDateString);
//     const endDate = new Date(startDate);

//     duration = Number(duration);
//     endDate.setDate(startDate.getDate() + duration);

//     const ngbEndDate: NgbDateStruct = {
//       year: endDate.getFullYear(),
//       month: endDate.getMonth() + 1,
//       day: endDate.getDate(),
//     };

//     return ngbEndDate;
//   }
// }
