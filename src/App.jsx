import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import ExperienceCard from "./components/experience-card/ExperienceCard";
import SimpleGallery from "./components/gallery/SimpleGallery";

function App() {
  return (
    <>
      <Header />
      <ExperienceCard />
      <SimpleGallery
        galleryID="my-test-gallery"
        images={[
          {
            URL: "https://willfeldman.com/img/ig/1.jpg",
            width: 1080,
            height: 1080,
          },
          {
            URL: "https://willfeldman.com/img/ig/2.jpg",
            width: 320,
            height: 320,
          },
          {
            URL: "https://willfeldman.com/img/ig/3.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/4.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/5.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/6.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/7.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/8.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/9.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/10.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/11.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/12.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/13.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/14.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/15.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/16.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/17.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/18.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/19.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/20.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/21.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/22.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/23.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/24.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/25.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/26.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/27.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/28.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/29.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/30.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/31.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/32.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/33.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/34.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/35.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/36.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/37.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/38.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/39.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/40.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/41.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/42.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/43.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/44.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/45.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/46.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/47.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/48.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/49.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/50.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/51.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/52.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/53.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/54.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/55.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/56.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/57.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/58.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/59.jpg",
            width: 1080,
            height: 716,
          },
          {
            URL: "https://willfeldman.com/img/ig/60.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/61.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/62.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/63.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/64.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/65.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/66.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/67.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/68.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/69.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/70.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/71.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/72.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/73.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/74.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/75.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/76.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/77.jpg",
            width: 1080,
            height: 741,
          },
          {
            URL: "https://willfeldman.com/img/ig/78.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/79.jpg",
            width: 1080,
            height: 736,
          },
          {
            URL: "https://willfeldman.com/img/ig/80.jpg",
            width: 1080,
            height: 608,
          },
          {
            URL: "https://willfeldman.com/img/ig/81.jpg",
            width: 1080,
            height: 751,
          },
          {
            URL: "https://willfeldman.com/img/ig/82.jpg",
            width: 1080,
            height: 731,
          },
          {
            URL: "https://willfeldman.com/img/ig/83.jpg",
            width: 1080,
            height: 738,
          },
          {
            URL: "https://willfeldman.com/img/ig/84.jpg",
            width: 1080,
            height: 748,
          },
          {
            URL: "https://willfeldman.com/img/ig/85.jpg",
            width: 1080,
            height: 735,
          },
          {
            URL: "https://willfeldman.com/img/ig/86.jpg",
            width: 1080,
            height: 736,
          },
          {
            URL: "https://willfeldman.com/img/ig/87.jpg",
            width: 1080,
            height: 758,
          },
          {
            URL: "https://willfeldman.com/img/ig/88.jpg",
            width: 1080,
            height: 1350,
          },
          {
            URL: "https://willfeldman.com/img/ig/89.jpg",
            width: 1080,
            height: 733,
          },
          {
            URL: "https://willfeldman.com/img/ig/90.jpg",
            width: 1080,
            height: 737,
          },
          {
            URL: "https://willfeldman.com/img/ig/91.jpg",
            width: 1080,
            height: 773,
          },
          {
            URL: "https://willfeldman.com/img/ig/92.jpg",
            width: 1080,
            height: 743,
          },
          {
            URL: "https://willfeldman.com/img/ig/93.jpg",
            width: 1080,
            height: 739,
          },
          {
            URL: "https://willfeldman.com/img/ig/94.jpg",
            width: 1080,
            height: 745,
          },
          {
            URL: "https://willfeldman.com/img/ig/95.jpg",
            width: 1080,
            height: 1351,
          },
          {
            URL: "https://willfeldman.com/img/ig/96.jpg",
            width: 1080,
            height: 751,
          },
          {
            URL: "https://willfeldman.com/img/ig/97.jpg",
            width: 1080,
            height: 755,
          },
          {
            URL: "https://willfeldman.com/img/ig/98.jpg",
            width: 1080,
            height: 753,
          },
          {
            URL: "https://willfeldman.com/img/ig/99.jpg",
            width: 1080,
            height: 737,
          },
          {
            URL: "https://willfeldman.com/img/ig/100.jpg",
            width: 1080,
            height: 608,
          },
        ]}
      />
    </>
  );
}

export default App;
