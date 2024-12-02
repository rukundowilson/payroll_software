function Register() {
    return (
        <>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full flex-col justify-start items-start gap-12 inline-flex">
                        <h2 className="w-full text-center text-gray-600 text-4xl font-bold font-manrope leading-normal">
                            Help us identify your company on a platform.
                        </h2>
                        <hr />
                        <div className="w-full flex-col justify-center items-center gap-8 flex">
                            <ol className="w-full flex items-center justify-center gap-8 text-xs text-gray-900 font-medium sm:text-base">
                                <li className="flex relative text-center text-indigo-600 text-base font-semibold leading-relaxed justify-center after:content-[''] sm:after:w-[172px] after:w-[150px] after:border-dashed after:border after:border-indigo-600 after:inline-block after:absolute after:top-5 sm:after:left-[110px] after:left-[100px]">
                                    <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center z-10">
                                        <span className="w-10 h-10 bg-indigo-600 border border-dotted border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 text-base text-white font-bold leading-relaxed lg:w-10 lg:h-10">
                                            1
                                        </span>{" "}
                                        company information
                                        <h6 className="text-center text-indigo-600 text-base font-normal leading-relaxed">
                                            In Progress
                                        </h6>
                                    </div>
                                </li>
                                <li className="flex relative justify-center text-black text-base font-semibold after:content-[''] leading-relaxed sm:after:w-[172px] after:w-[150px] after:border-dashed after:border after:border-indigo-200 after:inline-block after:absolute after:top-5 sm:after:left-[106px] after:left-24">
                                    <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center flex flex-col z-10">
                                        <span className="w-10 h-10 bg-indigo-50 rounded-full flex justify-center items-center mx-auto mb-1 text-base font-bold leading-relaxed text-indigo-600 lg:w-10 lg:h-10">
                                            2
                                        </span>{" "}
                                        user information
                                        <span className="text-center text-gray-500 text-base font-normal leading-relaxed">
                                            Pending
                                        </span>
                                    </div>
                                </li>
                                <li className="flex relative justify-center text-gray-500 text-base font-semibold leading-relaxed">
                                    <div className="sm:w-[176px] w-auto sm:whitespace-nowrap text-center flex items-center flex-col z-10 ">
                                        <span className="w-10 h-10 text-center text-indigo-600 text-base font-bold border-2 bg-transparent border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-1 lg:w-10 lg:h-10">
                                            3
                                        </span>{" "}
                                        confirm identity
                                        <span className="text-center text-gray-500 text-base font-normal leading-relaxed">
                                            Pending
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="w-full lg:p-11 md:p-8 p-7 bg-white rounded-3xl shadow-[0px_15px_60px_-4px_rgba(16,_24,_40,_0.08)] flex-col justify-start items-start flex">
                            <div className="w-full flex-col justify-start items-start gap-8 flex">
                                <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            htmlFor="firstName"
                                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                            company name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            htmlFor="role"
                                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                            company email
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            placeholder="email"
                                        />
                                    </div>
                                    
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            htmlFor="firstName"
                                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                            country
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            htmlFor="firstName"
                                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                           address
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                                    <button className="w-full px-6 py-2.5 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-indigo-600 hover:border-transparent hover:bg-indigo-50 transition-all duration-700 ease-in-out justify-center items-center flex">
                                        <span className="px-2 py-px text-center text-indigo-600 text-lg font-semibold leading-8">
                                            already have an account? continue 
                                        </span>
                                    </button>
                                    <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                                        <span className="px-2 text-center text-white text-lg font-semibold leading-8">
                                            Submit
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Register;