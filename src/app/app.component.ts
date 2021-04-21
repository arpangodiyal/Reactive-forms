import { Component, OnInit, VERSION } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { passwordValidator } from "./shared/password-validator";
import { nameValidator } from "./shared/user-name.validator";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          "Arpan",
          [Validators.required, Validators.minLength(3), nameValidator(/admin/)]
        ],
        email: [""],
        password: [""],
        confirmPassword: [""],
        address: this.fb.group({
          state: [""],
          city: [""],
          pinCode: [""]
        }),
        alternateEmails: this.fb.array([]),
        sendPromotion: [""]
      },
      {
        validator: passwordValidator
      }
    );

    this.registrationForm.get('sendPromotion').valueChanges.subscribe(
      (checked) => {
        const email = this.registrationForm.get('email');
        if(checked){
          email.setValidators(Validators.required);
        }
        else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      }
    )
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     state: new FormControl(''),
  //     city: new FormControl(''),
  //     pinCode: new FormControl(''),
  //   })
  // });

  get userName() {
    return this.registrationForm.get("userName");
  }

  get confirmPassword() {
    return this.registrationForm.get("confirmPassword");
  }

  get email(){
    return this.registrationForm.get("email");
  }

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }
}
