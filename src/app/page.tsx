import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { ProductDirectory } from "@/components/product-directory";
import { getDirectoryItems } from "@/lib/directory";

// Smith publishes new products into its index; pick them up within the hour.
export const revalidate = 3600;

const description =
  "Small, focused apps and web tools from SL Studio, in English and Korean. Each one does one job well.";

export const metadata: Metadata = {
  title: { absolute: "SL Studio · Small tools, one job each" },
  description,
  alternates: { canonical: "/" },
  openGraph: { description },
  twitter: { description },
};

export default async function Home() {
  const items = await getDirectoryItems();

  return (
    <main className="flex-1 w-full mx-auto max-w-6xl px-6 md:px-8 flex flex-col">
      <SiteHeader />

      <section className="pt-8 pb-12 md:pt-16 md:pb-16">
        <h1 className="animate-rise-in font-display text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl font-semibold tracking-tight">
          Small tools,
          <br />
          one job each.
        </h1>
        <p className="animate-rise-in [animation-delay:120ms] mt-8 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
          SL Studio makes apps and web tools that each solve one specific
          problem. Some are in English, some in Korean, and new ones show up
          here as they launch.
        </p>
      </section>

      <section
        id="products"
        aria-labelledby="products-heading"
        className="pb-16 md:pb-24 scroll-mt-24"
      >
        <h2
          id="products-heading"
          className="mb-6 font-display text-2xl font-semibold tracking-tight"
        >
          Products
        </h2>
        <ProductDirectory items={items} />
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-t border-border py-14 md:py-20 scroll-mt-24 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12"
      >
        <h2
          id="about-heading"
          className="font-display text-2xl md:text-3xl font-semibold tracking-tight leading-tight"
        >
          A small studio, not a startup.
        </h2>
        <p className="max-w-[62ch] text-ink-soft leading-relaxed">
          No outside funding and no growth roadmap. Every product here starts
          as one narrow problem, often one we ran into ourselves, and ships
          once it handles that problem well. Some are full apps built by hand
          over months; others are small web tools we research and launch
          quickly, and keep only if people find them useful.
        </p>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-border py-14 md:py-20 scroll-mt-24 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12"
      >
        <div>
          <h2
            id="contact-heading"
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight"
          >
            Get in touch
          </h2>
          <p className="mt-2 max-w-sm text-ink-soft leading-relaxed">
            Questions, feedback, or an idea for a tool you wish existed. This
            goes straight to us.
          </p>
        </div>
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
