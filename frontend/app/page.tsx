"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      router.push("/dashboard"); 
    }
  }, []);

  return (
    <div className="home-container">
      <div className="d-flex justify-content-center text-bg-primary">
          <div className="col-12 col-xl-9">
            <h2 className="h1 mb-4">Please select below Options to proceed further.</h2>
        </div>
        </div>
      <div className="buttons-container">
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/register-customer")}>Register as a Customer</button>
        <button onClick={() => router.push("/register-admin")}>Register as an Admin</button>
      </div>
      <style jsx>{`
        .home-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .background-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        .buttons-container {
          display: flex;
          gap: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 18px;
          cursor: pointer;
          border: none;
          background: #0070f3;
          color: white;
          border-radius: 5px;
          transition: 0.3s;
        }
        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}


// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./HomePage.module.css"; // Import CSS module

// export default function HomePage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("user-token");
//     if (token) {
//       router.push("/dashboard");
//     }
//   }, []);

//   return (
//     <div className={styles.homeContainer}>
//       <img src="/public/login-background.png" alt="Background" className={styles.backgroundImage} />
      
//       <div className="d-flex justify-content-center text-bg-primary">
//         <div className="col-12 col-xl-9">
//           <img className="img-fluid rounded mb-4" loading="lazy" src="/login-background.png" width="245" height="80" alt="BootstrapBrain Logo" />
//           <h2 className="h1 mb-4">We make digital products that drive you to stand out.</h2>
//           <p className="lead mb-5">We write words, take photos, make videos, and interact with artificial intelligence.</p>
//         </div>
//       </div>

//       <div className={styles.buttonsContainer}>
//         <button onClick={() => router.push("/login")}>Login</button>
//         <button onClick={() => router.push("/register-customer")}>Register as a Customer</button>
//         <button onClick={() => router.push("/register-admin")}>Register as an Admin</button>
//       </div>
//     </div>
//   );
// }
