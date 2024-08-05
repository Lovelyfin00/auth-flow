import React, { useState } from "react";
import TextInput from "./components/TextInput";
import { BiErrorCircle } from "react-icons/bi";
import AuthRequests from "./services/requests";
import { useNavigate } from "react-router-dom";
import ModalLayout from "./components/ModalLayout";
import { FaCheck, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa6";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    emailaddress: "",
    phonenumber: "",
    role: 52,
    password: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    emailaddress: "",
    phonenumber: "",
    role: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name !== "repeatPassword") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setRepeatPassword(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    if (!formData.emailaddress) {
      newErrors.emailaddress = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailaddress)) {
      newErrors.emailaddress = "Must be a valid email address";
      isValid = false;
    }

    if (!formData.phonenumber) {
      newErrors.phonenumber = "Phone number is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = "Please repeat your password";
      isValid = false;
    } else if (formData.password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setSignupError("");

      try {
        const response = await AuthRequests.register({ ...formData });

        if (response.statusCode === 200) {
          setFormData({
            firstname: "",
            lastname: "",
            middlename: "",
            emailaddress: "",
            phonenumber: "",
            role: 52,
            password: "",
          });
          setRepeatPassword("");
          setIsModalOpen(true);
        } else {
          setSignupError("Registration failed. Please try again.");
        }
      } catch (error) {
        setSignupError(error.message || "An error occurred during registration.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Form is invalid. Please correct the errors.");
    }
  }

  return (
    <section className="bg-gradient-to-r from-primary-blue-40 to-primary-blue-60 px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create Your Account
        </h1>
        <form onSubmit={submitForm} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4 flex space-x-4">
            <TextInput
              type="text"
              labelText="First Name *"
              name="firstname"
              saveInputValue={handleChange}
              hasLabel={true}
              placeholder="First name"
              inputError={errors.firstname}
              icon={<FaUser className="text-gray-400" />}
            />
            <TextInput
              type="text"
              labelText="Last Name *"
              name="lastname"
              saveInputValue={handleChange}
              hasLabel={true}
              placeholder="Last name"
              inputError={errors.lastname}
              icon={<FaUser className="text-gray-400" />}
            />
          </div>
          <TextInput
            type="text"
            labelText="Middle Name"
            name="middlename"
            saveInputValue={handleChange}
            hasLabel={true}
            placeholder="Middle name (optional)"
            inputError={errors.middlename}
            icon={<FaUser className="text-gray-400" />}
          />
          <TextInput
            type="email"
            labelText="Email address *"
            name="emailaddress"
            saveInputValue={handleChange}
            hasLabel={true}
            placeholder="Email"
            inputError={errors.emailaddress}
            icon={<FaEnvelope className="text-gray-400" />}
          />
          <TextInput
            type="tel"
            name="phonenumber"
            labelText="Phone Number *"
            saveInputValue={handleChange}
            hasLabel={true}
            placeholder="Phone number"
            inputError={errors.phonenumber}
            icon={<FaPhone className="text-gray-400" />}
          />
          <TextInput
            type="password"
            labelText="Password *"
            name="password"
            saveInputValue={handleChange}
            hasLabel={true}
            placeholder="Password"
            inputError={errors.password}
            icon={<FaLock className="text-gray-400" />}
          />
          <TextInput
            type="password"
            name="repeatPassword"
            labelText="Confirm Password *"
            saveInputValue={handleChange}
            hasLabel={true}
            placeholder="Confirm password"
            inputError={errors.repeatPassword}
            icon={<FaLock className="text-gray-400" />}
          />
          {signupError && (
            <p className="text-red-500 text-xs italic mb-4">{signupError}</p>
          )}
          <button 
            disabled={isLoading} 
            className={`w-full mt-4 ${isLoading ? "bg-purple-300" : "bg-primary-blue-80 hover:bg-primary-blue-90"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300`} 
            type="submit"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <p className="text-center mt-4 text-sm">
            Already have an account? <a className="text-primary-blue-80 font-bold hover:underline" href="/signin">Sign In</a>
          </p>
        </form>
      </div>
      {isModalOpen && (
        <ModalLayout>
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <FaCheck className="text-5xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Account Created Successfully!</h2>
            <p className="mb-6">You can now sign in to your account.</p>
            <button 
              onClick={() => navigate("/signin")} 
              className="bg-primary-blue-80 text-white font-bold py-2 px-6 rounded-full hover:bg-primary-blue-90 transition duration-300"
            >
              Go to Sign In
            </button>
          </div>
        </ModalLayout>
      )}
    </section>
  );
};

export default Signup;