export interface Photo {
  src: string
  title: string
  width: number
  height: number
  size: 'normal' | 'medium' | 'large' | 'small' | 'none'
  position: 'top' | 'bottom' | 'left' | 'right' | 'none'
}
