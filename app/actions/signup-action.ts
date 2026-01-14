// ไฟล์นี้ควรอยู่ที่: app/actions/signup.ts
"use server";

import axios from "axios";

interface SignupResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<SignupResponse> {
  try {
    // Validate input
    if (!email || !password || !name) {
      return {
        success: false,
        message: "Missing required fields",
        error: "Email, password, and name are required",
      };
    }

    // เรียก API endpoint ของคุณที่ /api/auth/signup
    const response = await axios.post(`${process.env.API_URL}/register`, {
      name,
      email,
      password,
    });

    return {
      success: true,
      message: "Registration successful",
      data: response.data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorData = axios.isAxiosError(error) ? error.response?.data : null;

    console.error("Registration error:", errorData || errorMessage);

    return {
      success: false,
      message: "Registration failed",
      error: errorData?.message || errorData?.error || errorMessage,
    };
  }
}
