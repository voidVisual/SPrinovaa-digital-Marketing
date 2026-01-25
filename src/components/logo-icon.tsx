export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M34.93,13.62c-6.1-5.3-15.4-4.8-21,1.1s-5.8,15.1,0.3,20.4 c5.9,5.1,15,4.7,20.7-0.4"
        stroke="hsl(210 90% 45%)"
        strokeWidth="5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M26.49,43.41c-8.9,0-16.1-7.2-16.1-16.1s7.2-16.1,16.1-16.1c5.9,0,11.1,3.2,13.9,7.9"
        stroke="hsl(30 90% 50%)"
        strokeWidth="5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M32.89,4.42,48.1,19.63,44.2,23.53l-9.1-9.1V28.3h-6.2V14.43l-9.1,9.1-3.9-3.9L32.89,4.42z"
        fill="hsl(30 90% 50%)"
      />
    </svg>
  );
}
