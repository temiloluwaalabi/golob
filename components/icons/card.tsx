export default function CardIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_714_3976)">
        <path
          d="M1.125 10.7188C1.125 11.2409 1.33242 11.7417 1.70163 12.1109C2.07085 12.4801 2.57161 12.6875 3.09375 12.6875H14.9062C15.4284 12.6875 15.9292 12.4801 16.2984 12.1109C16.6676 11.7417 16.875 11.2409 16.875 10.7188V5.30469H1.125V10.7188ZM3.44531 8.04688C3.44531 7.76715 3.55643 7.49889 3.75422 7.3011C3.95202 7.10331 4.22028 6.99219 4.5 6.99219H6.1875C6.46722 6.99219 6.73548 7.10331 6.93328 7.3011C7.13107 7.49889 7.24219 7.76715 7.24219 8.04688V8.75C7.24219 9.02972 7.13107 9.29798 6.93328 9.49578C6.73548 9.69357 6.46722 9.80469 6.1875 9.80469H4.5C4.22028 9.80469 3.95202 9.69357 3.75422 9.49578C3.55643 9.29798 3.44531 9.02972 3.44531 8.75V8.04688ZM14.9062 0.3125H3.09375C2.57161 0.3125 2.07085 0.519921 1.70163 0.889134C1.33242 1.25835 1.125 1.75911 1.125 2.28125V3.19531H16.875V2.28125C16.875 1.75911 16.6676 1.25835 16.2984 0.889134C15.9292 0.519921 15.4284 0.3125 14.9062 0.3125V0.3125Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_714_3976"
          x="-2.875"
          y="0.3125"
          width="23.75"
          height="20.375"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_714_3976"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_714_3976"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
