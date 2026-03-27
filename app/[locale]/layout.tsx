import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ChatProvider } from "@/components/chat/ChatProvider";
import ChatLayoutShell from "@/components/chat/ChatLayoutShell";

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
