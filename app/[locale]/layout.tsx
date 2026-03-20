import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Navbar from "./components/NavBar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // ✅ ต้อง await

  const messages = await getMessages({ locale });
  // redirect("/en");
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* <DraggableLangButton /> */}
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}
