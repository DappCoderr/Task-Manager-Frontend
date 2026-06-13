import Providers from "@/providers";
import "@/app/globals.css";

export const metadata = {
  title: "Task Manager",
  description: "A full-stack task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}