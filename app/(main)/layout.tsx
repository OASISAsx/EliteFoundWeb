import BackgroundDark from "@/components/Background/BackgroundDark";
import Navbar from "@/components/Navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">{children}</main>
    </div>
  );
}
