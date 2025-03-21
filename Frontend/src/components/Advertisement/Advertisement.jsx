import React from "react";
import { Box, Card, CardMedia } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ads = [
  { id: 1, img:"/Images/offer1.png" },
  { id: 2, img: "/Images/offer2.png" },
  // { id: 3, img: "/pizzaimgs/mushroom.jpg" },
];
const Advertisement = () => {
    const settings = {
        dots: true, 
        infinite: true, 
        speed: 3000, 
        // slidesToShow: 1, 
        // slidesToScroll: 1, 
        autoplay: true, 
        autoplaySpeed: 2000, 
        arrows: false,
      };
    
      return (
        <Box sx={{ maxWidth: "100%", overflow: "hidden", mt: 2 }}>
  <Slider {...settings}>
    {ads.map((ad) => (
     <Card
     key={ad.id}
     sx={{
       borderRadius: 2,
       height: { xs: "40vw", sm: "40vw", md: "10vw", lg: "25vw" },
       p: 1, 
     }}
   >
     <CardMedia
       component="img"
       image={ad.img}
       alt={`Advertisement ${ad.id}`}
       sx={{
         width: "100%",
         objectFit: "fill",
         height: "100%",
         borderRadius: 2, // Ensure the image has some roundness
       }}
     />
   </Card>
   
    ))}
  </Slider>
</Box>
      );
};

export default Advertisement;
