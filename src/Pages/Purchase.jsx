import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useFormik } from "formik";
import {purchaseSchema} from "../schemas"


export default function PurchaseForm() {
  const onSubmit = (values) => {
    console.log("Purchase submitted", values);
    alert("Purchase submitted.");
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      zip: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema: purchaseSchema,
    onSubmit,
  });

  return (
    <Form className="container mt-5" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Purchase</h2>

      <FloatingLabel controlId="floatingFullName" label="Full Name" className="mb-3">
        <Form.Control
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.fullName && !!errors.fullName}
        />
        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.email && !!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel controlId="floatingAddress" label="Address" className="mb-3">
        <Form.Control
          name="address"
          type="text"
          placeholder="1234 Main St"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.address && !!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
      </FloatingLabel>

      <Row className="mb-3">
        <Col md={6}>
          <FloatingLabel controlId="floatingCity" label="City">
            <Form.Control
              name="city"
              type="text"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.city && !!errors.city}
            />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={6}>
          <FloatingLabel controlId="floatingZip" label="Zip">
            <Form.Control
              name="zip"
              type="text"
              placeholder="Zip"
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.zip && !!errors.zip}
            />
            <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel controlId="floatingCardNumber" label="Card Number" className="mb-3">
        <Form.Control
          name="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength={16}
          value={values.cardNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.cardNumber && !!errors.cardNumber}
        />
        <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
      </FloatingLabel>

      <Row className="mb-3">
        <Col md={6}>
          <FloatingLabel controlId="floatingExpiry" label="Expiration Date (MM/YY)">
            <Form.Control
              name="expiry"
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={values.expiry}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.expiry && !!errors.expiry}
            />
            <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>

        <Col md={6}>
          <FloatingLabel controlId="floatingCVV" label="CVV">
            <Form.Control
              name="cvv"
              type="text"
              placeholder="123"
              maxLength={3}
              value={values.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.cvv && !!errors.cvv}
            />
            <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="w-100">
        Complete Purchase
      </Button>
    </Form>
  );
}
