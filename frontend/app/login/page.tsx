
"use client";
import { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/globals.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);
    try {
      const response = await axios.post("http://localhost:3001/auth/login", formData);
      toast.success("Login successful!");
      localStorage.setItem("user-token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    // <Container className="container">
    //   <Typography variant="h3">Login</Typography>
    //   {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    //   <TextField className="textfield" label="Email" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
    //   <TextField className="textfield" label="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
    //   <Button onClick={handleSubmit}>Login</Button>
    // </Container>

        <Container className="container">
            <Typography variant="h3">Login</Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField label="Email" fullWidth margin="normal" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <TextField label="Password" fullWidth margin="normal" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Login</Button>
            <Button variant="contained" color="secondary" sx={{marginTop: '25px'}} onClick={() => {
                window.location.href = "/";
            }}>Back To home </Button>

        </Container>
  );
}
