export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 14v8" />
      <path d="M9 22h6" />
      <path d="M12 14l-4-4h8l-4 4z" />
      <circle cx="12" cy="7" r="2" />
      <path d="M22 11.542v-2.126a2 2 0 00-2-2H4a2 2 0 00-2 2v2.126" />
      <path d="M12 22V10l-4.5 3.5" />
      <path d="M12 10l4.5 3.5" />
      <path d="M2 12h20" />
      <path d="M20.3 12.8a2.5 2.5 0 00-2.4-2.4" />
      <path d="M3.7 12.8a2.5 2.5 0 012.4-2.4" />
      <path d="M12 4a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  );
}
