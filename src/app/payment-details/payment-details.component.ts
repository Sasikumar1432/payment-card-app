import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  constructor(
    public paymentService: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paymentService.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.paymentService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.paymentService.deletePayment(id).subscribe({
        next: (res) => {
          this.paymentService.list = res as PaymentDetail[];
          this.toastr.error('Deleted successfull!', 'Payment Card');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  ngOnDestroy() {}
}
