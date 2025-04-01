import AuthLayout from "@/components/auth/layout";
import Form from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { login } from "@/store/auth-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await dispatch(login(formData)).unwrap();
      if (res?.success) {
        toast.success(res.message || "Login successful!", {
          style: { background: "#4BB543", color: "#fff" },
          iconTheme: { primary: "#fff", secondary: "#4BB543" },
        });
        router.push("/");
      } else {
        throw new Error(res?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred", {
        style: { background: "#FF3333", color: "#fff" },
        iconTheme: { primary: "#fff", secondary: "#FF3333" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome Back!!
          </h1>
          <p className="mt-2">
            Don't have an account?
            <Link
              className="text-primary font-bold ml-2 hover:underline"
              href="/auth/register"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <Form
          formControls={LoginFormControls}
          buttonText={isSubmitting ? "Logging in..." : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </AuthLayout>
  );
}
