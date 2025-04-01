import AuthLayout from "@/components/auth/layout";
import Form from "@/components/common/form";
import { RegisterFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await dispatch(registerUser(formData));
      const data = res.data;

      if (data?.success) {
        toast.success(data.message || "Registration successful!", {
          style: {
            background: "#4BB543", // Green
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4BB543",
          },
        });
        router.push("/auth/login");
      } else {
        toast.error(data?.message || "Registration failed", {
          style: {
            background: "#FF3333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#FF3333",
          },
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred",
        {
          style: {
            background: "#FF3333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#FF3333",
          },
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mt-2">
            Already have an account?
            <Link
              className="text-primary font-bold ml-2 hover:underline"
              href="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
        <Form
          formControls={RegisterFormControls}
          buttonText={isSubmitting ? "Creating account..." : "Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </AuthLayout>
  );
}
