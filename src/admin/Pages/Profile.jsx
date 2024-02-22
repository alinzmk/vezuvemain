import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import { useNavigate } from 'react-router-dom';
import Sidebar2 from '../Modals/Sidebar2';
import axios from 'axios';
import { getAllUserData, setUserData, getUserPlan } from '../AdminApiService';
import { useDispatch, useSelector } from 'react-redux';
import { successNotification } from '../../Modals/Notification';
import { getUserAdmin } from '../../redux/features/adminuser/userAdminSlice';

function Profile() {

    const accessToken = sessionStorage.getItem("token")
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    const [editable, setEditable] = useState("");
    const [newValue, setNewValue] = useState('');
    //-----------------------------------------------------------------------------    
    const {useradmin} = useSelector((state) => state.useradmin);
    const {planadmin} = useSelector((state) => state.planadmin);
    const dispatch = useDispatch();
    const user_id = (sessionStorage.getItem("selectedCustomer")-1)
//------------------------------------------------------------------------------   
    if(useradmin.length === 0){
        dispatch(getUserAdmin())
    }
   //------------------------------------------------------------------------------


   // SET PROFILE DATA
   const handleSetUserData = async (column) => {
    try {
      const result = await setUserData(accessToken, column, newValue);
      if (result.status === 200) {
        console.log('User data set successfully!');
        successNotification('BAŞARIYLA DEĞİŞTİRİLDİ');
        dispatch(getUserAdmin())
      } else {
        console.error('Failed to set user data.');
      }
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  };

  const updateUserData = (state) =>{
      handleSetUserData(state);
      setEditable(null);
  }

    
  return (
    <>
        <div className="dashboard m-0">
        <div className='slideup'>
        </div> 
            <div className="row">
                 <div className="p-0">
                 <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12 mb-0">                           
                            <div className="row mb-4 me-5 d-flex justify-content-between">
                                <h2 className='purple w-auto mt-3'>Profil</h2>
                                <img src={logo} className='sidebar-logo ' alt="" />
                            </div>
                        </div>




                        <div className="col-9 mb-4">
                           <div className="row ps-0 my-3 slideup ">
                                <div className="col-9 my-auto">
                                    <div className="col-12">
                                        <h3 className='ms-4 purple'>Hoş geldiniz<i class="fa-solid fa-hands"></i>, Sayın {useradmin ? (
                                            <>{useradmin[user_id].name} {useradmin[user_id].surname}</>
                                            ) : (
                                            <>Müşterimiz</>
                                        )}.</h3>

                                    </div>
                                    <div className="col-12 ms-4 purple ">
                                        <h6 className=''>Şu anda ödeme planınız; {planadmin ?(
                                            <>{planadmin.currentPlan}</>
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
                                        {useradmin ? (
                                            <h6 className='profile-info'>{useradmin[user_id].accountName}</h6>
                                            ) : (
                                            <h6 className='profile-info'>No data</h6>
                                        )}

                                    </div>
                                </div>
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>E-mail</p>
                                        {useradmin ? (
                                            <h6 className='profile-info'>{useradmin[user_id].email}</h6>
                                            ) : (
                                            <h6 className='profile-info'>No data </h6>
                                        )}

                                    </div>
                                </div>
                                
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Telefon</p>
                                        {editable==="phone" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <input type='text' className='profile-input' placeholder="Telefonunuz" ></input>
                                            ) : (
                                                useradmin ? (
                                                    // Display user address if userData exists
                                                    <h6 className='profile-info'>{useradmin[user_id].phone}</h6>
                                                ) : (
                                                    // Display an empty h6 element if userData doesn't exist
                                                    <h6 className='profile-info'>No data </h6>
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
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("companyTitle")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                useradmin ? (
                                                    // Display user address if userData exists
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className='profile-info'>{useradmin[user_id].companyTitle}</h6>
                                                            <button type='button' className="profile-button ms-auto trans me-3 my-2" onClick={()=>setEditable("companyTitle")}>
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <div className="d-flex align-items-center">
                                                            <h6 className='profile-info'>No data</h6>
                                                            <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("companyTitle")}>
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                        </div>
                                                    </form>// Display an empty h6 element if userData doesn't exist
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
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("taxAdmin")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                useradmin.taxAdmin ? (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>{useradmin[user_id].taxAdmin}</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("taxAdmin")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                    </form>// Display user address if userData exists
                                                ) : (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("taxAdmin")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                    </form>// Display an empty h6 element if userData doesn't exist
                                                )
                                        )}
                                    </div>
                                </div>
                                <div className="col-4 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Vergi Numarası</p>
                                        {useradmin ? (
                                            <h6 className='profile-info'>{useradmin[user_id].taxNumber}</h6>
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
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("city")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                useradmin ? (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>{useradmin[user_id].city}</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("city")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                    </form>// Display user address if userData exists
                                                ) : (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("city")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                    </form>// Display an empty h6 element if userData doesn't exist
                                                )
                                        )}

                                    </div>
                                </div>
                                <div className="col-8 ps-0 pe-3">
                                    <div className="pbg">
                                        <p className='profile-title'>Açık Adres</p>
                                        {editable==="address" ? (
                                                // Content to display when editable is true (empty in this case)
                                                <div className="d-flex align-items-center">
                                                    <input type='text' className='profile-input' placeholder="Adresiniz" onChange={(e) => setNewValue(e.target.value)} ></input>
                                                    <button class="profile-button ms-auto trans me-3 my-2" onClick={()=>updateUserData("address")} ><i class="fa-solid fa-floppy-disk"></i></button>
                                                </div>
                                            ) : (
                                                useradmin ? (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    
                                                        <div className="d-flex align-items-center">
                                                            <h6 className='profile-info'>{useradmin[user_id].address}</h6>
                                                            <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("address")}>
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                        </div>
                                                  
                                                    </form>
                                                ) : (
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className='profile-info'>No data</h6>
                                                        <button className="profile-button ms-auto trans me-3 my-2" onClick={() => setEditable("address")}>
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                    </div>
                                                    </form>// Display an empty h6 element if userData doesn't exist
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
