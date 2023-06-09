import React, { useState, useEffect } from "react";
import "../components/css/Register.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    address: "",
    age: "",
  });

  const { email, password, password2, name, address, age } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      console.log("success");
      if (user.type === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not mach");
    } else {
      const userData = {
        email,
        password,
        name,
        address,
        age,
        //TODO: hardcoded type
        type: "patient",
      };

      dispatch(register(userData));
    }
  };

  return (
    <>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm password</label>
            <input
              type="password2"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={onChange}
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={onChange}
              placeholder="Enter your age"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
