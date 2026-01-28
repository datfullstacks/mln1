import './globals.css';
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-main',
});

export const metadata: Metadata = {
  title: 'Phenomenon - Văn hóa ba miền',
  description: 'Website học thuật Triết học Mác – Lênin - Khám phá văn hóa Bắc - Trung - Nam, thư viện tri thức và game dân gian tương tác.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className={beVietnamPro.className}>{children}</body>
    </html>
  );
}
