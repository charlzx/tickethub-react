
import Header from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 min-h-screen">
        {children}
      </main>
    </>
  );
}
