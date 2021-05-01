import { Element, html } from '@guiseek/web-core'

declare global {
  interface HTMLElementTagNameMap {
    'seek-github-icon': GithubIconElement
  }
}

@Element({
  selector: 'seek-github-icon',
  template: html`
    <svg
      width="100"
      height="100"
      viewBox="0 0 172 172"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67.209 150.519C67.2009 149.53 67.1928 145.246 67.1848 141.236L67.1767 137.071C49.0925 139.53 44.7146 126.912 44.6662 126.777C42.1561 120.413 38.7242 118.594 38.5764 118.519L38.2431 118.325C36.9988 117.476 33.6985 115.216 34.6365 112.243C35.483 109.564 38.7645 109.287 40.256 109.336C48.5174 109.913 52.6992 117.339 52.8712 117.653C57.0878 124.88 63.5244 124.133 67.6766 122.609C68.0636 120.76 68.6629 119.062 69.4477 117.562C56.1284 115.2 41.0381 108.115 41.0381 82.345C41.0381 75.2688 43.2418 69.015 47.5983 63.7233C46.6254 60.4822 45.5182 53.8709 48.7969 45.5424L49.2645 44.3545L50.4793 43.9675C51.5973 43.5993 57.7033 42.2905 70.2566 50.5062C75.4381 49.1786 80.9233 48.4932 86.5805 48.4664C92.2645 48.4932 97.7551 49.1786 102.947 50.5062C115.49 42.2878 121.582 43.6127 122.703 43.9675L123.915 44.3572L124.383 45.5397C127.675 53.8655 126.568 60.4795 125.595 63.7233C129.943 68.9989 132.147 75.2554 132.147 82.345C132.147 108.121 117.041 115.184 103.692 117.516C105.205 120.378 106.025 123.972 106.025 127.938C106.025 132.461 106.006 147.299 105.984 150.519L100.609 150.481C100.631 147.267 100.65 132.453 100.65 127.936C100.65 121.373 98.1152 118.47 97.0214 117.524L92.372 113.501L98.4834 112.821C112.472 111.268 126.769 106.428 126.769 82.3423C126.769 76.0804 124.681 70.6221 120.561 66.1205L119.406 64.8601L120.056 63.2825C120.502 62.2048 122.459 56.7197 119.94 49.063C117.903 49.1839 113.039 50.1434 104.933 55.6393L103.901 56.3353L102.705 56.0048C97.6986 54.6127 92.122 53.8655 86.5777 53.8387C81.063 53.8655 75.4945 54.6127 70.4957 56.0048L69.2998 56.3353L68.2705 55.6393C60.1569 50.146 55.2818 49.1785 53.2366 49.0576C50.7238 56.7196 52.683 62.2048 53.1291 63.2825L53.7795 64.8601L52.6265 66.1205C48.4985 70.6382 46.4077 76.0965 46.4077 82.3423C46.4077 106.417 60.6783 111.287 74.6372 112.875L80.6894 113.563L76.0992 117.567C75.0994 118.441 73.331 120.556 72.729 124.896L72.5275 126.372L71.1676 126.982C67.6174 128.573 55.4753 132.792 48.1948 120.303C48.1545 120.236 46.7328 117.764 44.1582 116.119C45.8944 117.836 48.0094 120.615 49.716 124.953C49.8933 125.463 53.3629 134.687 69.281 131.239L72.5221 130.535L72.5543 141.225C72.5624 145.222 72.5705 149.492 72.5785 150.481L67.209 150.519Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M86 155.875C47.4693 155.875 16.125 124.531 16.125 86C16.125 47.4693 47.4693 16.125 86 16.125C124.531 16.125 155.875 47.4693 155.875 86C155.875 124.531 124.531 155.875 86 155.875ZM86 21.5C50.4363 21.5 21.5 50.4363 21.5 86C21.5 121.564 50.4363 150.5 86 150.5C121.564 150.5 150.5 121.564 150.5 86C150.5 50.4363 121.564 21.5 86 21.5Z"
        fill="url(#paint1_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="83.3098"
          y1="43"
          x2="83.3098"
          y2="148.732"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8AB4FF" />
          <stop offset="1" stop-color="#E492FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="86"
          y1="13.4375"
          x2="86"
          y2="159.011"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A6DFF" />
          <stop offset="1" stop-color="#C822FF" />
        </linearGradient>
      </defs>
    </svg>
  `,
})
export class GithubIconElement extends HTMLElement {}