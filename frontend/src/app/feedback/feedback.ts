import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class FeedbackComponent implements OnInit {

  form: FormGroup;
  successMessage: string;

  private WEB_API_CONTACT: string = '/contact';

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    });
  }

  submit() {
    const {name, email, message} = this.form.value;

    this.http
      .post(
        this.WEB_API_CONTACT,
        {name: name, email: email, message: message},
        {responseType: 'text'})
      .subscribe(res => {

          this.form.reset();
          this.successMessage = res.toString();
        },
        err => {
          console.error(err);
        });
  }
}
