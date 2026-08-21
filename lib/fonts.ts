import { Space_Grotesk, Inter, JetBrains_Mono, Kantumruy_Pro } from "next/font/google";

export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

// Kantumruy Pro supports multiple weights (unlike Siemreap's single 400),
// so Khmer headings and body text can now carry real weight-based
// hierarchy instead of relying only on size/spacing.
export const khmerFont = Kantumruy_Pro({
  subsets: ["khmer"],
  variable: "--font-khmer",
  weight: ["400", "500", "600", "700"],
});

export const fontVariables = [
  displayFont.variable,
  bodyFont.variable,
  monoFont.variable,
  khmerFont.variable,
].join(" ");