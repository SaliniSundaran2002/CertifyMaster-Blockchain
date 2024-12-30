import React,{useState} from 'react';
import { data, useNavigate } from 'react-router-dom';
import icon from '../assets/images/icon.png';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers'
import ABI from '../assets/Certificate.json'
import address from '../assets/deployed_addresses.json'

const HomePage = () => {
  async function connectMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum); //creating an instance of provider
    const signer = await provider.getSigner(); 
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)   
  }

  const [output, setOutput] = useState('');
  const navigate = useNavigate();
  async function getCertificate(){
    const id = document.getElementById('getID').value;
    console.log("id",id);
    const provider = new ethers.BrowserProvider(window.ethereum); //creating an instance of provider
    const signer = await provider.getSigner(); 
    const Cabi = ABI.abi;
    const Caddress = address['CertificateModule#Certificate'];
    // console.log(Caddress,"contract address");
    const certiInstane = new ethers.Contract(Caddress,Cabi,signer);
    const txValue = await certiInstane.certi(id)
    console.log("result", txValue);
    const certificateData = {
      name: txValue[0],
      course : txValue[1],
      grade : txValue[2],
      date : txValue[3]
    }
    // setOutput(txValue);   
    navigate('/view',{state:{certificateData}})
    
  }

  return (
    <>
    <head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

    </head>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full flex flex-row items-center justify-end p-4 space-x-4">
          <button
            type="submit"
            className="hover:bg-sky-500 px-4 py-2 rounded-lg text-sm md:text-base"
          >
            <Link to="/">Home</Link>
          </button>
          <button
            type="submit"
            className="hover:bg-sky-500 px-6 py-2 rounded-lg text-sm md:text-base"
          >
            <Link to="issue" className="text-center">IssueCertificate</Link>
          </button>
          <button
            type="submit"
            className="hover:bg-sky-500 px-6 py-2 rounded-lg text-sm md:text-base"
          >
            <Link className="text-center" onClick={connectMetamask}>Connect Metamask</Link>
          </button>
        </div>

        <div className="mt-8 text-center">
          <h2 className="mb-6 text-2xl md:text-3xl font-semibold font-roboto">Certify Master</h2>

          <div>
            <img
              src={icon}
              alt="Certificate Dapp Icon"
              className="mx-auto w-40 md:w-60 lg:w-80"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4 w-full">
          <input
          id='getID'
            type="text"
            placeholder="Enter Certificate ID to View"
            required
            className="border-2 border-sky-500 h-10 px-4 rounded-md w-full md:w-1/2"
          />
          <div className="flex justify-center">
            <button onClick={getCertificate}
              type="submit"
              className="px-4 py-2 bg-cyan-500 text-white rounded-md w-full md:w-auto"
            >
              Search
            </button>
          </div>
          <div>
        <p>{output}</p>
      </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
