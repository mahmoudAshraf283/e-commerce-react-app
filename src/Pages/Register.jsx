import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

export default function Register() {
  const onSubmit = (values) => {
    console.log("Form Submitted", values);
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <Form className="container mt-5" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Register</h2>

      <Row className="mb-3">
        <Col>
          <FloatingLabel controlId="floatingFirstName" label="First Name">
            <Form.Control
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="First Name"
              isInvalid={touched.firstName && !!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col>
          <FloatingLabel controlId="floatingLastName" label="Last Name">
            <Form.Control
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Last Name"
              isInvalid={touched.lastName && !!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel
        controlId="floatingEmail"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="name@example.com"
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
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Password"
          isInvalid={touched.password && !!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingConfirmPassword"
        label="Confirm Password"
        className="mb-3"
      >
        <Form.Control
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Confirm Password"
          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}
