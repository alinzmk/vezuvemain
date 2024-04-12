import '../App.css';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loading from '../Assets/animations/loading.json';
import { useNavigate } from 'react-router-dom';


function Tasks() {

    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    
  return (
    <>
      <section>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
            <div className='col-12 justify-content-center text-center'>
                Lütfen Bekleyiniz... <br/>
                <Lottie style={{height:"100px"}} loop={true} animationData={loading}/>
                İşleminiz Gerçekleştiriliyor.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



export default Tasks;


