import AuthLayout from "@/components/auth/layout";
import Form from "@/components/common/form";
import { LoginFormControls, RegisterFormControls } from "@/config";
import Link from "next/link";
import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = () => {};
  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className=" text-3xl font-bold tracking-tight text-foreground">
            Welcome Back!!
          </h1>
          <p className="mt-2 ">
            Don't have an account?
            <Link
              className="text-primary font-bold ml-2 hover:underline"
              href={"/auth/register"}
            >
              Sign Up
            </Link>
          </p>
        </div>
        <Form
          formControls={LoginFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </AuthLayout>
  );
}
