import image1 from "../assets/banner/aaah.png";
import image2 from "../assets/banner/ass1.png";
import image3 from "../assets/banner/absa.png";
import image4 from "../assets/banner/ad.png";
import image5 from "../assets/banner/arr.png";



import image1mobile from "../assets/banner/aaahMobile.png";
import image2mobile from "../assets/banner/ass1Mobile.png";
import image3mobile from "../assets/banner/absaMobile.png";
import image4mobile from "../assets/banner/adMobile.png";
import image5mobile from "../assets/banner/arrMobile.png";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [image1,image2,image3,image4,image5,]    
    const mobileImages = [image1mobile,image2mobile,image3mobile,image4mobile,image5mobile]

    const nextImage = ()=>{
        if (desktopImages.length - 1 > currentImage ) {
            setCurrentImage(preve => preve + 1)
        }
        
    }

    const prevImage = ()=>{
        if ( currentImage !== 0 ) {
            setCurrentImage(preve=>preve - 1)
        }   
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if (desktopImages.length - 1 > currentImage ) {
                nextImage( )
            }else{
                setCurrentImage(0)
            }

        },5000)
        return(()=>clearInterval(interval))
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
            <div className=" flex justify-between w-full text-2xl">
                <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1"><FaAngleLeft/></button>
                <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1"><FaAngleRight/></button>
            </div>
        </div>

        {/**Desktop and tablets version */}
       <div className="hidden md:flex h-full w-full overflow-hidden rounded">
            {
                    desktopImages.map((imageUrl,index)=>{
                        return(
                            <div className="w-full h-full min-w-full min-h-full overflow-hidden transition-all" key={imageUrl} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageUrl} alt="banner image1" className="w-full h-full object-cover"/>     
                            </div>
                        )
                    })
                }
       </div>

        {/**mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
            {
                    mobileImages.map((imageUrl,index)=>{
                        return(
                            <div className="w-full h-full min-w-full min-h-full transition-all" key={imageUrl} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                            <img src={imageUrl} alt="banner image1" className="w-full h-full object-cover"/>     
                        </div>
                        )
                    })
                }
       </div>
      </div>
    </div>
  )
}

export default BannerProduct
