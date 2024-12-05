import axios from "axios";
import { useState, useEffect } from "react";

function Register() {

    const [step, setStep] = useState(1); // Step tracker

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompEmail] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [userName,setUserName] = useState("");
    const [role,setRole] = useState("");
    const [password, setPassWord] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("");
    const [companyUserEmail, setCompanyUserEmail] = useState("")
    const [confirmPassword, setConfirmPassWord] = useState("")

    // setting up some validations
    const [userError, setError] = useState("");
    const [passwordError, setPassWordError] = useState();

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
      };
    
      const handleBack = () => {
        setStep((prevStep) => prevStep - 1);
      };

      const validateStep1 = () => {
            if (!companyName || !companyEmail || !country || !currency) {
                alert("Please fill all fields in Step 1.");
                return false;
            }
            return true;
       };
    
    const formIsSubmitted = (event) => {
        event.preventDefault();
        if (validateStep1()) {
            handleNext();
        }
    };
    
    const validateStep2 = () => {
        if (!userName || !companyUserEmail || !role) {
            alert("Please fill all fields in Step 1.");
            return false;
        }
        return true;
   };

    const form2IsSubmitted = (event) => {
        event.preventDefault();
        if (validateStep2()) {
            handleNext();
        }
    };

    const finalStep = (event)=>{
        event.preventDefault(); // Prevent the default form submission behavior
        axios
            .post(
                "http://localhost:8080/payroll/new/user",
                { 
                    aboutCompany : {compName: companyName, 
                                    compEmail: companyEmail,
                                    country: country,
                                    currency: currency,
                                },
                    aboutCompanyAdmin : {
                        userName : userName,
                        role : role,
                        phoneNumber : phoneNumber,
                        companyUserEmail : companyUserEmail,
                        password : password,
                        confirmPassword : confirmPassword,

                    }       
                },
                {
                    headers: {
                        "Content-Type": "application/json", // Ensure the backend expects JSON
                    },
                }
            )
            .then((response) => {
                console.log("Response:", response.data); // Handle the response here
                if (response.data.gotPasswordError){
                    setPassWordError(data.passwordError);
                }
            })
            .catch((error) => {
                console.error("There was an error:", error); // Handle errors
                alert("An error occurred while submitting the form.");
            });

    }
    useEffect(() => {
        // Log the values when they change
        console.log("Company Name:", companyName);
        console.log("Company Email:", companyEmail);
        console.log("Country:", country);
        console.log("Currency:", currency);
    }, [companyName, companyEmail, country, currency]); // Run whenever any of these state variables change

    return (
        <>
         {step === 1 && (
            <form onSubmit={formIsSubmitted}>
                <section className="relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                        <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
                            <div className="w-full flex-col justify-center items-center gap-8 flex">
                                {/* Progress Indicator */}
                                <ol className="w-full flex items-center justify-center gap-8 text-xs text-gray-900 font-medium sm:text-base">
                                    {/* Step 1 */}
                                    <li className="flex relative text-center text-indigo-600 text-base font-semibold leading-relaxed">
                                        <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center z-10">
                                            <span className="w-10 h-10 bg-green-600 border border-dotted border-green-600 rounded-full flex justify-center items-center mx-auto mb-1 text-base text-white font-bold leading-relaxed lg:w-10 lg:h-10">
                                                1
                                            </span>{" "}
                                            Company Information
                                            <h6 className="text-center text-green-600 text-base font-normal leading-relaxed">
                                                In Progress
                                            </h6>
                                        </div>
                                    </li>
                                    {/* Other Steps */}
                                </ol>
                            </div>
                            <div className="w-full lg:p-11 md:p-8 p-7 bg-white rounded-3xl shadow-[0px_15px_60px_-4px_rgba(16,_24,_40,_0.08)] flex-col justify-start items-start flex">
                                <div className="w-full flex-col justify-start items-start gap-8 flex">
                                    {/* Company Name Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="companyName" className="text-gray-600 text-base font-medium leading-relaxed">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="Company Name"
                                            value={companyName}
                                            onChange={(event) => setCompanyName(event.target.value)}
                                        />
                                        {userError}
                                    </div>
                                    {/* Company Email Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="companyEmail" className="text-gray-600 text-base font-medium leading-relaxed">
                                            Company Email
                                        </label>
                                        <input
                                            type="email"
                                            id="companyEmail"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="Company Email"
                                            value={companyEmail}
                                            onChange={(event) => setCompEmail(event.target.value)}
                                        />
                                    </div>
                                    {/* Country Selector */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="country" className="text-gray-600 text-base font-medium leading-relaxed">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            value={country}
                                            onChange={(event) => setCountry(event.target.value)}
                                        >
                                            <option value="" disabled>
                                                Select a Country
                                            </option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Tanzania">Tanzania</option>
                                            <option value="Burundi">Burundi</option>
                                        </select>
                                    </div>
                                    {/* Currency Selector */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="currency" className="text-gray-600 text-base font-medium leading-relaxed">
                                            Currency
                                        </label>
                                        <select
                                            id="currency"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            value={currency}
                                            onChange={(event) => setCurrency(event.target.value)}
                                        >
                                            <option value="" disabled>
                                                Choose Currency
                                            </option>
                                            <option value="frw">FRW</option>
                                            <option value="shillings">Shillings (Kenya)</option>
                                            <option value="usd">USD</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="w-full flex justify-end">
                                    <button
                                        type="submit"
                                        className="w-full my-4 px-6 py-3 bg-green-600 text-white rounded-xl"
                                    >
                                        continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
              )}
            {step === 2 && (
                <form onSubmit={form2IsSubmitted}>
                <section className="relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                        <div className="w-full flex-col justify-start items-start gap-5 inline-flex">

                            <div className="w-full flex-col justify-center items-center gap-8 flex">
                                {/* Progress Indicator */}
                                <ol className="w-full flex items-center justify-center gap-8 text-xs text-gray-900 font-medium sm:text-base">
                                    {/* Step 1 */}
                                    <li className="flex relative text-center text-indigo-600 text-base font-semibold leading-relaxed">
                                        <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center z-10">
                                            <span className="w-10 h-10 bg-green-600 border border-dotted border-green-600 rounded-full flex justify-center items-center mx-auto mb-1 text-base text-white font-bold leading-relaxed lg:w-10 lg:h-10">
                                                2
                                            </span>{" "}
                                            Company Admin Information
                                            <h6 className="text-center text-green-600 text-base font-normal leading-relaxed">
                                                pending: confirmation
                                            </h6>
                                        </div>
                                    </li>
                                    {/* Other Steps */}
                                </ol>
                            </div>
                                
                            <div className="w-full lg:p-11 md:p-8 p-7 bg-white rounded-3xl shadow-[0px_15px_60px_-4px_rgba(16,_24,_40,_0.08)] flex-col justify-start items-start flex">
                                <div className="w-full flex-col justify-start items-start gap-8 flex">
                                    {/*  user Name Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="userName" className="text-gray-600 text-base font-medium leading-relaxed">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="userName"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="your name Name"

                                            onChange={(event)=>{
                                                const userHasName = event.target.value;
                                                setUserName(userHasName)
                                            }}
                                        />
                                    </div>
                                    {/* company user phone number Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="phone-number" className="text-gray-600 text-base font-medium leading-relaxed">
                                            mobile number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone-number"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="phone number"

                                            onChange={(event)=>{
                                                const phoneNum = event.target.value;
                                                setPhoneNumber(phoneNum)
                                            }}
                                        />
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="phone-number" className="text-gray-600 text-base font-medium leading-relaxed">
                                            your emaiL
                                        </label>
                                        <input
                                            type="email"
                                            id="phone-number"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="Company Email"

                                            onChange={(event)=>{
                                                const userEmail = event.target.value;
                                                setCompanyUserEmail(userEmail)
                                            }}
                                        />
                                    </div>

                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="role" className="text-gray-600 text-base font-medium leading-relaxed">
                                            role
                                        </label>
                                        <select id="role" className="w-full px-5 py-3 border rounded-lg"
                                            value={role}
                                            onChange={(event)=>{
                                                const newRole = event.target.value;
                                                setRole(newRole);
                                            }}
                                        >
                                            <option value="" disabled selected>choose your role</option>
                                            <option value="HR">HR</option>
                                            <option value="CEO">CEO</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="w-full flex justify-end">
                                <button type="button" onClick={handleBack}
                                    className="w-full my-4 px-6 py-3 bg-gray-100 rounded-xl"
                                >
                                    Back
                                </button>
                                    <button
                                        type="submit"
                                        className="w-full my-4 px-6 py-3 bg-green-600 text-white rounded-xl"
                                    >
                                        continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
 
            )}
            {step===3 &&(
                <form onSubmit={finalStep}>
                <section className="relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                        <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
                            <div className="w-full flex-col justify-center items-center gap-8 flex">
                                {/* Progress Indicator */}
                                <ol className="w-full flex items-center justify-center gap-8 text-xs text-gray-900 font-medium sm:text-base">
                                    {/* Step 3 */}
                                    <li className="flex relative text-center text-indigo-600 text-base font-semibold leading-relaxed">
                                        <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center z-10">
                                            <span className="w-10 h-10 bg-green-600 border border-dotted border-green-600 rounded-full flex justify-center items-center mx-auto mb-1 text-base text-white font-bold leading-relaxed lg:w-10 lg:h-10">
                                                3
                                            </span>{" "}
                                            Confirm account
                                            <h6 className="text-center text-green-600 text-base font-normal leading-relaxed">
                                                final step
                                            </h6>
                                        </div>
                                    </li>
                                    {/* Other Steps */}
                                </ol>
                            </div>
                            <div className="w-full lg:p-11 md:p-8 p-7 bg-white rounded-3xl shadow-[0px_15px_60px_-4px_rgba(16,_24,_40,_0.08)] flex-col justify-start items-start flex">
                                <div className="w-full flex-col justify-start items-start gap-8 flex">
                                    {/*  user Name Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="password" className="text-gray-600 text-base font-medium leading-relaxed">
                                            set password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="password"
                                            onChange={(event)=>{
                                                const password = event.target.value;
                                                setPassWord(password)
                                            }}
                                        />
                                    </div>
                                    {/* company user phone number Input */}
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label htmlFor="confirm_password" className="text-gray-600 text-base font-medium leading-relaxed">
                                            re-type password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm_password"
                                            className="w-full px-5 py-3 border rounded-lg"
                                            placeholder="Company Email"
                                            onChange={(event)=>{
                                                const password = event.target.value;
                                                setConfirmPassWord(password)
                                            }}
                                        />
                                    </div>
                                </div>
                                {passwordError}
                                {/* Submit Button */}
                                <div className="w-full flex justify-end">
                                <button type="button" onClick={handleBack}
                                    className="w-full my-4 px-6 py-3 bg-gray-100 rounded-xl"
                                >
                                    Back
                                </button>
                                    <button
                                        type="submit"
                                        className="w-full my-4 px-6 py-3 bg-green-600 text-white rounded-xl"
                                    >
                                        confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            )}

        </>
    );
}

export default Register;
