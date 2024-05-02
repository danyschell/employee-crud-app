import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private datePipe: DatePipe
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }


  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  setTransformDate(ctrl:any) {
    
    let val = ctrl.value;
    let newdate = new Date(val);
    let formatted = this.datePipe.transform(newdate,"yyyy-MM-dd"); 
    ctrl.setValue(formatted);
    
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {

        // FORMAT DATE TO SEND TO BACKEND //             
        let ctrl_dob = this.empForm.controls['dob'];
        this.setTransformDate(ctrl_dob);
        ////////////////////////////////////

        console.log('dob.value',this.empForm.controls['dob'].value); 

        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {

        // FORMAT DATE TO SEND TO BACKEND //             
        let ctrl_dob = this.empForm.controls['dob'];
        this.setTransformDate(ctrl_dob);
        ////////////////////////////////////

        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
