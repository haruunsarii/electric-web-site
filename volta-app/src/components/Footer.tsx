import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-on-primary-fixed w-full mt-xl border-t border-outline-variant dark:border-outline fade-in">
      <div className="max-w-container-max mx-auto px-gutter py-lg flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">
          VOLTA ELECTRIC
        </div>
        <div className="flex flex-wrap gap-md justify-center">
          <Link
            href="/kvkk"
            className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            KVKK
          </Link>
          <Link
            href="/garanti"
            className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            Garanti Koşulları
          </Link>
          <Link
            href="/teslimat"
            className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            Teslimat
          </Link>
          <Link
            href="/iade"
            className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:text-primary hover:opacity-80 transition-opacity cursor-pointer"
          >
            İade Politikası
          </Link>
        </div>
        <div className="font-body-sm text-body-sm text-on-surface-variant">
          © {new Date().getFullYear()} Volta Electric. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
