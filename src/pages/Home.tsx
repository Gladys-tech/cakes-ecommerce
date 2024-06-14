
"use client"; // Ensure this is at the top
import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const images = [
  '/images/cake21.png', 
  '/images/cake22.png',
  '/images/cake23.png'
];

const slideContent = [
  {
    title: 'Welcome to Our Bakery',
    description: 'Delicious cakes and pastries made with love and care.',
    buttonText: 'Shop Now'
  },
  {
    title: 'Discover Our Specialties',
    description: 'Indulge in a variety of mouthwatering treats crafted by our expert bakers.',
    buttonText: 'Explore'
  },
  {
    title: 'Join a Sweet Experience',
    description: 'Experience the joy of heavenly desserts that delight your taste buds.',
    buttonText: 'Learn More'
  }
];

const Home: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next)
  };

  const slideBorderRadius = ['2px 80px', '100px 100px 0px 0px', '12px'];


  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={`slide-${index}`}
            sx={{ width: '100%', height: '100vh', objectFit: 'cover' }}
          />
        ))}
      </Slider>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(139, 69, 19, 0.5)', // Brown color with opacity
          color: '#050e3c',
          padding: 4,
          maxWidth: '350px',
          maxHeight: '500px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: isSmallScreen ? 2 : 4,
          borderRadius: slideBorderRadius[currentSlide], 
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', // Box shadow
          zIndex: 1 // Ensure box is above slider
        }}
      >
        <Typography variant="h2" gutterBottom>
          {slideContent[currentSlide].title}
        </Typography>
        <Typography variant="body1" paragraph>
          {slideContent[currentSlide].description}
        </Typography>
        <Button variant="contained" className="global-button">
          {slideContent[currentSlide].buttonText}
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <NavigateBeforeIcon
            sx={{ cursor: 'pointer', marginRight: 1, color: 'white' }}
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          />
          {[...Array(images.length)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentSlide === index ? 'rgba(139, 69, 19, 1)' : 'white', 
                marginRight: 1,
                cursor: 'pointer'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
          <NavigateNextIcon
            sx={{ cursor: 'pointer', marginLeft: 1, color: 'white' }}
            onClick={() => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
