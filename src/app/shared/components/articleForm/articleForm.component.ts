import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleFormValuesInterface } from './types/articleFormValues.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BackendErrorMessages } from '../backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorMessages, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articlesSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articlesSubmit.emit(articleFormValues);
  }
}
