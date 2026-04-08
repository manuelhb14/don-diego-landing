import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ChatProvider } from "@/components/chat/ChatProvider";
import ChatLayoutShell from "@/components/chat/ChatLayoutShell";
import Script from "next/script";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body>
        <style dangerouslySetInnerHTML={{ __html: 'html { scroll-behavior: auto !important; }' }} />
        <NextIntlClientProvider messages={messages}>
          <ChatProvider>
            <ChatLayoutShell>{children}</ChatLayoutShell>
          </ChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
