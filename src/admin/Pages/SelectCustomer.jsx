import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { getAllUserData } from '../AdminApiService';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAdmin } from '../../redux/features/adminuser/userAdminSlice';
import { getPlanAdmin } from '../../redux/features/adminplan/planAdminSlice';
import { getDashAdmin } from '../../redux/features/admindash/dashAdminSlice';
import { getProductAdmin } from '../../redux/features/adminproduct/productAdminSlice';
import { getTaskAdmin } from '../../redux/features/admintask/taskAdminSlice';
import fetchAdminRedux from '../../redux/fetchAdminRedux';
import AdminPage from '../Modals/AdminPage';

function SelectCustomer() {


    const [userData, setUserData] = useState(null);
    const accessToken = sessionStorage.getItem("token")
    const [selectedCustomer, setselectedCustomer] = useState(''); 
    const [searchQuery, setSearchQuery] = useState('');

    const {useradmin} = useSelector((state) => state.useradmin);

    const dispatch = useDispatch();
    
    const selectCustomer = (id) =>{
        sessionStorage.setItem("selectedCustomer", id);
        dispatch(fetchAdminRedux())
        
    };  
    
    if(useradmin.length === 0){
        dispatch(getUserAdmin())
    }


  return (
    <>
        <AdminPage>
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
        </AdminPage>
    </>
  );
}

export default SelectCustomer;


