import { Router } from '@angular/router';
import { LoginModel } from './../../model/login.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  enviado: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]

    });
  }

  ngOnInit(): void {
  }

  submitForm(){
    this.enviado = true;

    //si no es valido
    if(!this.loginForm.valid)
    return;

    let loginModel: LoginModel = new LoginModel(this.loginForm.controls.username.value, this.loginForm.controls.password.value, '')
    //comienzo llamada
    this.isLoading = true
    this.loginService.
    performLogin(loginModel)
    .subscribe(respuesta => {
      console.log(JSON.stringify(respuesta));
      this.router.navigate(['home']);
      this.isLoading = false
      this.errorMsg = null
    }, error => {
      console.log('Error: ' + JSON.stringify(error));
      this.errorMsg = `⚠️ ¡No se ha podido iniciar la sesión! (${error.error?.error})`
      this.isLoading = false
    },
    ()=>{
      this.isLoading = false
    });
  }
}
