import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css'],
})
export class PaymentDetailFormComponent {
  constructor(
    public paymentService: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.paymentService.formSubmitted = true;
    if (form.valid) {
      if (this.paymentService.formData.paymentId == 0) this.insertRecord(form);
      else this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.paymentService.postPayment().subscribe({
      next: (res) => {
        this.paymentService.list = res as PaymentDetail[];
        this.paymentService.resetForm(form);
        this.toastr.success('Inserted successfully!', 'Payment Card');
        //console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.paymentService.putPayment().subscribe({
      next: (res) => {
        this.paymentService.list = res as PaymentDetail[];
        this.paymentService.resetForm(form);
        this.toastr.info('Updated successfully!', 'Payment Card');
        //console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
