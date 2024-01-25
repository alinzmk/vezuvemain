import '../App.css';
import logo from "../Assets/logo-renkli.png"
import { useState, useRef, useEffect } from 'react';
import { updateUserData, UserData } from '../Assets/Mockdata';
import { toast } from 'react-toastify';
import Sidebar2 from '../Modals/Sidebar2';
import axios from 'axios';
import { getUserDocuments, uploadUserDocument, setUserDocuments, downloadDocument } from '../AdminApiService';

function Documents() {

    const [userDocuments, setDocument] = useState(null); // State to store user documents data
    const [accessToken, setAccessToken] = useState('your-access-token'); // Replace with actual access token
    const [userId, setUserId] = useState(123); // Replace with actual user ID
    const [customerId, setCustomerId] = useState(456); // Replace with actual customer ID
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [docInfo, setDocInfo] = useState(null);
    const [fileName, setFileName] = useState('your-file-name'); // Replace with actual file name


    const [seed, setSeed] = useState(1);
       const reset = () => {
            setSeed(Math.random());
        }

    const docNotify = () => toast.success('Dosya Başarıyla Yüklendi!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    // GET DOCUMENT FUNCTION
    const fetchDocumentData = async () => {
        try {
            const result = await getUserDocuments(accessToken, userId, customerId);
            setDocument(result.userDocuments);
        } catch (error) {
        }
        };
    

    
    // SET DOCUMENT FUNCTION
    const handleSetUserDocuments = async (column, newValue) => {
        try {
        const result = await setUserDocuments(accessToken, column, newValue, userId, customerId);

        if (result.status === 200) {
            console.log('User documents set successfully!');
        } else {
            console.error('Failed to set user documents.');
        }
        } catch (error) {
        console.error('Error setting user documents:', error);
        }
    };

    // UPLOAD
  
    const handleUploadUserDocument = async () => {
      try {
        const result = await uploadUserDocument(accessToken, fileName, file, customerId);
  
        if (result.status === 200) {
          console.log('User document uploaded successfully!');
          // Handle success if needed
        } else {
          console.error('Failed to upload user document.');
          // Handle failure if needed
        }
      } catch (error) {
        console.error('Error uploading user document:', error);
        // Handle error
      }
    };

    // DOWNLOAD

    const handleDownloadDocument = async () => {
        try {
          const result = await downloadDocument(accessToken, fileName, customerId);
    
          if (result.status === 200) {
            console.log('Document download successful!');
            // Handle success if needed
          } else {
            console.error('Failed to download document.');
            // Handle failure if needed
          }
        } catch (error) {
          console.error('Error downloading document:', error);
          // Handle error
        }
      };

    
  useEffect(() => {
    if (file) {
      document.querySelector("."+docInfo).click();
    }
  }, [file]);

  useEffect(() => {
    fetchDocumentData(accessToken)
    .then((userData) => {
        console.log('Fetched user data:', userData);
    })
    .catch((error) => {
        console.error('Error fetching user data:', error);
    });
}, []);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
        reset();
        localStorage.setItem(docInfo, "true");
        docNotify();
    }
  };


    
  return (
    <>
         <div className="dashboard m-0">
            <div className="row">
                <div className=" p-0">
                   <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12 mb-0">                           
                            <div className="row mb-4 me-5 d-flex justify-content-between">
                                <h2 className='purple w-auto mt-3'>Belgeler</h2>
                                <img src={logo} className='sidebar-logo' alt="" />
                            </div>
                        </div>
                        <div className="col-10 p-0" key={seed}>
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 slideup d-flex align-items-center'>Banka Hesap Özeti 
                                        
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                            Türkiye bankaları için Banka hesap özetinizi Mobil bankacılık üzerinden veya Banka şubenizden alabilirsiniz. Wise, Paypal gibi hesaplar 
                                            için mobil bankacılık veya internet bankacılığı kullanılabilir.</div>
                                        </div>
                                        
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                        {document.bankInfo === "false" ? (
                                            <form onSubmit={(e) => handleSubmit(e, "bankInfo")}>
                                                <label htmlFor="bankInfo-file-upload" class="buton4 slideup">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="bankInfo-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="bankInfo"></button>
                                            </form>
                                            ) : (
                                            <button className='buton3 m-0' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 p-0 slideup">
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 slideup d-flex align-items-center'>Kimlik Belgesi
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                TC Kimlik kartınızın hem arka hem ön yüzünü tek bir sayfada renkli şekilde PDF dosyası halinde yükleyiniz.</div>
                                        </div>
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                         {document.identityDocument === "false" ? (
                                                 <form onSubmit={(e) => handleSubmit(e, "identityDocument")}>
                                                <label htmlFor="identityDocument-file-upload" class="buton4 slideup">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="identityDocument-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="identityDocument"></button>
                                            </form>
                                             ) : (
                                                 <button className='buton3 m-0' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 p-0 slideup">
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 slideup d-flex align-items-center'>Faaliyet Belgesi
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                Türkiye Ticaret Odasına kayıtlı şirketinizin Faaliyet belgesini PDF formatında yükleyiniz. (faliyet belgesini kayıtlı olduğunuz ticaret odasından hem internet üzerinden hem fiziki olarak temin edebilirsiniz.)</div>
                                        </div>
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                        {document.activityDocument === "false" ? (
                                                <form onSubmit={(e) => handleSubmit(e, "activityDocument")}>
                                                <label for="activityDocument-file-upload" class="buton4 slideup">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="activityDocument-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="activityDocument"></button>
                                            </form>
                                            ) : (
                                                <button className='buton3 m-0 slideup' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 p-0 slideup">
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0 slideup'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 slideup d-flex align-items-center'>Yurtdışı Şirket Kurulum Sertifikası
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                Yurtdışında kurduğunuz şirketinizin adı, kayıt numarası, ortaklık yapısı gibi bilgilerini içeren (kurulumu yapan firma tarafından size iletilen) dosyayı PDF olarak yükleyiniz.</div>
                                        </div>
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                        {document.englandCertificate === "false" ? (
                                                <form onSubmit={(e) => handleSubmit(e, "englandCertificate")}>
                                                <label for="englandCertificate-file-upload" class="buton4 slideup">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="englandCertificate-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="englandCertificate"></button>
                                            </form>
                                            ) : (
                                                <button className='buton3 m-0 slideup' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 p-0 slideup">
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 d-flex align-items-center'>Vergi Levhası
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                Şirketirketinize ait vergi levhanızı PDF olarak yükleyiniz.</div>
                                        </div>
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                        {document.taxPlate === "false" ? (
                                                <form onSubmit={(e) => handleSubmit(e, "taxPlate")}>
                                                <label for="taxPlate-file-upload" class="buton4">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="taxPlate-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="taxPlate"></button>
                                            </form>
                                            ) : (
                                                <button className='buton3 m-0' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 p-0 slideup">
                            <div className="col-12 w-auto pb-3">
                                <div className="pbg">

                                <div className="row p-3">
                                    <div className="col-1 ms-5 my-auto">
                                        <h2 className='my-auto mx-0'><i class="fa-regular fa-file"></i></h2>
                                    </div>
                                    <div className="col-7 my-auto text-left">
                                        <h5 className='m-0 d-flex align-items-center'>Fatura (Elektrik, Gaz, İnternet)
                                        <div class="dropdown2 ms-3">
                                            <button class="d-flex info-btn" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            <div class="dropdown-menu info" aria-labelledby="dropdownMenuButton2">
                                                Şirketin en büyük hissedarına ait, doğrudan kendi adına kayıtlı Elektirik, doğalgaz, cep telefonu, internet faturasını 
                                                PDF Formatında yükleyin.</div>
                                        </div>
                                        </h5>
                                    </div>
                                    <div className="col-3 my-auto p-0 justify-content-center d-flex">
                                        {document.billInfo === "false" ? (
                                                <form onSubmit={(e) => handleSubmit(e, "billInfo")}>
                                                <label for="billInfo-file-upload" class="buton4">Belge Yüklü Değil <i class="fa-regular fa-circle-xmark"></i></label>
                                                <input  id="billInfo-file-upload" className='d-none' type="file" ref={fileInputRef} />
                                                <button type="submit" style={{ display: 'none' }} class="billInfo"></button>
                                            </form>
                                            ) : (
                                                <button className='buton3 m-0' style={{cursor:"default"}}>Belgeyi İndirin <i class="fa-solid fa-file-arrow-down"></i></button>
                                        )}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Documents;
