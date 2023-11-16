import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Injectable()
export class SevenDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createSevenDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createSevenDayRange(activeDate);
  }

  private _createSevenDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

export interface PeriodicElement {
  cityName: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, cityName: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, cityName: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, cityName: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, cityName: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, cityName: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, cityName: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, cityName: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, cityName: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, cityName: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, cityName: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: SevenDayRangeSelectionStrategy,
    },
  ],
})
export class ContentComponent implements OnInit {

  gitLocation: any
  //variables

  weatherData = [
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    { date: new Date(), maxTemp: 25, minTemp: 15 },
    // Add data for other days
  ];

  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'cityName', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;
  @ViewChild('startDateInput') startDateInput: any;
  @ViewChild('endDateInput') endDateInput: any;
  rangeForm!: FormGroup;


  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.rangeForm = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

// const startDateValue = this.startDateInput.value;
//     const endDateValue = this.endDateInput.value;

//     console.log('Start Date:', startDateValue);
//     console.log('End Date:', endDateValue);
