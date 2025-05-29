import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";

export default function LoginForm() {
  const onSubmit = (values) => {
    console.log("Login form submitted", values);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <Form className="container mt-5" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Login</h2>

      <FloatingLabel
        controlId="floatingEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.email && !!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.password && !!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
