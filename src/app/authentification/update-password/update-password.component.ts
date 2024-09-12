import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  showErrorMessages: boolean = false;
  errorMessage: string = ''; 
  updatePasswordForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    'password-new': new FormControl('', Validators.required),
    'password-confirm': new FormControl('', Validators.required),
  });

  
  public showNewPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  newPassword = '';
  confirmPassword = '';

  @ViewChild('updatePasswordFormHTMLElement', {
    read: ElementRef,
    static: true,
  })
  updatePasswordFormHTMLElement!: ElementRef;

  constructor( protected route: Router) {


  }

  ngOnInit(): void {
    this.updatePasswordForm.valueChanges.subscribe(data => this.newPassword = data['password-new']!);
    this.updatePasswordForm.valueChanges.subscribe(data => this.confirmPassword = data['password-confirm']!);
  }


  get upForm() { return this.updatePasswordForm.controls; }


  onSubmit() {
    if (this.updatePasswordForm.valid) {
      let username = (window as { [key: string]: any })["g_username"] as string;
      this.updatePasswordForm.value.username = username.replace( /&amp;/g, '&');
      const htmlFormElement = this.updatePasswordFormHTMLElement.nativeElement;
      let actionUrl = (window as { [key: string]: any })["g_urlLoginAction"] as string;
      actionUrl = actionUrl.replace( /&amp;/g, '&');
      htmlFormElement.action = actionUrl ;
      htmlFormElement.submit();
    }
  }
 submitForm() {
  
    if (this.updatePasswordForm && this.updatePasswordForm.valid) {
      const newPassword = this.updatePasswordForm.get('password-new')?.value;
      const confirmPassword = this.updatePasswordForm.get('password-confirm')?.value;
  
      if (newPassword !== confirmPassword) {
          this.errorMessage = 'Les mots de passe ne correspondent pas.';
          this.showErrorMessages = true;

      } 
    }
  }




  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  
  
}
