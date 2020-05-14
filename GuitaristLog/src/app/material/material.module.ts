import { NgModule } from '@angular/core';
import { MatMomentDateAdapterOptions, MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

const MAT_DIALOG_GLOBAL_CONFIG: MatDialogConfig = {
  width: '700px',
  maxHeight: '1127px',
  disableClose: true,
  hasBackdrop: true
};

const MAT_DATE_ADAPTER_GLOBAL_CONFIG: MatMomentDateAdapterOptions = {
  useUtc: true,
  strict: true
};

const MAT_DATEPICKER_GLOBAL_CONFIG: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

const MAT_SNACK_BAR_GLOBAL_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  verticalPosition: 'bottom',
  horizontalPosition: 'center'
};

const MATERIAL_MODULES = [
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatSelectModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSidenavModule,
  MatCardModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatAutocompleteModule
];



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [...MATERIAL_MODULES],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: MAT_DATE_ADAPTER_GLOBAL_CONFIG },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATEPICKER_GLOBAL_CONFIG },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: MAT_SNACK_BAR_GLOBAL_CONFIG },
  ]
})
export class MaterialModule { }
