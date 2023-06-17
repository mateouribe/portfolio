import { BrowserRouter } from "react-router-dom";
import LoadingProvider from "./context/LoadingProvider";
import { Hero, About, Projects, Contact, Footer, Cursor } from "./components";
import useLocoScroll from "./hooks/useLocoScroll";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function App() {
  useLocoScroll(true);
  return (
    <BrowserRouter>
      <LoadingProvider>
        <div className="App" data-scroll-container>
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
          <Cursor />
        </div>
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
