import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const countryOptions = {
  India: {
    code: "+91",
    cities: ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Jaipur"],
  },
  USA: {
    code: "+1",
    cities: ["New York", "Los Angeles", "Chicago", "San Francisco", "Houston", "Boston"],
  },
  Canada: {
    code: "+1",
    cities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary"],
  },
  Australia: {
    code: "+61",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  },
};

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (data) => {
    const errs = {};

    if (!data.firstName.trim()) errs.firstName = "First name is required";
    if (!data.lastName.trim()) errs.lastName = "Last name is required";
    if (!data.username.trim()) errs.username = "Username is required";

    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Invalid email format";

    if (!data.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
      errs.password = "Must be 8+ chars, with upper, lower, number, special";

    if (!data.phoneNumber.match(/^\d{10}$/))
      errs.phoneNumber = "Must be a 10-digit number";

    if (!data.country) errs.country = "Country required";
    if (!data.city) errs.city = "City required";

    if (!data.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/))
      errs.pan = "Invalid PAN format";

    if (!data.aadhar.match(/^\d{12}$/))
      errs.aadhar = "Aadhar must be 12 digits";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    if (name === "country") {
      updatedData.city = "";
      updatedData.phoneCode = countryOptions[value].code || "";
    }

    setFormData(updatedData);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} noValidate>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} />
        {touched.firstName && errors.firstName && <span className="error">{errors.firstName}</span>}

        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} />
        {touched.lastName && errors.lastName && <span className="error">{errors.lastName}</span>}

        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} onBlur={handleBlur} />
        {touched.username && errors.username && <span className="error">{errors.username}</span>}

        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
        {touched.email && errors.email && <span className="error">{errors.email}</span>}

        <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
          <span className="toggle-text" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        {touched.password && errors.password && <span className="error">{errors.password}</span>}

        <div className="phone-input">
          <select name="country" value={formData.country} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select Country</option>
            {Object.keys(countryOptions).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <input name="phoneCode" value={formData.phoneCode} disabled />
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
        </div>
        {touched.phoneNumber && errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

        <select name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select City</option>
          {formData.country && countryOptions[formData.country].cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {touched.city && errors.city && <span className="error">{errors.city}</span>}

        <input name="pan" placeholder="PAN Number" value={formData.pan} onChange={handleChange} onBlur={handleBlur} />
        {touched.pan && errors.pan && <span className="error">{errors.pan}</span>}

        <input name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} onBlur={handleBlur} />
        {touched.aadhar && errors.aadhar && <span className="error">{errors.aadhar}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
