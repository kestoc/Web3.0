import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import ErrorMessage from "./ErrorMessage";
//import TxList from "./TxList";

export default function App() {
  
  const [error, setError] = useState();
  //const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();

  const [inputConsult, setInputConsult] = useState(0);
  const [inputID, setInputID] = useState(0);
  const [inputName, setInputName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputCourse, setInputCourse] = useState('');

  const handleInputChangeConsult = (e) => setInputConsult(e.currentTarget.value);
  const handleInputChangeId = (e) => setInputID(e.currentTarget.value);
  const handleInputChangeName = (e) => setInputName(e.currentTarget.value);
  const handleInputChangeDate = (e) => setInputDate(e.currentTarget.value);
  const handleInputChangeCourse = (e) => setInputCourse(e.currentTarget.value);
  
  const addressContract = "0x8272F5eA44812c1283ce3c72DDD81764cE0e1970";

  const connectWallet = async () => {
    const accounts= await window.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts)
  }

  //Funcion para consultar si un certificado esta registrado o no en la BlockChain
  const handleConsultCertificate = async () => {
    connectWallet();

    //Se conecta a un proveedor de web3.0
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Permito el envio de datos
    await provider.send('eth_requestAccounts', []); 
    
    //Identifico el address de quien consulta el certificado
    const signer = await provider.getSigner();

    //Consulto el contrato dada su direccion de despliegue
    const contract = new ethers.Contract(addressContract, abi, signer);
    
    //Llamo la funcion del contrato para consultar por el id si el certificado esta o no registrardo
    const certificate = await contract.consultar_certificado(inputConsult);

    console.log(certificate);
    //Se despliega una alerta para cada caso
    if(certificate){
      alert('El certificado se encuentra registrado')
    }
    else{
      alert('El Certificado no se encuentra registrado')
    }
    
    //Se vuelve y se pone el valor por defecto en la casilla
    setInputConsult(0);
  };

  //Funcion para crear un nuevo certificado y agregarlo a la BlockChain
  const handleCreateCertificate = async () => {
    connectWallet();
    
    //Se conecta a un proveedor de web3.0
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    //Permito el envio de datos
    await provider.send("eth_requestAccounts", []);
    
    //Identifico el address de quien registra el certificado
    const signer = await provider.getSigner();
    
    //Consulto el contrato dada su direccion de despliegue
    const contract = new ethers.Contract(addressContract, abi, signer);
    
    //Llamo la funcion del contrato para crear un nuevo certificado en la BlockChain
    await contract.agregar_certificado(inputName,inputID,inputDate,inputCourse);

    //Le confirmo al usuario que fue registrado el certificado
    alert("Curso registrado exitosamente en la BlockChain");
    
    //Se vuelve y se pone el valor por defecto de cada casilla
    setInputName("");
    setInputID(0);
    setInputDate("");
    setInputCourse("");
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div>
        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Consulta un certificado con se ID
          </h1>
          <form>
              <div className="my-3">
                <input
                  type="text"
                  value={inputConsult}
                  onChange={handleInputChangeConsult}
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="ID"
                />
              </div>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                  onClick={handleConsultCertificate}
                >
                  Consultar
                </button>
              </footer>
            </form>
        </div>

        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Registra un nuevo certificado
          </h1>
          <form>
              <div className="my-3">
                <input
                  type="text"
                  value={inputName}
                  onChange={handleInputChangeName}
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Nombre Estudiante"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  value={inputID}
                  onChange={handleInputChangeId}
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="ID"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  value={inputDate}
                  onChange={handleInputChangeDate}
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Fecha"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  value={inputCourse}
                  onChange={handleInputChangeCourse}
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Nombre curso"
                />
              </div>
              <footer className="p-4">
                <button
                  type="submit"
                  className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                  onClick={handleCreateCertificate}
                >
                  Registrar
                </button>
              </footer>
            </form>
        </div>
      </div>
    </div>
  );
}
