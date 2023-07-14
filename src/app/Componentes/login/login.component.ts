import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit() {

      
    $(function() {
      'use strict';
      $('.form-control').on('input', function() {
        var $field = $(this).closest('.form-group');
        if (this) {
          $field.addClass('field--not-empty');
        } else {
          $field.removeClass('field--not-empty');
        }
      });

    });
  
  
  
    }

  

}
