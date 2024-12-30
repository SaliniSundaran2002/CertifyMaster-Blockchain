import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import ABI from '../assets/Certificate.json';
import address from '../assets/deployed_addresses.json';

const IssueCertificate = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        course: '',
        grade: '',
        date: '',
    });
    const [output, setOutput] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const Cabi = ABI.abi;
            const Caddress = address['CertificateModule#Certificate'];

            // Create an instance of the contract
            const certiInstane = new ethers.Contract(Caddress, Cabi, signer);

            // Call the contract method
            const transactionReceipt = await certiInstane.issueCertificate(
                formData.id,
                formData.name,
                formData.course,
                formData.grade,
                formData.date
            );
            console.log('Transaction receipt', transactionReceipt);
            setOutput(transactionReceipt);
        } catch (error) {
            console.error("Error issuing certificate: ", error);
            setOutput(error.message);
        }
    }

    return (
        <>
        <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />

        </head>
            <div className="w-full flex flex-row items-center justify-end p-4 space-x-4">
                <button className="hover:bg-sky-500 px-4 py-2 rounded-lg text-sm md:text-base">
                    <Link to="/">Home</Link>
                </button>
            </div>

            <h2 className="mb-6 text-2xl md:text-3xl font-semibold font-poppins text-center">Certify Master</h2>


            <div className="bg-white border-8 border-gray-200 shadow-2xl rounded-xl w-full max-w-lg p-8 m-auto mt-8 mb-4">
                <h3 className="mb-6 text-2xl md:text-3xl font-semibold text-center text-gray-800">Issue New Certificate</h3>

                <form onSubmit={handleSubmit}>
             
                    <div className="mt-6">
                        <label className="block text-lg font-medium text-gray-700">Select Course <sup className="text-red-500">*</sup></label>
                        <select
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
                            <option value="Certified Cyber Security">Certified Cyber Security</option>
                            <option value="Certified Blockchain Expert">Certified Blockchain Expert</option>
                            <option value="Certified Information Systems Security Professional (CISSP)">Certified Information Systems Security Professional (CISSP)</option>
                            <option value="Certified Ethical Hacker (CEH)">Certified Ethical Hacker (CEH)</option>
                            <option value="Certified Blockchain Developer">Certified Blockchain Developer</option>
                            <option value="Certified Smart Contract Auditor">Certified Smart Contract Auditor</option>
                            <option value="Certified Information Security Manager (CISM)">Certified Information Security Manager (CISM)</option>
                            <option value="Certified Cloud Security Professional (CCSP)">Certified Cloud Security Professional (CCSP)</option>
                            <option value="Certified Blockchain Solution Architect">Certified Blockchain Solution Architect</option>
                        </select>
                    </div>

                    {/* Certificate ID */}
                    <div className="mt-6">
                        <label className="block text-lg font-medium text-gray-700">Certificate ID <sup className="text-red-500">*</sup></label>
                        <input
                            type="text"
                            placeholder="Certificate ID"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    {/* Candidate Name */}
                    <div className="mt-6">
                        <label className="block text-lg font-medium text-gray-700">Candidate Name<sup className="text-red-500">*</sup></label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    {/* Select Grade */}
                    <div className="mt-6">
                        <label className="block text-lg font-medium text-gray-700">Select Grade <sup className="text-red-500">*</sup></label>
                        <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="select">---select---</option>
                            <option value="S">S</option>
                            <option value="A">A</option>
                            <option value="A+">A+</option>
                        </select>
                    </div>

                    {/* Issue Date */}
                    <div className="mt-6">
                        <label className="block text-lg font-medium text-gray-700">Issue Date <sup className="text-red-500">*</sup></label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-sky-500 text-white py-3 rounded-lg text-lg hover:bg-sky-600 transition duration-300"
                        >
                            Issue Certificate
                        </button>
                    </div>
                </form>

                {/* Output */}
                {output && (
                    <div className="mt-4 text-lg text-center text-red-500 font-semibold">
                        {output}
                    </div>
                )}
            </div>
        </>
    );
};

export default IssueCertificate;
                