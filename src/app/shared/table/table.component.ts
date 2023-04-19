import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() pagination: boolean = false;
  @Output() loaded = new EventEmitter<boolean>();

  dataSource = new MatTableDataSource<any>();
  pageOptions = [10, 20, 50, 100];
  loading = true;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table!: ElementRef;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.data && this.displayedColumns) {
      this.loadTableData(this.data);
    }
  }

  ngAfterViewInit(): void {
    const { pagination, paginator, data, table } = this;
    if (pagination && paginator) {
      this.dataSource.paginator = paginator;
      this.pageSize = paginator.pageSize;
    } else {
      this.pageSize = Math.min(data.length, 10);
    }
    if (!pagination && table) {
      const tableHeight = table.nativeElement.offsetHeight;
      table.nativeElement.style.height = `${tableHeight}px`;
    }
  }

  getColumnValue(row: any, col: string): string {
    if (!row || !col) return '';

    const value = row[col];
    return value != null && value !== undefined ? value : '';
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  loadTableData(data: any[]): void {
    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = data;
      this.loading = false;
      this.loaded.emit(true);
    }, 3000);
  }
  trackByFn(item: any): any {
    return item.id;
  }
}
