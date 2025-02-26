"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/globals.css";
import { Container } from "@mui/material";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:3001/auth/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => router.push("/login"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    router.push("/login");
  };

  return (
    <Container className="container">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
