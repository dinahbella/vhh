import AuthLayout from "@/components/auth/layout";
import Form from "@/components/common/form";
import { RegisterFormControls } from "@/config";
import Link from "next/link";
import React, { useState } from "react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = () => {};
  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className=" text-3xl font-bold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mt-2 ">
            Already have an account?
            <Link
              className="text-primary font-bold ml-2 hover:underline"
              href={"/auth/login"}
            >
              Login
            </Link>
          </p>
        </div>
        <Form
          formControls={RegisterFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </AuthLayout>
  );
}
