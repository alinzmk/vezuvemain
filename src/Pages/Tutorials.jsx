import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2.jsx';
import VideoModal from '../Modals/VideoModal.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import UserPage from '../Modals/UserPage.jsx';
import { useSelector } from 'react-redux';

function Tutorials() {

    const accessToken = sessionStorage.getItem("token");

    const navigate = useNavigate();
    if(!accessToken) {
        navigate("/");
    }
    //------------------------------------------------------------------------------   
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState("");
    const {plan} = useSelector((state) => state.plan);
    //------------------------------------------------------------------------------   

    const videos = [
        { id: 1, name: "Amazon", url: ['17tn4nXVc3k', "17tn4nXVc3k", "17tn4nXVc3k", '17tn4nXVc3k', "17tn4nXVc3k", "17tn4nXVc3k"] },
        { id: 2, name: "Etsy", url: ['6yaY3bdKqVU', "6yaY3bdKqVU", "6yaY3bdKqVU", '6yaY3bdKqVU', "6yaY3bdKqVU", "6yaY3bdKqVU"] },
        { id: 3, name: "Emag", url: ['fwzoQ27Lsyc', "fwzoQ27Lsyc", "fwzoQ27Lsyc", 'fwzoQ27Lsyc', "fwzoQ27Lsyc", "fwzoQ27Lsyc"] },
        { id: 4, name: "Allegro", url: ['Vp-sFmZqumI', "Vp-sFmZqumI", "Vp-sFmZqumI", 'Vp-sFmZqumI', "Vp-sFmZqumI", "Vp-sFmZqumI"] },
        { id: 5, name: "Ozon Global", url: ['NZiD_X_K570', "NZiD_X_K570", "NZiD_X_K570", 'NZiD_X_K570', "NZiD_X_K570", "NZiD_X_K570"] },
      ];
    const openModal = (videoId) => {
        setSelectedVideoId(videoId);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setSelectedVideoId(null);
        setModalIsOpen(false);
    };
    
    const getThumbnail = (link) =>{
        return "url('https://img.youtube.com/vi/"+link+"/sddefault.jpg')";
    }
    console.log(plan)



  return (
    <>
        <VideoModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            videoId={selectedVideoId}
        />
        
        <UserPage pageName={"Dersler"}>
        {plan.currentPlan === "" ? (
                <>
                    <div className='m-auto d-flex justify-content-center mt-5'>
                        <h4>
                            <i class="fa-solid fa-triangle-exclamation"></i>  Dersleri görmek için abonelik almanız gerekmektedir. <i class="fa-solid fa-triangle-exclamation"></i>
                        </h4>
                    </div>
                </>
            ):(
                <>
                    <div className="row  justify-content-center justify-content-lg-start slideleft">
                        <div style={{overflow:"hidden"}} className='col-11 pbg videoWrapper'>
                            {videos.map((video, index) => (
                                <div className="row mt-3">
                                    <h5>{video.name} Eğitim Videoları</h5>
                                    <Swiper
                                        breakpoints={{
                                        992: {
                                            slidesPerView: 4,
                                        },
                                        }}
                                        spaceBetween={0}
                                        pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                        }}
                                        modules={[Pagination]}
                                        className=""
                                    >
                                            {video.url.map((url, idx) => (
                                        <SwiperSlide>
                                                <div key={index} className="col-12 ">
                                                    <div key={idx} style={{backgroundImage:getThumbnail(url)}} className='text-center videoInner mx-5' onClick={() => openModal(url)}>
                                                        
                                                    </div>
                                                </div>
                                        </SwiperSlide>
                                            ))}
                                            

                                    </Swiper>
                                </div>
                            ))}
                        </div>
                    </div>    
                </>
            )
        }
        </UserPage>
    </>
  );
}

export default Tutorials;
