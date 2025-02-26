"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/globals.css";


export default function RegisterCustomer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3001/auth/register", {
        ...formData,
        role: "admin",
      });
      toast.success("Registration successful! Please check your email.");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4">Admin Registration</Typography>
      <TextField label="First Name" fullWidth margin="normal" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
      <TextField label="Last Name" fullWidth margin="normal" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
      <TextField label="Email" fullWidth margin="normal" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <TextField label="Password" fullWidth margin="normal" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
      <Button variant="contained" color="secondary" sx={{marginTop: '25px'}} onClick={() => {
                window.location.href = "/";
            }}>Back To home </Button>
    </Container>
  );
}
