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
  title: 'Tư tưởng Hồ Chí Minh - Văn hóa nền tảng tinh thần của xã hội',
  description: 'Website học thuật Tư tưởng Hồ Chí Minh - Khám phá văn hóa Bắc - Trung - Nam.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body className={beVietnamPro.className}>{children}</body>
    </html>
  );
}
