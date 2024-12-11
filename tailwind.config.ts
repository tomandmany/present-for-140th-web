import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        mailbox: '50% / 100% 100% 0 0',
      },
      zIndex: {
        'mailbox-body': '1',
        'mailbox-slot': '2',
        'mailbox-slot-inside': '3',
        'mailbox-slot-inside-t-bottom': '3',
      }
    },
  },
  plugins: [],
} satisfies Config;
