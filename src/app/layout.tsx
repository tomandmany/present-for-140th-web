import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "140thWeb部門へのメッセージ",
  description: "140thWeb部門へのメッセージが書かれたサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFF8FA] min-h-[100svh]`}
      >
        {children}
        <Image
          src={"/bg-heart.png"}
          alt="背景のハート"
          width={800}
          height={100}
          className="w-full max-w-[600px] h-[400px] fixed bottom-0 left-1/2 -translate-x-1/2 z-bg-heart opacity-60"
        />
      </body>
    </html>
  );
}
