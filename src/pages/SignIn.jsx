import React, { useState } from "react";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import { BiErrorCircle } from "react-icons/bi";
import apiEndpoints from "../services/api";
import AuthRequests from "../services/requests";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signinError, setSigninError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailaddress: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSigninError("");

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.emailaddress) {
      newErrors.emailaddress = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailaddress)) {
      newErrors.emailaddress = "Must be a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setSigninError("");
  
      try {
        const response = await AuthRequests.signIn({ ...formData });
  
        if (response.statusCode === 200) {
          setFormData({
            emailaddress: "",
            password: "",
          });

          window.localStorage.setItem("token", response.token);
          navigate("/dashboard");
        } else {
          setSigninError("Login failed. Please try again.");
        }
      } catch (error) {
        const errorMessage = JSON.parse(error.message);

        if(errorMessage === "Invalid credentials"){
            setSigninError("Incorrect email address or password!");
        }else{
            setSigninError(errorMessage || "An error occurred during login.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  }

  return (
    <section className="bg-primary-blue-40 px-20 py-14 flex items-center min-h-screen justify-center">
      <div className="w-[80%] md:w-[70%] lg:w-[50%]">
        <h1 className=" text-white text-[24px] font-extrabold mb-2 text-center">
          Sign In
        </h1>
        <form onSubmit={submitForm}>
          <div className="rounded-xl bg-white px-6 py-6">
            <TextInput
              type="email"
              labelText="Email address *"
              name="emailaddress"
              saveInputValue={handleChange}
              hasLabel={true}
              placeholder="Enter email"
              inputError={errors.emailaddress}
            />
            <div className="mt-2">
              <TextInput
                type="password"
                labelText="Enter Password *"
                name="password"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Enter your password"
                inputError={errors.password}
              />
            </div>
            {
                signinError && (
                    <p className="text-red-600">{signinError}</p>
                )
            }
            <button disabled={isLoading} className={`${isLoading ? "bg-purple-300 text-white" : "bg-primary-blue-80 text-white"} px-4 py-2 rounded-lg w-full mt-2 mb-2`} type="submit">{isLoading ? "Signing In" : "Sign In"}</button>
              <p>Don't have an account, <a className="text-primary-blue-80 font-bold mt-6" href="/">Sign Up</a></p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;