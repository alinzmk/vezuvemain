import React, { useEffect, useState } from "react";
import Sidebar2 from "../Modals/Sidebar2";
import logo from "../Assets/logo-renkli.png";
import mobilelogo from "../Assets/kare-logo.png";
import Whatsapp from "./Whatsapp";
import MobilSidebar2 from "./MobilSidebar2";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip, Navigation, Pagination } from "swiper/modules";

const UserPage = ({ pageName, children }) => {
  
  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { announcement } = useSelector((state) => state.announcement);
  const dispatch = useDispatch()
  if (announcement.length === 0){
    dispatch(fetchAllRedux)
  }

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 992);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  const toggleSidebar = () => {
    setNavOpen(!navOpen);
  };


  return (
    <>
      <Whatsapp/>
      <div className="main m-0">
        <div className="slideup"></div>
          <div className="row">
            <div className="p-0">
              {isMobile ? (
                <MobilSidebar2 isOpen={navOpen} toggleSidebar={toggleSidebar} />
              ) : (
                <Sidebar2 />
              )}
            </div>
            <div className="container mt-4 slideleft right">
              <div className="row justify-content-center justify-content-lg-start">
                <div className="col-12 mb-0">
                  <div>
                  <Swiper
                    loop={true}
                    speed={8000}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    navigation={false}
                    modules={[Autoplay]}
                    className="mySwiper"
                  >
                      {announcement && announcement.map((announ, index)=>
                        <SwiperSlide>
                            <h5 className="d-flex justify-content-center">{announcement[index].announcement}</h5>
                        </SwiperSlide>
                      )}
                  </Swiper>
                  </div>
                  <div className="row mb-3 me-0 me-lg-5 align-items-center">
                    <div className="col-auto p-0 d-flex">
                      <button
                        id="sideOpen"
                        className="d-block d-lg-none me-2"
                        onClick={() => setNavOpen(true)}
                      >
                        <i class="fa-solid fa-bars"></i>
                      </button>
                      <h4 className="purple w-auto m-auto">{pageName}</h4>
                    </div>
                    <div className="col text-end p-0">
                      {isMobile ? (
                        <>
                          <img
                            src={mobilelogo}
                            style={{ maxWidth: "4rem" }}
                            className="sidebar-logo"
                            alt=""
                          />
                        </>
                      ) : (
                        <>
                          <img src={logo} className="sidebar-logo" alt="" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default UserPage;
