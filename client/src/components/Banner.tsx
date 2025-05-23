/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { font, BannerStyle } from 'styles';

const Banner = () => {

    const bannerTexts: string[] = [

        "Welcome to Matalog",
        
    ];

    const subtexts: string[] = [
      "Catalog your favorite tracks",
      "Share your best songs",
      "Get your song stats",
      "Discover new music",
    ];

    
    const [curSubtextIndex, setCurSubtextIndex] = useState(0);


    function animateScroll(element:HTMLParagraphElement, duration = 1000) {
      const start = performance.now();

      function step(timestamp:number) {
        let progress = (timestamp - start) / duration;
        if (progress > 1) progress = 1;

        const translateY = (1 - progress) * 100; 
        const opacity = progress; 

        // Apply styles
        element.style.transform = `translateY(${translateY}%)`;
        element.style.opacity =  opacity + '';

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      // Initialize styles (if needed)
      element.style.transform = "translateY(100%)";
      element.style.opacity = "0";

      requestAnimationFrame(step);
    }


    useEffect(() => {
     const element = document.getElementById("banner-subtext") as HTMLParagraphElement;
    //  console.log(element);
      const interval = setInterval(() => {
        setCurSubtextIndex(
          (curSubtextIndex) => (curSubtextIndex + 1) % subtexts.length
        );
        animateScroll(element, 1000);
      }, 3000);
      return () => clearInterval(interval); // cleanup
    }, []);



  return (
    <div css={BannerStyle.self}>
      <div css={[BannerStyle.text, font.lubrifont]}>
        {" "}
        <span> {bannerTexts[0]} </span>
        <p id="banner-subtext" css={[BannerStyle.subtext, font.lubrifont]}>
          {" "}
          {subtexts[curSubtextIndex]}{" "}
        </p>
      </div>
    </div>
  );
}

export default Banner
