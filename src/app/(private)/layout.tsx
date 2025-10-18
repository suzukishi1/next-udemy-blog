import PrivateHeader from "@/components/layouts/PrivateHeader";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <>
        <PrivateHeader />
        <div className="container mx-auto px-4 py-8">{children}</div>
      </>
    </div>
  );
}
