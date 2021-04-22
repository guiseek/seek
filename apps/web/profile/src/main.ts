import './app'
import './section'
import './shared'
import './config'
import { environment } from './envs/env'

console.log(environment)

// document.addEventListener('DOMContentLoaded', () => {
//   let alReadyScrolling = false
//   const video = document.querySelector('video')
//   document.addEventListener('scroll', (ev) => {
//     if (!alReadyScrolling) {
//       alReadyScrolling = true
//       setTimeout(() => {
//         location.href = '#family'
//       }, 3000)
//     }
//   })
// })
