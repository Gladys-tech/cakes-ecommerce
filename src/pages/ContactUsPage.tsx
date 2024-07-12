
"use client";
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { usePathname } from 'next/navigation';

const ContactUsPage: React.FC = () => {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      alert('Message sent successfully');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph align="center">
        We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
      </Typography>
      <Typography variant="body2" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
        Current path:<span style={{ color: '#8B4513', fontSize: '1.5rem' }}>Home {pathname}</span>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'stretch' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                variant="outlined"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Your Phone"
                name="phone"
                variant="outlined"
                margin="normal"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Your Address"
                name="address"
                variant="outlined"
                margin="normal"
                value={formData.address}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Message"
                name="message"
                variant="outlined"
                multiline
                rows={6}
                margin="normal"
                value={formData.message}
                onChange={handleChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              className="global-button"
              sx={{
                color: 'white',
                marginTop: 2,
                width: '100%',
              }}
            >
              Send Message
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7601828257784!2d32.589436774175425!3d0.30930706403829433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbde935865c5b%3A0x78152f5337478fd2!2sKibuli%20Dipo!5e0!3m2!1sen!2sug!4v1685177970127!5m2!1sen!2sug"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUsPage;

