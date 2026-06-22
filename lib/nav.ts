export const NAV_LINKS = [
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
] as const;

export function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
