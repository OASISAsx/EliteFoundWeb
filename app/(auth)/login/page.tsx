"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { registerUser } from "@/app/actions/signup-action";
import { motion } from "framer-motion";
import { useRegisterStore } from "@/stores/user.store";

import { Alert, AlertTitle, Button, Snackbar } from "@mui/material";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
} from "@mui/icons-material";

interface AlertState {
  open: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

export default function AuthPage() {
  const { register } = useRegisterStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const [alert, setAlert] = useState<AlertState>({
    open: false,
    type: "info",
    title: "",
    message: "",
  });
  const router = useRouter();

  const showAlert = (
    type: "success" | "error" | "info",
    title: string,
    message: string,
  ) => {
    setAlert({
      open: true,
      type,
      title,
      message,
    });
  };

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          console.error(result.error);
          showAlert("error", "Login Failed", result.error);
        } else {
          showAlert("success", "Welcome Back", "Initializing your session...");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      } else {
        const form = { name, email, password };

        try {
          const result = await register(form);

          console.log("Registration successful:", result);

          showAlert(
            "success",
            "Identity Established",
            "Your account has been created successfully. Please sign in now.",
          );

          setTimeout(() => {
            setIsLogin(true);
            setEmail("");
            setPassword("");
            setName("");
          }, 2000);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          showAlert("error", message, "Registration failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      showAlert("error", "System Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* Background Elements - Futuristic Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="text-center mb-8">
            <p className=" text-3xl font-bold dark:text-white/10  from-blue-400 to-purple-500 bg-clip-text  mb-2 tracking-tighter bg-linear-to-r">
              {isLogin ? "Login" : "Create Account"}
            </p>
            <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
              {isLogin
                ? "Enter your credentials to sync"
                : "Join the decentralized network"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="group">
                <label
                  className="block text-xs font-medium text-blue-400 uppercase tracking-widest mb-1 ml-1"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                />
              </div>
            )}

            <div className="group">
              <label
                className="block text-xs font-medium text-blue-400 uppercase tracking-widest mb-1 ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@nexus.com"
                className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label
                className="block text-xs font-medium text-blue-400 uppercase tracking-widest mb-1 ml-1"
                htmlFor="password"
              >
                Security Key
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="relative w-full  overflow-hidden bg-linear-to-r from-blue-600 to-blue-500 focus:outline-none"
            >
              <span className="text-white font-semibold tracking-wider uppercase">
                {isLoading ? (
                  <div className="h-5  bg-linear-to-r w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isLogin ? (
                  "Initialize Session"
                ) : (
                  "Establish Identity"
                )}
              </span>
            </Button>
          </form>

          {/* Switcher */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm pb-4 text-gray-500 hover:text-blue-400 transition-colors duration-300"
            >
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span className="text-blue-400 font-medium">
                    Register Access
                  </span>
                </>
              ) : (
                <>
                  Already have an identity?{" "}
                  <span className="text-blue-400 font-medium">Sign In</span>
                </>
              )}
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => signIn("google")}
            className="relative w-full  cursor-pointer overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-purple-600  focus:outline-none"
          >
            <motion.div
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
            />

            <div className="relative z-10 flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-white font-semibold">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                width={20}
                height={20}
              />
              Login with Google
            </div>
          </motion.button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex justify-center space-x-6 text-[10px] text-gray-600 uppercase tracking-[0.3em]">
          <span className="hover:text-blue-500 cursor-pointer transition-colors">
            Protocol v2.4.0
          </span>
          <span className="hover:text-blue-500 cursor-pointer transition-colors">
            Encrypted Link
          </span>
          <span className="hover:text-blue-500 cursor-pointer transition-colors">
            Secure Node
          </span>
        </div>
      </div>

      {/* MUI Snackbar with Custom Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
          },
        }}
      >
        <Alert
          onClose={closeAlert}
          severity={alert.type}
          icon={
            alert.type === "success" ? (
              <CheckCircleOutline sx={{ fontSize: 24 }} />
            ) : alert.type === "error" ? (
              <ErrorOutline sx={{ fontSize: 24 }} />
            ) : (
              <InfoOutlined sx={{ fontSize: 24 }} />
            )
          }
          sx={{
            backgroundColor:
              alert.type === "success"
                ? "rgba(16, 185, 129, 0.15)"
                : alert.type === "error"
                  ? "rgba(239, 68, 68, 0.15)"
                  : "rgba(59, 130, 246, 0.15)",
            border:
              alert.type === "success"
                ? "1px solid rgba(16, 185, 129, 0.5)"
                : alert.type === "error"
                  ? "1px solid rgba(239, 68, 68, 0.5)"
                  : "1px solid rgba(59, 130, 246, 0.5)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            color:
              alert.type === "success"
                ? "#10b981"
                : alert.type === "error"
                  ? "#ef4444"
                  : "#3b82f6",
            "& .MuiAlert-icon": {
              color:
                alert.type === "success"
                  ? "#10b981"
                  : alert.type === "error"
                    ? "#ef4444"
                    : "#3b82f6",
            },
            "& .MuiAlertTitle-root": {
              fontWeight: 600,
              fontSize: "16px",
              marginBottom: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            },
            padding: "16px 20px",
            minWidth: "320px",
            boxShadow:
              alert.type === "success"
                ? "0 0 20px rgba(16, 185, 129, 0.3)"
                : alert.type === "error"
                  ? "0 0 20px rgba(239, 68, 68, 0.3)"
                  : "0 0 20px rgba(59, 130, 246, 0.3)",
          }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
