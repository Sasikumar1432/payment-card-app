import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from './payment-detail';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  //api url
  url: string = environment.apiBaseUrl + '/PaymentDetails';
  // stored object
  list: PaymentDetail[] = [];
  //model class
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) {}

  refreshList() {
    this.http.get(this.url).subscribe({
      next: (res) => {
        this.list = res as PaymentDetail[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  postPayment() {
    return this.http.post(this.url, this.formData);
  }

  putPayment() {
    return this.http.put(
      this.url + '/' + this.formData.paymentId,
      this.formData
    );
  }

  deletePayment(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new PaymentDetail();
    this.formSubmitted = false;
  }
}
