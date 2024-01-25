import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { getAllUserData } from '../AdminApiService';

function Products() {

    const [users, setUsers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const accessToken = ""; //access token

      const filteredProducts = users.filter((user) =>
      user.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchData = async () => {
        try {
          const result = await getAllUserData(accessToken);
          setUsers(result.userData);
        } catch (error) {
          // Handle error
        }
      };

    useEffect(() => {
        
        fetchData()
        .then((response) => {
            console.log('Login successful!', response);
        })
        .catch((error) => {
            console.error('Fetch Data', error);
        });
            
    }, []);
    

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

                                    <div className="row p-search mx-auto mt-4 mb-0">
                                        <div className="col-1 my-auto ms-2 p-0">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                        <div className="col-8 p-0">
                                            <input type="text" className='product-input' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Müşteri Arayın'></input>
                                        </div>
                                        <div className="col-1 ps-auto m-auto">
                                        
                                            
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-12 p-0 product-list-container">
                                        <ul className='product-list'>
                                        {filteredProducts.map(product => (
                                            <li 
                                            key={product.id} 
                                            className={`product-item ${selectedProduct === product.id ? 'product-active' : ''}`}
                                            onClick={() => setSelectedProduct(product.id)}
                                            >
                                            {product.productName}
                                            </li>
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

export default Products;


