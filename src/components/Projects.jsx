import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { Back, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import pagoTienda from "../assets/images/pagoTienda.svg";
import pagoTiendaMobile from "../assets/images/pagoTiendaMobile.svg";
import ggCulture from "../assets/images/ggCulture.svg";
import artPortfolio from "../assets/images/artPortfolio.svg";
import shape1 from "../assets/images/shape1.png";
import shape2 from "../assets/images/shape2.png";
import shape3 from "../assets/images/shape3.png";
import shape4 from "../assets/images/shape4.png";
import shape7 from "../assets/images/shape7.png";
import SplitText from "../utils/Split3.min.js";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const cursorRef = useRef();
  const containerRef = useRef();
  const pagoTiendaCategoryRef = useRef();
  const pagoTiendaDescription = useRef();

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ctx = gsap.context(() => {
      //Title
      const tl = gsap.timeline();

      //Split text
      //Pago Tienda
      const pagoTiendaCategory = new SplitText("#pago-tienda-category", {
        type: "lines",
      });
      const pagoTiendaCategoryParent = new SplitText("#pago-tienda-category", {
        type: "lines",
        linesClass: "lineParent",
      });
      const pagoTiendaDescription = new SplitText("#pago-tienda-description", {
        type: "lines",
      });
      const pagoTiendaDescriptionParent = new SplitText(
        "#pago-tienda-description",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );

      //Pago Tienda Mobile
      const pagoTiendaMobileCategory = new SplitText(
        "#pago-tienda-mobile-category",
        {
          type: "lines",
        }
      );
      const pagoTiendaMobileCategoryParent = new SplitText(
        "#pago-tienda-mobile-category",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );
      const pagoTiendaMobileDescription = new SplitText(
        "#pago-tienda-mobile-description",
        {
          type: "lines",
        }
      );
      const pagoTiendaMobileDescriptionParent = new SplitText(
        "#pago-tienda-mobile-description",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );

      //Art Portfolio
      const artPortfolioCategory = new SplitText("#art-portfolio-category", {
        type: "lines",
      });
      const artPortfolioCategoryParent = new SplitText(
        "#art-portfolio-category",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );
      const artPortfolioDescription = new SplitText(
        "#art-portfolio-description",
        {
          type: "lines",
        }
      );
      const artPortfolioDescriptionParent = new SplitText(
        "#art-portfolio-description",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );

      //Art Portfolio
      const ggCultureCategory = new SplitText("#gg-culture-category", {
        type: "lines",
      });
      const ggCultureCategoryParent = new SplitText("#gg-culture-category", {
        type: "lines",
        linesClass: "lineParent",
      });
      const ggCultureDescription = new SplitText("#gg-culture-description", {
        type: "lines",
      });
      const ggCultureDescriptionParent = new SplitText(
        "#gg-culture-description",
        {
          type: "lines",
          linesClass: "lineParent",
        }
      );

      //Pago Tienda Animations
      //Category
      gsap.fromTo(
        pagoTiendaCategory.lines,
        {
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: "#pago-tienda-container",
            start: "top 50%",
          },
          y: 0,
          duration: 1,
          ease: "Power2.easeOut",
        }
      );

      //Description
      gsap.fromTo(
        pagoTiendaDescription.lines,
        {
          y: 200,
        },
        {
          scrollTrigger: {
            trigger: "#pago-tienda-container",
            start: "top 40%",
          },
          y: 0,
          opacity: 0.5,
          duration: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Pago Tienda Mobile Animations
      //Category
      gsap.fromTo(
        pagoTiendaMobileCategory.lines,
        {
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: "#pago-tienda-mobile-container",
            start: "top 30%",
          },
          y: 0,
          duration: 1,
          ease: "Power2.easeOut",
        }
      );

      //Description
      gsap.fromTo(
        pagoTiendaMobileDescription.lines,
        {
          y: 200,
        },
        {
          scrollTrigger: {
            trigger: "#pago-tienda-mobile-container",
            start: "top 20%",
          },
          y: 0,
          opacity: 0.5,
          duration: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Art Portfolio Animations
      //Category
      gsap.fromTo(
        artPortfolioCategory.lines,
        {
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: "#art-portfolio-container",
            start: "top 30%",
          },
          y: 0,
          duration: 1,
          ease: "Power2.easeOut",
        }
      );

      //Description
      gsap.fromTo(
        artPortfolioDescription.lines,
        {
          y: 200,
        },
        {
          scrollTrigger: {
            trigger: "#art-portfolio-container",
            start: "top 20%",
          },
          y: 0,
          opacity: 0.5,
          duration: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Art Portfolio Animations
      //Category
      gsap.fromTo(
        ggCultureCategory.lines,
        {
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: "#gg-culture-container",
            start: "top 30%",
          },
          y: 0,
          duration: 1,
          ease: "Power2.easeOut",
        }
      );

      //Description
      gsap.fromTo(
        ggCultureDescription.lines,
        {
          y: 200,
        },
        {
          scrollTrigger: {
            trigger: "#gg-culture-container",
            start: "top 20%",
          },
          y: 0,
          opacity: 0.5,
          duration: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Background color animation
      gsap.to(containerRef.current, {
        immediateRender: false,
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: "#pago-tienda-mobile-container",
          start: "top bottom",
          end: "+=100%",
          scrub: true,
        },
      });

      gsap.to(containerRef.current, {
        immediateRender: false,
        backgroundColor: "#FF730D",
        scrollTrigger: {
          trigger: "#art-portfolio-container",
          start: "top bottom",
          end: "+=100%",
          scrub: true,
        },
      });

      gsap.to(containerRef.current, {
        immediateRender: false,
        backgroundColor: "#F1F1F0",
        scrollTrigger: {
          trigger: "#gg-culture-container",
          start: "top bottom",
          end: "+=100%",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleOnMouseEnterImage = (e) => {
    gsap.to(e.target, {
      skewX: "0deg",
      duration: 0.5,
      ease: Back.easeOut.config(4),
    });
  };

  const handleOnMouseLeaveImage = (e, deg) => {
    gsap.to(e.target, {
      skewX: `${deg}deg`,
      duration: 0.5,
      ease: Back.easeOut.config(4),
    });
  };

  const onMouseEnterMarquee = (e) => {
    gsap.to(e.target, {
      skewX: "10deg",
      ease: Back.easeOut.config(1.7),
    });
  };

  const onMouseLeaveMarquee = (e) => {
    gsap.to(e.target, {
      skewX: "0",
      ease: Back.easeOut.config(1.7),
    });
  };
  return (
    <section
      className="w-full bg-white h-full"
      id="projects"
      data-scroll-section
      ref={containerRef}
    >
      {/* Marquee */}
      <div
        className="marquee flex overflow-hidden h-[40vh] select-none gap-[0.2rem] pt-[5rem] pb-[5rem]"
        onMouseEnter={(e) => onMouseEnterMarquee(e)}
        onMouseLeave={(e) => onMouseLeaveMarquee(e)}
        data-scroll
        data-scroll-speed="2"
      >
        <div className="marquee-group flex-shrink-0 flex items-center justify-between gap-[0.2rem] min-w-full">
          <span className="">
            My projects<span>✢</span>
          </span>
          <span className="">
            My projects<span>✢</span>
          </span>
          <span className="">
            My projects<span>✢</span>
          </span>
        </div>
        <div
          className="marquee-group flex-shrink-0 flex items-center justify-between gap-[0.2rem] min-w-full"
          aria-hidden={true}
        >
          <span className="">
            My projects<span>✢</span>
          </span>
          <span className="">
            My projects<span>✢</span>
          </span>
          <span className="">
            My projects<span>✢</span>
          </span>
        </div>
      </div>

      {/* Projects */}
      <section
        className={`w-full ${styles.padding} flex flex-col gap-[30vh] relative`}
      >
        {/*Pago tienda web*/}
        <div
          className="w-full flex flex-col md:flex-row items-stretch gap-[50px] md:gap-0 relative"
          id="pago-tienda-container"
        >
          {/* Description */}
          <div
            className="w-full md:w-[30%] flex flex-col justify-center  md:justify-end items-start"
            data-scroll
            data-scroll-speed="0.5"
          >
            <h4 className="text-sm text-main" id="pago-tienda-category">
              Technologies
            </h4>
            <p
              className="text-[4vw] text-lightGray description font-medium leading-[113.5%]"
              id="pago-tienda-description"
            >
              React JS
              <br />
              Tailwind CSS
              <br />
              Figma
            </p>
          </div>

          {/* Images */}
          <div className="w-full md:w-[70%] h-full flex items-end justify-center relative">
            <img
              src={pagoTienda}
              alt="Webiste desgin for Pago Tienda"
              style={{ transform: "skewX(2deg)" }}
              onMouseEnter={(e) => handleOnMouseEnterImage(e)}
              onMouseLeave={(e) => handleOnMouseLeaveImage(e, 2)}
              // onClick={() => handleModalOpen("pagoTienda")}
              className="view cursorBig"
            />
            <img
              src={shape1}
              alt="Floating UFO Svg"
              data-scroll
              data-scroll-speed="3"
              className="absolute -left-10 bottom-1/2 rotate-6"
            />
          </div>
        </div>

        {/*Pago tienda mobile*/}
        <div
          className="w-full flex flex-col md:flex-row items-stretch gap-[50px] md:gap-0 relative"
          id="pago-tienda-mobile-container"
        >
          {/* Image */}
          <div className="w-full md:w-[30%] flex items-end justify-center relative">
            <img
              src={pagoTiendaMobile}
              alt="Webiste desgin for Pago Tienda"
              style={{ transform: "SkewX(-2deg)" }}
              onMouseEnter={(e) => handleOnMouseEnterImage(e)}
              onMouseLeave={(e) => handleOnMouseLeaveImage(e, -2)}
              className="view cursorBig"
            />
            <img
              src={shape3}
              alt="Floating UFO Svg"
              data-scroll
              data-scroll-speed="3"
              className="absolute md-right-[35%] -bottom-1/4 -rotate-45 left-20"
            />
          </div>

          {/* Description */}
          <div className="w-full md:w-[70%] flex flex-col justify-end items-end">
            <h4
              className="text-sm text-main category font-light"
              id="pago-tienda-mobile-category"
            >
              Website
            </h4>
            <p
              className="text-[4vw] text-lightGray description font-medium leading-[125%]"
              id="pago-tienda-mobile-description"
            >
              Pago Tienda
            </p>
          </div>
          <img
            src={shape2}
            alt="Floating UFO Svg"
            data-scroll
            data-scroll-speed="6"
            className="absolute md:right-1/4 md:bottom-10 rotate-[120deg] -top-1/3"
          />
        </div>

        {/* Art Portfolio*/}
        <div
          className="w-full flex flex-col md:flex-row items-stretch gap-[50px] md:gap-0 relative"
          id="art-portfolio-container"
        >
          {/* Description */}
          <div className="w-full md:w-[30%] flex flex-col justify-center  md:justify-end items-start ">
            <h4
              className="text-sm text-white category font-light"
              id="art-portfolio-category"
            >
              Soon...
            </h4>
            <p
              className="text-[4vw] text-lightGray description font-medium leading-[125%]"
              id="art-portfolio-description"
            >
              Figma Design
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-[70%] h-full flex items-end justify-center relative">
            <img
              src={artPortfolio}
              alt="Webiste desgin for Pago Tienda"
              style={{ transform: "SkewX(2deg)" }}
              onMouseEnter={(e) => handleOnMouseEnterImage(e)}
              onMouseLeave={(e) => handleOnMouseLeaveImage(e, 2)}
              className="view cursorBig"
            />
            <img
              src={shape4}
              alt="Floating UFO Svg"
              data-scroll
              data-scroll-speed="6"
              className="absolute -left-[0] bottom-1/4 rotate-45"
            />
          </div>
        </div>

        {/*Gg Culture*/}
        <div
          className="w-full flex flex-col md:flex-row items-stretch gap-[50px] md:gap-0 relative"
          id="gg-culture-container"
        >
          {/* Description */}
          <div className="w-full md:w-[30%] flex flex-col justify-center  md:justify-end items-end md:order-2">
            <h4
              className="text-sm text-main category font-light"
              id="gg-culture-category"
            >
              Soon...
            </h4>
            <p
              className="text-[4vw] text-lightGray description font-medium leading-[113.5%] text-right"
              id="gg-culture-description"
            >
              React JS
              <br />
              Tailwind CSS
              <br />
              Firebase
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-[70%] h-full flex items-end justify-center md:order-1">
            <img
              src={ggCulture}
              alt="Webiste desgin for Pago Tienda"
              style={{ transform: "SkewX(-2deg)" }}
              onMouseEnter={(e) => handleOnMouseEnterImage(e)}
              onMouseLeave={(e) => handleOnMouseLeaveImage(e, -2)}
              className="view cursorBig"
            />
          </div>
          <img
            src={shape7}
            alt="Floating UFO Svg"
            data-scroll
            data-scroll-speed="3"
            className="absolute right-0 top-0 rotate-45"
          />
        </div>
      </section>
    </section>
  );
};

export default Projects;
