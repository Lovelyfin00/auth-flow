import React, { useState } from "react";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import { BiErrorCircle } from "react-icons/bi";
import apiEndpoints from "../services/api";
import AuthRequests from "../services/requests";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../components/ModalLayout";
import { FaCheck } from "react-icons/fa6";

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
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name !== "repeatPassword"){
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  
    }else{
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
    setIsModalOpen(true);

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
            role: 0,
            password: "",
            repeatPassword: ""
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
    <section className="bg-primary-blue-40 px-20 py-14 flex items-center min-h-screen justify-center">
      <div className="w-[80%] md:w-[70%] lg:w-[50%]">
        <h1 className=" text-[24px] font-bold mb-2 text-center text-white">
          Sign Up
        </h1>
        <form onSubmit={submitForm}>
          <div className="rounded-xl bg-white px-6 py-6">
            <div className="mb-4">
              <TextInput
                type="text"
                labelText="First Name *"
                name="firstname"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Enter your first name"
                inputError={errors.firstname}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="text"
                labelText="Last Name *"
                name="lastname"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Enter your last name"
                inputError={errors.lastname}
              />
            </div>
            <div className="mb-4">
              <TextInput
                type="text"
                labelText="Middle Name"
                name="middlename"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Enter your middle name"
                inputError={errors.middlename}
              />
            </div>
            <TextInput
              type="email"
              labelText="Email address *"
              name="emailaddress"
              saveInputValue={handleChange}
              hasLabel={true}
              placeholder="Enter email"
              inputError={errors.emailaddress}
            />
            <div className="mt-4">
              <TextInput
                type="tel"
                name="phonenumber"
                labelText="Phone Number *"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Enter your phone number"
                inputError={errors.phonenumber}
              />
            </div>
            <div className="mt-4">
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
            <div className="mt-4">
              <TextInput
                type="password"
                name="repeatPassword"
                labelText="Repeat Password *"
                saveInputValue={handleChange}
                hasLabel={true}
                placeholder="Repeat your password"
                inputError={errors.repeatPassword}
              />
            </div>
            <button disabled={isLoading} className={`${isLoading ? " bg-purple-300 text-white" : "bg-primary-blue-80 text-white"} px-4 py-2 rounded-lg w-full mt-6 mb-2`} type="submit">{isLoading ? "Submitting" : "Submit"}</button>
              <p>Already have an account, <a className="text-primary-blue-80 font-bold mt-6" href="/signin">Sign In</a></p>
          </div>
        </form>
        {
          isModalOpen && (
            <ModalLayout>
              <section className="flex justify-center items-center">
                <div className="">
                  <div className="flex justify-center">
                    <FaCheck className="text-[40px] text-primary-blue-100" />
                  </div>
                  <div className="text-center">
                    <p className="text-center">Account created successfully</p>
                    <button onClick={() => navigate("/signin")} className="border border-primary-blue-100 text-center px-6 py-2 rounded-xl mt-4">Go to Signin</button>
                  </div>
                </div>
              </section>
            </ModalLayout>
          )
        }
      </div>
    </section>
  );
};

export default Signup;