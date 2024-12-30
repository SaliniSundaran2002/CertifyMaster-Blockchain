import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from '../assets/images/icon.png';

const ViewCertificate = () => {
  const location = useLocation();
  const { certificateData } = location.state || {};

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full flex flex-wrap items-center justify-center md:justify-end p-4 space-x-4 space-y-2 md:space-y-0">
          <button
            type="submit"
            className="hover:bg-sky-500 px-4 py-2 rounded-lg text-sm md:text-base"
          >
            <Link to="/">Home</Link>
          </button>
        </div>

        <div className="flex items-center justify-center min-h-screen p-4 w-full">
          <div className="bg-white border-8 border-yellow-600 shadow-lg rounded-lg w-full max-w-4xl p-10">
            <div className="border-4 border-red-600 p-6 rounded-lg">
              <div className="text-center">
                <h3 className="text-3xl font-serif font-bold text-gray-700 mb-6">
                  Kerala Blockchain Academy
                </h3>
                <div className="my-8">
                  <img src={icon} alt="icon" className="mx-auto w-36 md:w-48 lg:w-56" />
                </div>

                {certificateData ? (
                  <div className="p-8 border-2 border-dashed border-gray-400 rounded-lg">
                    <p className="text-xl text-gray-800 mb-4">This is to certify that</p>
                    <p className="text-3xl font-serif font-semibold text-blue-700 mb-4">
                      {certificateData.name}
                    </p>
                    <p className="text-xl text-gray-800 mb-4">has successfully completed</p>
                    <p className="text-2xl font-serif font-semibold text-blue-700 mb-4">
                      {certificateData.course}
                    </p>
                    <p className="text-xl text-gray-800 mb-4">with grade</p>
                    <p className="text-2xl font-semibold text-blue-700 mb-4">{certificateData.grade}</p>
                    <p className="text-xl text-gray-800 mb-4">on</p>
                    <p className="text-xl font-serif text-gray-600">{certificateData.date}</p>
                  </div>
                ) : (
                  <p className="mt-8 text-lg text-red-600">No certificate data found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCertificate;
