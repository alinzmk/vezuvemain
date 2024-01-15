import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { useEffect } from 'react';
import axios from 'axios';


function Select() {

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
                                <h2 className='purple w-auto mt-3'>Proje Alanı: Müşteri İsim Soyisim</h2>
                                <img src={logo} className='sidebar-logo' alt="" />
                            </div>
                            <div className="row slideleft task-wrapper">
                               <input type='text' value={"MUSTERİ KODU VEYA ADINI YAZIN"}></input>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Select;


