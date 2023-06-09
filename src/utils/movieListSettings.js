// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'black' }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: 'block', background: 'black' }}
//       onClick={onClick}
//     />
//   );
// }

export const browseSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,

  centerMode: true,
  centerPadding: '50px',
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: false,
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        centerMode: false,
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 650,
      settings: {
        centerMode: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
};

export const singleMenuSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,

  centerMode: true,
  centerPadding: '50px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: false,
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        centerMode: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 650,
      settings: {
        centerMode: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
};
