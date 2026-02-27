import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공비Lab | 데이터로 증명하는 스마트 행정 솔루션",
  description:
    "특허 기반 원가산정 프로그램과 실시간 IoT 관제 시스템으로 지자체 자원순환의 효율을 혁신합니다. B2G 스마트 행정 솔루션 전문 기업.",
  keywords:
    "공비Lab, 스마트행정, IoT관제, 원가산정, 지자체솔루션, B2G, 자원순환",
  openGraph: {
    title: "공비Lab | 데이터로 증명하는 스마트 행정 솔루션",
    description:
      "특허 기반 원가산정 프로그램과 실시간 IoT 관제 시스템으로 지자체 자원순환의 효율을 혁신합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-navy-950 text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
