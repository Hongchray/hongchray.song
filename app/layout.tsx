import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";
export const metadata: Metadata = {
  title: "Hongchray Song — Web Developer",
  description:
    "Portfolio of Hongchray Song, a Web Developer specializing in Laravel, Vue.js, and Next.js.",
  icons: {
    icon: "/profile.png",
  },
};
const themeInitScript = `
(function() {
  try {
    var stored = window.localStorage.getItem('chray-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale} className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${fontVariables} font-body bg-bg text-text antialiased transition-colors duration-300`}>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
