import { TagProps, useTags } from "./tags";
import { useTagStyle } from "./utils";

export const P = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];
  const pTagStyle = tagConfig?.['p'];

  const [
    newStyle
  ]
  = useTagStyle([
  ], [divTagStyle, pTagStyle, style]);
  
  return (
    <p style={{
      ...newStyle
    }} {...rest}>
      {children}
    </p>
  )
}