import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages implements OnInit, OnChanges {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.setErrorMessage();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setErrorMessage();
  }

  setErrorMessage(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }
}
