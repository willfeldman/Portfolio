import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "./SimpleGallery.css";

export default function SimpleGallery(props) {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + props.galleryID + " a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  return (
    <div className="pswp-gallery" id={props.galleryID}>
      {props.images.map((image, index) => (
        <a
          href={image.URL}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={props.galleryID + "-" + index}
          target="_blank"
          rel="noreferrer"
        >
          <img src={image.URL} className="pswp-thumnail" alt="" />
        </a>
      ))}
    </div>
  );
}

/* 

PUT THIS IN App.jsx FOR GALLERY

<SimpleGallery
  galleryID="my-test-gallery"
  images={[
    {
      URL: "https://willfeldman.com/img/ig/1.webp",
      width: 1080,
      height: 1080,
    },
    {
      URL: "https://willfeldman.com/img/ig/2.webp",
      width: 320,
      height: 320,
    },
    {
      URL: "https://willfeldman.com/img/ig/3.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/4.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/5.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/6.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/7.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/8.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/9.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/10.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/11.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/12.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/13.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/14.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/15.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/16.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/17.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/18.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/19.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/20.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/21.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/22.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/23.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/24.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/25.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/26.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/27.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/28.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/29.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/30.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/31.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/32.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/33.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/34.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/35.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/36.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/37.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/38.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/39.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/40.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/41.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/42.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/43.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/44.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/45.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/46.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/47.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/48.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/49.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/50.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/51.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/52.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/53.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/54.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/55.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/56.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/57.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/58.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/59.webp",
      width: 1080,
      height: 716,
    },
    {
      URL: "https://willfeldman.com/img/ig/60.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/61.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/62.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/63.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/64.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/65.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/66.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/67.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/68.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/69.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/70.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/71.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/72.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/73.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/74.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/75.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/76.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/77.webp",
      width: 1080,
      height: 741,
    },
    {
      URL: "https://willfeldman.com/img/ig/78.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/79.webp",
      width: 1080,
      height: 736,
    },
    {
      URL: "https://willfeldman.com/img/ig/80.webp",
      width: 1080,
      height: 608,
    },
    {
      URL: "https://willfeldman.com/img/ig/81.webp",
      width: 1080,
      height: 751,
    },
    {
      URL: "https://willfeldman.com/img/ig/82.webp",
      width: 1080,
      height: 731,
    },
    {
      URL: "https://willfeldman.com/img/ig/83.webp",
      width: 1080,
      height: 738,
    },
    {
      URL: "https://willfeldman.com/img/ig/84.webp",
      width: 1080,
      height: 748,
    },
    {
      URL: "https://willfeldman.com/img/ig/85.webp",
      width: 1080,
      height: 735,
    },
    {
      URL: "https://willfeldman.com/img/ig/86.webp",
      width: 1080,
      height: 736,
    },
    {
      URL: "https://willfeldman.com/img/ig/87.webp",
      width: 1080,
      height: 758,
    },
    {
      URL: "https://willfeldman.com/img/ig/88.webp",
      width: 1080,
      height: 1350,
    },
    {
      URL: "https://willfeldman.com/img/ig/89.webp",
      width: 1080,
      height: 733,
    },
    {
      URL: "https://willfeldman.com/img/ig/90.webp",
      width: 1080,
      height: 737,
    },
    {
      URL: "https://willfeldman.com/img/ig/91.webp",
      width: 1080,
      height: 773,
    },
    {
      URL: "https://willfeldman.com/img/ig/92.webp",
      width: 1080,
      height: 743,
    },
    {
      URL: "https://willfeldman.com/img/ig/93.webp",
      width: 1080,
      height: 739,
    },
    {
      URL: "https://willfeldman.com/img/ig/94.webp",
      width: 1080,
      height: 745,
    },
    {
      URL: "https://willfeldman.com/img/ig/95.webp",
      width: 1080,
      height: 1351,
    },
    {
      URL: "https://willfeldman.com/img/ig/96.webp",
      width: 1080,
      height: 751,
    },
    {
      URL: "https://willfeldman.com/img/ig/97.webp",
      width: 1080,
      height: 755,
    },
    {
      URL: "https://willfeldman.com/img/ig/98.webp",
      width: 1080,
      height: 753,
    },
    {
      URL: "https://willfeldman.com/img/ig/99.webp",
      width: 1080,
      height: 737,
    },
    {
      URL: "https://willfeldman.com/img/ig/100.webp",
      width: 1080,
      height: 608,
    },
  ]}
/>;

*/
