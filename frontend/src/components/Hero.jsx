import medicine from '../assets/medicine.jpg'
import herodoc from '../assets/HeroDoc.png'
import {scrollToProduct} from '../App.jsx'
export default function Hero() {
    return(
        <div className="relative h-50 w-full rounded-2xl sm:h-100 md:h-150 lg:200 xl:250 shadow-blue-500 overflow-hidden">
            <img src={herodoc} alt="medicine"className="w-full h-full object-cover"/>
            <h1 className='absolute top-2 left-0 px-1 font-bold text-white sm:top-3 md:top-4 sm:text-3xl md:text-5xl md:px-4 animate-pulse'>Trusted by Doctors.</h1>
            <h1 className='absolute top-6 left-0 px-1 font-bold text-white sm:top-10  md:top-16 sm:text-3xl md:text-5xl  md:px-4 animate-pulse'>Preferred by Chemists.</h1>
            <button className='absolute bottom-4 left-0 p-2 mx-2 font-bold animate-bounce duration-500 text-white md:bottom-8 md:left-8 md:text-2xl md:font-regbitcnt  bg-blue-400/30 rounded-2xl' onClick={scrollToProduct}>Explore Our Products</button>
        </div>
    )
}
