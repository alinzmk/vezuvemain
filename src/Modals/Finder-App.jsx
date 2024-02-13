import "../App.css"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { EffectCreative } from 'swiper/modules';
import { useCallback } from "react";
import { toast } from 'react-toastify';
import { warningNotification } from "./Notification";
import { getMarketFinder } from "../ApiService";

export default function App(props) {

    const accessToken = sessionStorage.getItem("token")
    const [employeeCount, setEmployeeCount] = useState("Belirtilmedi");
    const [productCategory, setProductCategory] = useState("Belirtilmedi");
    const [TurkeySalesVolume, setTurkeySalesVolume] = useState("Belirtilmedi");
    const [hasWebsite, setHasWebsite] = useState(null);
    const [hasTurkeySales, setHasTurkeySales] = useState(null);
    const [hasInternationalSales, setHasInternationalSales] = useState(null);
    const [hasStore, setHasStore] = useState(null);
    const [desiInfo, setDesiInfo] = useState(null);
    const sliderRef = useRef(null);
    const [error, setError] = useState(null);
    
    const requestData = {
      category: productCategory,
      webPage: hasWebsite,
      activeSale: hasTurkeySales,
      saleAbroad: hasInternationalSales,
      totalSale: TurkeySalesVolume,
      realShop: hasStore,
      worker: employeeCount,
    };

    const handleGetMarketFinder = async () => {
      try {
        const result = await getMarketFinder(accessToken, requestData);
        if (result.status === 200) {
          onSelectData(data.find(item => item.name ===result.marketPlaces[0]), data.find(item => item.name ===result.marketPlaces[1]));
          setEmployeeCount("Belirtilmedi")
          setProductCategory("Belirtilmedi")
          setTurkeySalesVolume("Belirtilmedi")
          setHasWebsite(null)
          setHasTurkeySales(null)
          setHasInternationalSales(null)
          setHasStore(null)
          setDesiInfo(null)

        } else {
          console.log(result.status)
        }
      } catch (error) {
        setError('Error fetching market finder data. Please try again later.');
      }
      
    };

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handlePrevto1 = useCallback((x) => {
      if (x===null || x===""){
        return;
      }
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideTo(0);
  }, []);

    const handleNext = useCallback((x) => {
        if (x===null || x==="Belirtilmedi"){
          warningNotification("Lütfen bir seçenek işaretleyiniz")
          return;
        }
        if (!sliderRef.current) return;
        console.log(x)
        sliderRef.current.swiper.slideNext();
    }, []);

 
    

  const handleSubmit = (e) => {
      e.preventDefault();

      console.log(
        "employeeCount: ",employeeCount,
        "productCategory: ",productCategory,
        "TurkeySalesVolume: ",TurkeySalesVolume,
        "hasWebsite: ",hasWebsite,
        "hasTurkeySales: ",hasTurkeySales,
        "hasInternationalSales: ",hasInternationalSales,
        "hasStore: ",hasStore,
        "desiInfo: ",desiInfo,)


      handleGetMarketFinder()
      

  };

  const { onSelectData } = props;



  return (
    <>
      <form onSubmit={handleSubmit}>
      <Swiper
        allowTouchMove={false}
        ref={sliderRef}
        grabCursor={false}
        loop={false}
        speed={1000}
        slidesPerView={1}
        pagination={{
          type: 'progressbar',
        }}
        
        navigation={false}
        modules={[Pagination, Navigation, EffectCreative]}
        style={{
          }}
        className="mySwiper"
      >
        <SwiperSlide>
            
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye’de veya yurtdışında online satışa açık, Üretimini yaptığınız veya tedarik ettiğiniz ürünlerin bulunduğu, firmanızı anlatan bir web sitesine sahip misiniz ?
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-4">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasWebsite === true}
                      onChange={() => setHasWebsite(true)}
                    />
                    <span className="radio-label">Evet, Var.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasWebsite === false}
                      onChange={() => setHasWebsite(false)}
                    />
                    <span className="radio-label">Hayır, Yok.</span>
                  </label>
              </div>
              <div className="next-arrow" onClick={()=>handleNext(hasWebsite)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye pazaryerlerinde veya sosyal medya üzerinden (Trendyol, Hepsiburada, Amazon, Pttavm, instagram, Facebook) aktif olaran e-ticaret yapıyor musunuz? 
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasTurkeySales === true}
                      onChange={() => setHasTurkeySales(true)}
                    />
                    <span className="radio-label">Evet, Yapıyorum.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasTurkeySales === false}
                      onChange={() => setHasTurkeySales(false)}
                    />
                    <span className="radio-label">Hayır, Yapmıyorum.</span>
                  </label>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasTurkeySales)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Yurtdışında online pazarlar da (Amazon, Etsy, E-bay) perakende satış veya toplu ihracat yapıyor musunuz ?                  
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasInternationalSales === true}
                      onChange={() => setHasInternationalSales(true)}
                    />
                    <span className="radio-label">Evet, Yapıyorum.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasInternationalSales === false}
                      onChange={() => setHasInternationalSales(false)}
                    />
                    <span className="radio-label">Hayır, Yapmıyorum.</span>
                  </label>


              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasInternationalSales)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                      Türkiye pazarında online veya geleneksel ticaret ile firmanızın toplam satış geliri ortalaması hangi aralıktadır?
                  </h5>
                    <select className='custom-select text-center mt-3' value={TurkeySalesVolume} onChange={(e) => setTurkeySalesVolume(parseInt(e.target.value))}>
                        <option value="">Please select an option</option>
                        <option className="" value="250000">100.000₺-250.000₺</option>
                        <option className="" value="500000">250.000₺-500.000₺</option>
                        <option className="" value="1000000">500.000₺-1.000.000₺</option>
                        <option className="" value="1000001">1.000.000₺+</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(TurkeySalesVolume)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiye de veya yurtdışında ürünlerinizi sergilediğiniz aktif satış taptığınız fiziki bir mağazanız bulunuyor mu ?                  
                  </h5>
                  <label className="custom-radio d-flex justify-content-center mt-5">
                    <input
                      type="radio"
                      value="yes"
                      checked={hasStore === true}
                      onChange={() => setHasStore(true)}
                    />
                    <span className="radio-label">Evet, Var.</span>
                  </label>
                  <label className="custom-radio d-flex justify-content-center">
                    <input
                      type="radio"
                      value="no"
                      checked={hasStore === false}
                      onChange={() => setHasStore(false)}
                    />
                    <span className="radio-label">Hayır, Yok.</span>
                  </label>


              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(hasStore)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Satışını yaptığınız ürün grubunun ana kategorisisi nedir ?
                  </h5>
                    <select className='custom-select text-center mt-3' defaultValue="Lütfen Seçiniz" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                      <option value="">Please select an option</option>
                      <option value="mobilya">Mobilya</option>
                      <option value="kozmetik">Kozmetik</option>
                      <option value="takı">Takı</option>
                      <option value="ev dekor">Ev-Dekor</option>
                      <option value="gıda">Gıda</option>
                      <option value="kıyafet">Kıyafet</option>
                      <option value="oyuncak">Oyuncak</option>
                      <option value="pet">Pet</option>
                      <option value="inşaat">İnşaat</option>
                      <option value="otomotiv">Otomotiv</option>
                      <option value="kırtasiye">Kırtasiye</option>
                      <option value="ayakkabı">Ayakkabı</option>
                      <option value="elektronik">Elektronik</option>
                      <option value="sağlık">Sağlık</option>
                      <option value="anne bebek">Anne/Bebek</option>
                      <option value="spor">Spor</option>
                      <option value="çanta">Çanta</option>
                      <option value="tarım">Tarım</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(productCategory)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Ürünleriniz ortalama hangi desi aralığındadır ?
                  </h5>
                    <select className='custom-select text-center mt-3' value={desiInfo} onChange={(e) => setDesiInfo(parseInt(e.target.value))}>
                      <option value="">Please select an option</option>
                      <option value="1">0-1 desi</option>
                      <option value="5">1-5 desi</option>
                      <option value="10">5-10 desi</option>
                      <option value="20">10-20 desi</option>
                      <option value="21">20+ desi</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <div className="next-arrow" onClick={()=>handleNext(desiInfo)}>İLERİ<i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='col-12 slide mt-5 text-center px-3'>
              <div className="col-12">
                  <h5>
                    Türkiyede ki işletmenizde tüm birimler dahil kaç tam zamanlı çalışana sahipsiniz? 
                  </h5>
                    <select className='custom-select text-center mt-3'value={employeeCount} onChange={(e) => setEmployeeCount(parseInt(e.target.value))}>
                    <option value="">Please select an option</option>
                        <option value="10">1-10</option>
                        <option value="50">11-50</option>
                        <option value="100">51-100</option>
                        <option value="101">101+</option>
                    </select>
              </div>
                <div className="prev-arrow" onClick={handlePrev}><i class="fa-solid fa-chevron-left"></i>GERİ</div>
                <button className='finder-submit mt-4' onClick={()=>handlePrevto1(employeeCount)} type="submit">PAZAR YERİ ÖNER<i class="fa-solid fa-angles-right ms-2"></i></button>
            </div>
        </SwiperSlide>
      </Swiper>
      </form>
    </>
  );
}


const data = 
[
  {   
    name: "Amazon",
    logo: 'amazon.png',
    items: [
      "ABD Yıllık Satış 314 Milyar Dolar Aylık 3 Milyar Ziyaretçi",
      "UK Yıllık Satış 30 Milyar Euro Aylık 400 milyon Ziyaretçi",
      "AVRUPA 51 Milyar Euro Yıllık Satış Aylık 800 Milyon Ziyaretçi",
      "Satıcı Sayısı: 1,9 MİLYON",
      "Popüler Pazaryerleri: YouTube, Facebook",

    ],
    flag: {
      name: 'us.png',
      opacity: 1 ,
    },
    flag2: {
      name: 'uk.png',
      opacity: 0 ,
    },
    
    city: 0 ,
    items2: [
      {"ŞİRKET KURULUMU": "200-250 dolar"},
      {"Amazon aylık kira bedeli"	: "40 DOLAR"},
      {"EAN Barkod":	"1750-5000 tl"},
      {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
      {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
      {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
    ],
    buttonText: "Uzman Ekibimiz ile Hemen Amazon'da",
    marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-guncel-amazon-ekim-tanitim-sunumu.pdf"
  },
  {   
      name: "Etsy",
      logo: 'etsy.png',
      items: [
        'Aylık Trafik: 454.2M',
        'Satıcı Sayısı: 7,5M',
        "Yıllık Ciro: 2,6 milyar ABD doları ",
        "Komisyon oranı: %6,5+3 tl Etsy paymet %6,5 satış komisyonu %1.1 Ülke kesintisi ",
        "Popüler Pazaryerleri: Pinterest, YouTube"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Etsy'de",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/09/ETSY-Vezuve-Hizmet-Tanitim-Sunumlari-Agustos-2023_compressed.pdf"
    },
    {   
      name: "Emag",
      logo: 'emag.png',
      items: [
        'Aylık Trafik: 32.6M',
        'EMAG BULGARİSTAN 5.5 M- EMAG MACARİSTAN 7.8 MİLYON TARAFİK ALIR',
        "Satıcı Sayısı: 30-32 BİN",
        "yıllık CİRO: 8.5 milyar dolarlık",
        "Popüler Pazaryerleri: Youtube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Emag'de",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {   
      name: "Allegro",
      logo: 'allegro.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {
      name: "Wayfair",
      logo: 'wayfair.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"
      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {
      name: "Zalando",
      logo: 'zalando.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {
      name: "Bol.com",
      logo: 'bolcom.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {
      name: "Ozon",
      logo: 'ozon.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    },
    {
      name: "Fruugo",
      logo: 'fruugo.png',
      items: [
        'Aylık Trafik: 213.2M',
        'Satıcı Sayısı: 135.000',
        "Yıllık Satış: 8.5 milyar dolar",
        "Yeni başlayan satıcılara 0 komisyon desteği sunmaktadır.",
        "Popüler Pazaryerleri: YouTube, Facebook"

      ],
      flag: {
        name: 'us.png',
        opacity: 1 ,
      },
      flag2: {
        name: 'uk.png',
        opacity: 0.1 ,
      },
      
      city: 0 ,
      items2: [
        {"ŞİRKET KURULUMU": "200-250 dolar"},
        {"Amazon aylık kira bedeli"	: "40 DOLAR"},
        {"EAN Barkod":	"1750-5000 tl"},
        {"Lojistik":	"50X60X60 Amazon standarlarında 10 koli 750 dolar"},
        {"Günlük reklam maliyeti	Minimum": "35-50 dolar"},
        {"Lansman Maliyeti": "Ürün fiyatlarına bağlı olarak 15-35 dolar ürün fiyatı aralığı için 500-750 dolar"},
      ],
      buttonText: "Uzman Ekibimiz ile Hemen Allegro'da",
      marketLink: "https://vezuve.com.tr/wp-content/uploads/2023/10/vezuve-eihracat-sitesi-kurulumu-guncel-tanitim-sunumu-eylul_compressed.pdf"
    }


];

