import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  //variables
  startDate: Date | null = null;
  endDate: Date | null = null;

  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumns: string[] = ['position', 'cityName', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('picker') picker: MatDatepicker<Date> | undefined;


  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  maxDateRange: number = 7;
  startDateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const maxEndDate = new Date(event.value);
      maxEndDate.setDate(maxEndDate.getDate() + this.maxDateRange - 1);

      if (this.endDate && this.endDate > maxEndDate) {
        this.endDate = null;
      }
    }
  }

  endDateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const minStartDate = new Date(event.value);
      minStartDate.setDate(minStartDate.getDate() - this.maxDateRange + 1);

      if (this.startDate && this.startDate < minStartDate) {
        this.startDate = null;
      }
    }
  }
}

