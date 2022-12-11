import { FieldErrorsImpl, Path } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Div, TagStyle, useTags, useTagStyle } from '@team-devmonster/react-tags';

import { FormValues } from './type';


export interface ErrorTextProps<T extends FormValues> {
  errors: Partial<FieldErrorsImpl<T>>,
  name:Path<T>,
  style?:TagStyle
}

export function ErrorText<T extends FormValues>(
  {
    errors, name, style
  }:ErrorTextProps<T>) 
{

  const { tagConfig } = useTags();
  const errorTextStyle = tagConfig?.errorText?.style;

  const [
    tagStyle
  ]
  = useTagStyle([
  ], [
    errorTextStyle,
    style
  ])

  return (
    <ErrorMessage
      errors={errors}
      name={name as any}
      render={({ message }) => {
        return (
          message &&
          <Div style={tagStyle}>{message}</Div>
        )
      }}
    />
  )
}