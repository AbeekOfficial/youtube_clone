export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[1450px] mx-auto">{children}</div>;
}
