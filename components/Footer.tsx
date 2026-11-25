import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { assets } from "@/data/assets";
import PaymentIcons from "./PaymentIcons";

type Shot = { src: StaticImageData; alt: string; className: string; position?: string };

/** Scattered editorial frames, positioned in % of the gallery width so the layout scales on every screen. */
const shots: Shot[] = [
  {
    src: assets.footerLounge,
    alt: "A woman in a charcoal knit seated in a leather lounge chair",
    className: "left-[3%] w-[11.5%] aspect-[6/5]",
    position: "60% 55%",
  },
  {
    src: assets.footerMono,
    alt: "Black and white portrait of a man in a dark knit sweater",
    className: "left-[27.5%] w-[23%] aspect-[7/8]",
    position: "50% 20%",
  },
  {
    src: assets.footerOlive,
    alt: "A woman in an olive cable-knit sweater on a leather sofa",
    className: "left-[51.5%] w-[11.2%] aspect-[4/5]",
    position: "40% 30%",
  },
  {
    src: assets.heroPortrait,
    alt: "A woman in a cream cable-knit sweater resting on a leather sofa",
    className: "left-[63.6%] w-[11.2%] aspect-square",
    position: "50% 30%",
  },
  {
    src: assets.footerMoody,
    alt: "A man in a black turtleneck sweater on a leather sofa",
    className: "left-[85.8%] w-[11.2%] aspect-[4/5]",
    position: "50% 30%",
  },
];

const links = [
  { label: "catalog", href: "/#catalog" },
  { label: "about us", href: "/#about" },
  { label: "delivery", href: "/#delivery" },
  { label: "contacts", href: "/#contacts" },
];

const social = [
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
        <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4Z" />
      </svg>
    ),
  },
];

const label = "text-[10px] tracking-[0.06em] uppercase md:text-[11px]";

export default function Footer() {
  return (
    <footer id="contacts" data-reveal="footer-editorial" className="frame mt-[var(--section)] overflow-hidden bg-white pt-[clamp(8px,1vw,16px)]">
      <div className="wrap">
        {/* Gallery: frames are absolutely placed inside a box whose height tracks the tallest frame. */}
        <div aria-hidden data-footer-line className="h-px origin-left bg-ink/25" />
        <div className="relative mt-[clamp(12px,1.4vw,20px)] aspect-[600/160]">
          {shots.map((shot) => (
            <div key={shot.alt} data-footer-shot className={`absolute top-0 overflow-hidden bg-surface ${shot.className}`}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1440px) 330px, 24vw"
                style={{ objectPosition: shot.position ?? "50% 50%" }}
                data-footer-shot-img
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-[clamp(28px,4.5vw,64px)]">
          <div className="flex justify-end">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-footer-label
              className={`${label} transition-opacity hover:opacity-55`}
            >
              (Write to us)
            </a>
          </div>

          <p data-footer-words className="mt-1 flex items-end justify-between leading-[0.82]">
            <span className="sr-only">ELVORA Knits</span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-footer-word aria-hidden className="block text-[clamp(48px,12.4vw,190px)] font-normal tracking-[-0.03em]">
                ELVORA
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span data-footer-word aria-hidden className="block text-[clamp(48px,12.4vw,190px)] font-normal tracking-[-0.03em]">
                KNITS
              </span>
            </span>
          </p>

          <div className="mt-[clamp(10px,1.2vw,16px)] grid grid-cols-3 items-start gap-4 text-muted">
            <p data-footer-label className={label}>
              Soft knitwear, made slowly
            </p>
            <p data-footer-label className={`${label} text-center`}>
              New collection 2026
            </p>
            <p data-footer-label className={`${label} text-right`}>
              ©2026
            </p>
          </div>
        </div>

        <div
          data-footer-label
          className="mt-[clamp(28px,4vw,56px)] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line py-4 text-[12px] text-muted md:justify-between"
        >
          <nav aria-label="Footer" className="hidden md:block">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-block py-1 transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-center gap-4">
            <ul className="flex items-center">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid size-9 place-items-center text-ink transition-opacity hover:opacity-55"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
