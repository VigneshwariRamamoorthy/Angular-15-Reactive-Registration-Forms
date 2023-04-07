import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Angular-15-Reactive-Registration-Forms';

  registrationForm: FormGroup;
  regFormSubmitted: boolean;
  checkBoxValidate: boolean;

  contactMode:Array<any> = [{id:'text',value:'text'},
  {id:'Email',value:'Email'},
  {id:'Phone',value:'Phone Call'},
  {id:'All the mode',value:'All the mode'}];
  finalOutput: any;

  constructor() {}
  
  ngOnInit() {
    this.registrationForm = new FormGroup({

      userName: new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(12)]),
      emailId: new FormControl(null,[Validators.required,Validators.email]),
      passWord: new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      educationDetails: new FormGroup({
        degree: new FormControl(null,Validators.required),
        universityName: new FormControl(null,Validators.required),
      }),
      phoneNumber: new FormControl(null,Validators.required),
      contactMethod: new FormArray([],Validators.required),
    });

    this.addCheckBox();

    this.checkBoxesValidation();
   }

   addCheckBox() {
       this.contactMode.forEach(()=>this.contactMethodValue.push(new FormControl(false)));

       console.log("this.contactMethod ===>  "+this.contactMethodValue);
   }

   get userName() {
    return this.registrationForm.get('userName');
   }
   get emailId() {
    return this.registrationForm.get('emailId');
   }
   get passWord() {
    return this.registrationForm.get('passWord');
   }
   get degree() {
    return this.registrationForm.get(['educationDetails','degree']);
   }
   get universityName() {
    return this.registrationForm.get(['educationDetails','universityName']);
   }

   get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
   }


   get contactMethodValue() {
    return this.registrationForm.get('contactMethod') as FormArray;
   }

   checkBoxesValidation() {
    const selectCheckBox = this.registrationForm.value.contactMethod
    .map((checked: any, i: any)=> checked ? this.contactMode[i].id : null) 
    .filter((v: any) => v !== null); 
    if(selectCheckBox.length > 0) {
      this.checkBoxValidate =  false;
    } else {
      this.checkBoxValidate =  true;
    }
   }

   onSubmit() {
    this.regFormSubmitted = true;

    if(this.registrationForm.valid && !this.checkBoxValidate) {
      const selectCheckBox =this.registrationForm.value.contactMethod
    .map((checked: any, i: any)=> checked ? this.contactMode[i].id : null)    
    .filter((v: any) => v !== null); 

    console.log("selectCheckBox ==> "+selectCheckBox);

      this.finalOutput = {
        userName : this.registrationForm.value.userName,
        EmailId: this.registrationForm.value.emailId,
        PassWord: this.registrationForm.value.passWord,
        degree: this.registrationForm.value.educationDetails.degree,
        universityName: this.registrationForm.value.educationDetails.universityName,
        phoneNumber: this.registrationForm.value.phoneNumber,
        contactMethod: selectCheckBox

      }

      console.log("final Values of form===>", this.finalOutput);
    }


  }




}
