import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import DraggableLangButton from "./components/DraggableLangButton";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ ต้อง await

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* <DraggableLangButton /> */}
      {children}
    </NextIntlClientProvider>
  );
}
