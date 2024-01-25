import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import { useNavigate } from 'react-router-dom';
import Plan from '../Modals/Plan';
import Sidebar2 from '../Modals/Sidebar2';
import axios from 'axios';
import { getAllUserData, setUserData, getUserPlan } from '../AdminApiService';

function Profile() {

    const navigate = useNavigate();
    const [openModal, setModalOpen] = useState(false);
    const [userData, setUserData1] = useState(null);
    const [editable, setEditable] = useState("");
    
    const [column, setColumn] = useState(''); // State to store column value
    const [newValue, setNewValue] = useState(''); // State to store newValue value
    const [responseStatus, setResponseStatus] = useState(null); // State to store response status
    const accessToken = localStorage.getItem("token");


    const [userId, setUserId] = useState(123); // Replace with actual user ID
    const [customerId, setCustomerId] = useState(456); // Replace with actual customer ID
    const [userPlan, setUserPlan] = useState(null);
    //------------------------------------------------------------------------------


    //------------------------------------------------------------------------------


    // SET PROFILE DATA
    const handleSetUserData = async (column, newValue, userId, customerId) => {
        try {
          const result = await setUserData(accessToken, column, newValue, userId, customerId);
    
          if (result.status === 200) {
            console.log('User data set successfully!');
            // Handle success if needed
          } else {
            console.error('Failed to set user data.');
            // Handle failure if needed
          }
        } catch (error) {
          console.error('Error setting user data:', error);
          // Handle error
        }
      };

 
    //---------------------------------------------------

    // GET USER DATA
    const fetchUserData = async () => {
        try {
          const result = await getAllUserData(accessToken);
          console.log(result)
        } catch (error) {
            throw error;
        }
      };

    // GET USER PLAN
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getUserPlan(accessToken, userId, customerId);
          setUserPlan(result.userPlan);
        } catch (error) {
            throw error;
        }
      };
  
      fetchData();
    }, [accessToken, userId, customerId]); // Add accessToken, userId, and customerId to dependencies if you want to refetch data when they change
  

    useEffect(() => {
        
        fetchUserData(accessToken)
        .then((userData) => {
            // Use the user data or perform further actions
            console.log('Fetched user data:', userData);
        })
        .catch((error) => {
            // Handle any errors that occurred during data fetching
            console.error('Error fetching user data:', error);
        });

      }, []); 

    const handleUpdateUserData = (state) =>{
        setColumn(state);
        handleSetUserData();
        setEditable(null);
    }
    
  return (
    <>



        {/* <div>
      <input
        type="text"
        placeholder="Column"
        value={column}
        onChange={(e) => setColumn(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Value"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
      />
      <button onClick={setUserdata}>Set User Data</button>
      {responseStatus && <p>Status: {responseStatus}</p>}
    </div> */}




        <div className="dashboard m-0">
        <div className='slideup'>
            <Plan open={openModal} onClose={()=>setModalOpen(false)}/>
        </div> 
            <div className="row">
                <div className="p-0">
            
                 <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12 mb-0">                           
                            <div className="row mb-4 me-5 d-flex justify-content-between">
                                <h2 className='purple w-auto mt-3'>Profil: Müşteri İsim Soyisim</h2>
                                <img src={logo} className='sidebar-logo ' alt="" />
                            </div>
                        </div>
                        <div className="col-9 mb-4">
                           <div className="row ps-0 my-3 slideup ">
                                <div className="col-9 my-auto">
                                    <div className="col-12 ms-4 purple ">
                                        <h6 className=''>"İsim Soyisim" adlı müşterinizin aktif planı: {userData ?(
                                            <>{userData.Plan}</>
                                        ) : (
                                            <>Aktif Planınız yok</>
                                        )}  
                                        <button class="buton2 ms-2 mt-2 trans" onClick={()=>navigate('/Hizmetler')} ><i class="fa-solid fa-repeat"></i> Değiştir</button></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form>
                        <div className="col-12 slideleft">
                            <div className="row mb-3">
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Hesap Adı</p>
                                        {editable === "accountName" ? (
                                            <div className="d-flex align-items-center">
                                                <input type='text' className='profile-input' placeholder="Hesap Adınız" onChange={(e) => setNewValue(e.target.value)}></input>
                                                <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                            </div>
                                        ):(
                                            userData ? (
                                                <h6 className='profile-info'>{userData.accountName}</h6>
                                            ) : (
                                                <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("accountName")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                            )
                                        )}

                                    </div>
                                </div>
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>E-mail</p>
                                        {editable === "mail" ? (
                                            <div className="d-flex align-items-center">
                                                <input type='text' className='profile-input' placeholder="Mailiniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                                <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                            </div>
                                        ):(
                                            userData ? (
                                                <h6 className='profile-info'>{userData.mail}</h6>
                                            ) : (
                                                <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("mail")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                            )
                                        )}
                                        

                                    </div>
                                </div>
                                
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Telefon</p>
                                        {editable==="phone" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Telefonunuz" onChange={(e) => setNewValue(e.target.value)}></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                userData ? (
                                                    // Display user address if userData exists
                                                    <h6 className='profile-info'>{userData.phoneNumber}</h6>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("phone")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                )
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Şirket Ünvanı</p>
                                        {editable==="companyTitle" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Şirket Ünvanınız" onChange={(e) => setNewValue(e.target.value)}></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                userData ? (
                                                    // Display user address if userData exists
                                                    <h6 className='profile-info'>{userData.companyTitle}</h6>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("companyTitle")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                )
                                        )}

                                    </div>
                                </div>
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Vergi Dairesi</p>
                                        {editable==="taxAdmin" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Vergi Daireniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                userData ? (
                                                    // Display user address if userData exists
                                                    <h6 className='profile-info'>{userData.taxAdmin}</h6>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("taxAdmin")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Vergi Numarası</p>
                                        {userData ? (
                                            <h6 className='profile-info'>{userData.taxNumber}</h6>
                                            ) : (
                                            <h6 className='profile-info'>No data</h6>
                                        )}

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Şehir</p>
                                        {editable==="city" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Şehriniz" onChange={(e) => setNewValue(e.target.value)}></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                userData ? (
                                                    // Display user address if userData exists
                                                    <h6 className='profile-info'>{userData.city}</h6>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("city")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                )
                                        )}

                                    </div>
                                </div>
                                <div className="col-8 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Açık Adres</p>
                                        {editable==="adress" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Adresiniz" onChange={(e) => setNewValue(e.target.value)} ></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>handleUpdateUserData(editable)} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                userData ? (
                                                    // Display user address if userData exists
                                                    <>
                                                        <h6 className='profile-info'>{userData.address}</h6>
                                                        <button class="buton2 ms-2 mt-2 trans" onClick={()=>handleUpdateUserData(true)} ><i class="fa-solid fa-pen-to-square"></i> </button>
                                                    </>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("adress")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Profile;
