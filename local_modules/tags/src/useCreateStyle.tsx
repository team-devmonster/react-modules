import { TagStyle } from "@team-devmonster/react-tags"
import { useTheme } from "@team-devmonster/react-theme"
import { useMemo } from "react"

type UseCreateStyleProps = {
  [name:string]:TagStyle
}
export const useCreateStyle = (styleGroup:UseCreateStyleProps, deps?:any[]) => {
  const theme = useTheme();
  
  return useMemo(() => (
    styleGroup
  ), [theme?.colorScheme, ...deps || []]);
}