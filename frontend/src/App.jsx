import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { FaCaretSquareUp, FaKiwiBird } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import './App.css'
import Cards from './components/Cards'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ScrollNames from './components/ScrollNames';
import { useNavigate } from "react-router-dom";
import oxawin from './assets/oxawinoz.jpg';
import oraciumplus from './assets/oraciumplus.jpg';
import oraclamkid from './assets/oraclamkid.jpg';
import orcinacplus from './assets/orcinacplus.jpeg';
import orcithro500 from './assets/orcithro500.jpg';
import theofix200 from './assets/theofix200.jpg';
import Nav from './components/Nav';

export function scrollToProduct() {
  const sec = document.getElementById('pdt');
  if (sec) {
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToAbout() {
  const sec = document.getElementById('about');
  if (sec) {
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToFoot() {
  const sec = document.getElementById('foot');
  if (sec) {
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

function App() {
  const navigate = useNavigate();
  const [canScroll, setCanScroll] = useState(false)

  const [darkMode, setDarkMode] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://srihampharma.onrender.com/api/products/get");
      const data = await res.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const sTS = () => {
    scrollTo({
      top: 0,
      behaviour: 'smooth'
    })
  };




  // const scrollToNav=()=>{
  //   const 
  // }
  return (
    <>
      <nav className='min-h-20 mx-4 flex items-center justify-between'>


        {/* Logo */}
        <h1 className='font-oridubook text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-500'>S R I H A M S H I N I</h1>

        {/* Nav links - responsive */}
        <ul className={`
    ${isOpenNav ? 'block' : 'hidden'} 
    absolute top-16 left-0 w-full bg-white px-4 py-3 shadow-md z-10 font-regbitcnt text-lg
    md:static md:flex md:items-center md:gap-10 md:ml-auto md:w-auto md:bg-transparent md:shadow-none md:p-0 md:z-auto
    md:text-lg md:font-regbitcnt
  `}>
          <li onClick={scrollToFoot} className='py-2 md:py-0 cursor-pointer hover:text-yellow-400 md:hover:text-yellow-400 sm:hover:text-yellow-400 lg:hover:text-yellow-400 xl:hover:text-yellow-400'>about</li>
          <li onClick={scrollToProduct} className='py-2 md:py-0 cursor-pointer hover:text-yellow-400 md:hover:text-yellow-400 sm:hover:text-yellow-400 lg:hover:text-yellow-400 xl:hover:text-yellow-400'>products</li>
          <li onClick={scrollToFoot} className='py-2 md:py-0 cursor-pointer hover:text-yellow-400 md:hover:text-yellow-400 sm:hover:text-yellow-400 lg:hover:text-yellow-400 xl:hover:text-yellow-400'>contact</li>

          {/* Buttons on small screens inside dropdown */}
          <div className='flex flex-col gap-2 mt-2 md:hidden'>
            {/* <button onClick={() => navigate("/signup")} className='bg-blue-500 font-regbitcnt rounded-2xl h-10 w-full text-black-100 font-bold border-2 border-black hover:bg-yellow-400 hover:border-blue-500'>
              Sign up
            </button>
            <button onClick={() => navigate("/signin")} className='rounded-2xl font-regbitcnt border-2 font-bold border-blue-500 h-10 w-full hover:bg-yellow-400 hover:border-black'>
              Sign in
            </button> */}
            <Nav/>

          </div>
        </ul>
        {/* Hamburger menu - only on mobile */}
        <button
          onClick={() => setIsOpenNav(!isOpenNav)}
          className='md:hidden hover:text-yellow-400 px-4 text-3xl font-bold text-blue-500'>
          <CiMenuBurger />
        </button>

        {/* Buttons - visible on medium and larger screens */}
        <div className='px-4 hidden md:flex md:gap-4'>
          {/* <button onClick={() => navigate("/signup")} className='bg-blue-500 font-regbitcnt rounded-2xl h-10 w-20 text-black-100 font-bold flex items-center justify-center border-2 border-black hover:bg-yellow-400 hover:border-blue-500'>
            Sign up
          </button>
          <button onClick={() => navigate("/signin")} className='rounded-2xl font-regbitcnt border-2 font-bold border-blue-500 h-10 w-20 flex items-center justify-center hover:bg-yellow-400 hover:border-black'>
            Sign in
          </button> */}
          <Nav/>
        </div>
      </nav>


      {/* Hero Section */}
      <section className=' bg-white'>
        <div className='p-4'>
          <Hero />
        </div>
      </section>

      {/* ScrollNames */}
      <section className='mx-4 rounded-2xl p-5 border-2  border-blue-950 bg-blue-900/20'>
        <h1 className='m-2 font-bldbitcnt text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-500'>Our Customers are,</h1>
        <ScrollNames />
      </section>

      {/* ProductDetails */}
      <section id='pdt' className='m-4 bg-blue-500/20 p-5 rounded-2xl' >
        <div>
          <h1 className='m-2 font-bldbitcnt text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-500'>Our Products are,</h1>
        </div>
        <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 justify-between gap-5 px-10 m-4'>
          {products.map((p) => (
            <Cards
              key={p._id}
              id={p._id}
              name={p.name}
              img={p.imageUrl}
              desc={p.description}
              price={p.price}
            />
          ))}
        </div>
      </section>

      {canScroll && (
        <button
          className="fixed right-3 sm:right-4 md:right-6 xl:right-8  bottom-6 text-4xl text-gray-500 hover:text-black z-50"
          onClick={sTS}
        >
          <FaCaretSquareUp />
        </button>
      )}





      <section id='about' className='m-4 rounded-2xl p-5 border-2  border-blue-950 bg-blue-900/20'>
        <h1 className='mx-2 font-bldbitcnt text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-500'>About us,</h1>
        <h3 className='mx-4 font-regbitcnt text-xl lg:text-2xl xl:text-3xl text-blue-500'>we the SRIHAMSHINI is a pharma,where we do franchise market of Oracion Biotech</h3>
      </section>


      {/* Footer Section */}
      <footer id='foot'>
        <Footer />
      </footer>


    </>
  )
}

export default App
