import "@/styles/tailwind.css";
import "aos/dist/aos.css";
import { anuphan } from "@/lib/fonts";
import Providers from "@/components/providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export { metadata } from "@/lib/metadata";

export default ({ children }: Props) => (
  <html className="!scroll-smooth" lang="en">
    <body
      style={anuphan.style}
      className="min-h-screen w-full bg-gradient-to-br from-slate-200 to-white text-dark dark:from-zinc-950 dark:to-slate-900 dark:text-white"
    >
      <Providers>
        <Navbar />
        {children}
        <Footer />
      </Providers>

      <script data-host="https://a.webmash.io" data-dnt="false" src="https://a.webmash.io/js/script.js" id="ZwSg9rf6GA" async defer></script>
    </body>
  </html>
);

type Props = {
  children: React.ReactNode;
};
