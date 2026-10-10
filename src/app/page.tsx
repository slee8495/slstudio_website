import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { StudioShell } from "@/components/studio/studio-shell";
import { ProductDirectory } from "@/components/studio/product-directory";
import { getDirectoryItems } from "@/lib/directory";

// Smith publishes new products into its index; pick them up within the hour.
export const revalidate = 3600;

const description = "SL Studio builds and operates software products.";

export const metadata: Metadata = {
  title: { absolute: "SL Studio" },
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "SL Studio", description },
  twitter: { title: "SL Studio", description },
};

function SectionHeading({
  id,
  title,
  meta,
}: {
  id: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-6 flex items-baseline justify-between gap-4">
      <h2 id={id} className="text-[15px] font-medium text-ink">
        {title}
      </h2>
      {meta && <span className="font-mono text-xs text-ink-faint">{meta}</span>}
    </div>
  );
}

export default async function Home() {
  const items = await getDirectoryItems();

  return (
    <StudioShell>
      <section className="pt-16 pb-14 md:pt-24 md:pb-20">
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink md:text-5xl">
          SL Studio
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          SL Studio builds and operates software products.
        </p>
      </section>

      <section
        id="products"
        aria-labelledby="products-heading"
        className="scroll-mt-20 border-t border-border py-14 md:py-16"
      >
        <SectionHeading
          id="products-heading"
          title="Products"
          meta={`${items.length} total`}
        />
        <ProductDirectory items={items} />
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="scroll-mt-20 grid grid-cols-1 gap-4 border-t border-border py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-16"
      >
        <h2 id="about-heading" className="text-[15px] font-medium text-ink">
          About
        </h2>
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-soft">
          SL Studio is an independent software studio. Its products are built
          and maintained by a small team using automated tooling.
        </p>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-20 grid grid-cols-1 gap-6 border-t border-border py-14 md:grid-cols-[1fr_2fr] md:gap-12 md:py-16"
      >
        <div>
          <h2 id="contact-heading" className="text-[15px] font-medium text-ink">
            Contact
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-[15px] leading-relaxed text-ink-soft">
            Email{" "}
            <a
              href="mailto:support@sl-studio.dev"
              className="text-ink underline decoration-border-strong underline-offset-4 hover:decoration-ink"
            >
              support@sl-studio.dev
            </a>{" "}
            or use the form below.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </StudioShell>
  );
}
