import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { getAllUserData } from '../AdminApiService';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAdmin } from '../../redux/features/useradmin/userAdminSlice';

function SelectCustomer() {

    const [userData, setUserData] = useState(null);
    const accessToken = sessionStorage.getItem("token")
    const [selectedCustomer, setselectedCustomer] = useState('');
     
    const [searchQuery, setSearchQuery] = useState('');
    const {useradmin} = useSelector((state) => state.useradmin);
    const dispatch = useDispatch();

    const selectCustomer = (id) =>{
        sessionStorage.setItem("selectedCustomer", id);
        

    };  


  return (
    <>
        <div className="dashboard m-0">
            <div className="row d-flex ">
                <div className="p-0">
                    <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-4 d-flex justify-content-between me-5">
                                <h2 className='purple w-auto mt-3'>Müşteri Seç</h2>
                                <img src={logo} className='sidebar-logo' alt="" />
                            </div>
                            <div className="row slideleft">
                                <div className="col-3 pe-3 ps-0 ms-0">
                                    <div className="pbg ps-3 pe-3">
                                    {/* <div className="row p-search mx-auto mt-4 mb-0">
                                            <div className="col-1 my-auto ms-2 p-0">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                            <div className="col-8 p-0">
                                                <input type="text" className='product-input' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Müşteri Arayın'></input>
                                            </div>
                                            <div className="col-1 ps-auto m-auto">
                                            </div>
                                        </div> */}
                                        <hr/>
                                        <div className="row">
                                            <div className="col-12 p-0 product-list-container">
                                                <ul>
                                                    {useradmin && useradmin.map(user => (
                                                    <li key={user.user_id}
                                                        onClick={() => selectCustomer(user.user_id)}
                                                    >{user.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
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

export default SelectCustomer;


