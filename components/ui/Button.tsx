import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button — the brand's single-CTA-per-view affordance.
 * Tier-1 motion is pure CSS (hover lift + shadow swap, press scale) so the
 * button stays renderable on the server. Marigold CTA gains --shadow-gold.
 */

type Variant = "primary" | "secondary" | "ghost" | "platform";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold select-none " +
  "transition-[transform,box-shadow,background-color,color] duration-fast ease-brand " +
  "active:scale-[0.98] focus-visible:outline-none";

const sizes: Record<Size, string> = {
  md: "text-[0.95rem] px-5 py-2.5 min-h-[44px]",
  lg: "text-[1.05rem] px-7 py-3.5 min-h-[52px]",
};

const variants: Record<Variant, string> = {
  // The marigold spark. Ink-navy text clears AA (~7.7:1).
  primary:
    "rounded-full bg-marigold text-ink-navy shadow-sm hover:-translate-y-px " +
    "hover:bg-marigold-bright hover:shadow-gold active:bg-marigold-deep",
  // On a blue wall — quiet, white outline.
  secondary:
    "rounded-full border border-[rgba(255,255,255,0.45)] text-on-blue " +
    "hover:-translate-y-px hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.8)]",
  // Text link with the marigold spark underline.
  ghost: "spark-link font-semibold text-on-blue",
  // Listen platform button — bone/paper chip.
  platform:
    "rounded-full bg-paper text-ink border border-hairline px-5 py-2.5 min-h-[44px] " +
    "shadow-sm hover:-translate-y-px hover:shadow-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classesFor(variant: Variant, size: Size, extra = "") {
  const sizing = variant === "ghost" || variant === "platform" ? "" : sizes[size];
  return `${base} ${sizing} ${variants[variant]} ${extra}`.trim();
}

export function Button(props: AnchorProps | NativeProps) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const cls = classesFor(variant, size, className);

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }

  const { href: _h, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as NativeProps;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default Button;
