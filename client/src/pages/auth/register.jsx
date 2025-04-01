import AuthLayout from "@/components/auth/layout";
import Form from "@/components/common/form";
import { RegisterFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

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
      await toast.promise(dispatch(registerUser(formData)).unwrap(), {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (err) => err?.message || "Registration failed",
      });
      router.push("/auth/login");
    } catch (error) {
      // Error is already handled by toast.promise
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
