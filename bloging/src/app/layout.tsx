import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/ui/styles/globals.css";


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: "Bloging",
  description: "Lets blog about it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}