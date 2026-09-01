import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Numbers from "./components/Numbers/Numbers.jsx";
import Audience from "./components/Audience/Audience.jsx";
import Demographics from "./components/Demographics/Demographics.jsx";
import RegionalMarkets from "./components/RegionalMarkets/RegionalMarkets.jsx";
import Defines from "./components/Defines/Defines.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Formats from "./components/Formats/Formats.jsx";
import Why from "./components/Why/Why.jsx";
import ContactCta from "./components/ContactCta/ContactCta.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Formats />
        <Numbers />
        <Audience />
        <Demographics />
        <RegionalMarkets />
        <Defines />
        <Categories />
        <Why />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
