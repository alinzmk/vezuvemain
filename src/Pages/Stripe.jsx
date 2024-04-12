import '../App.css';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loading from '../Assets/animations/loading.json';
import { useNavigate } from 'react-router-dom';


function Stripe() {

    const accessToken = sessionStorage.getItem("token");
    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const srcParam = urlParams.get('source');
      console.log(srcParam); // This will log 'thelink' to the console
    }, []); // Empty dependency array to run the effect only once after the component mounts
  

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



export default Stripe;


