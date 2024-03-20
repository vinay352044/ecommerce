import { Link } from 'react-router-dom'
import logo from "/images/png/logo-no-background.png";

const Footer = () => {
  return (
  
    <footer className="bg-[#0295db]  shadow  h-full md:h-28 mt-4  ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-3">
        <div className="flex flex-col md:flex-row items-center sm:justify-between">
          <Link to="/" >
          <div className="w-[110px] mb-3   md:mb-1">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          </Link>
          <ul className="w-full  flex flex-wrap items-center justify-between md:justify-end mb-2 text-sm font-medium text-white  gap-4 md:gap-4">
            <li>
              <Link to='/' className="hover:underline font-bold">Home</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:underline font-bold">Contact Us</Link>
            </li>
            <li>
              <Link to='/' className="hover:underline font-bold">Home</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:underline font-bold">Contact Us</Link>
            </li>
            <li>
              <Link to='/' className="hover:underline font-bold">Home</Link>
            </li>
          </ul>
        </div>
        <hr className="my-1 border-[0.75px] border-white sm:mx-auto  "  />
        <div className=' flex flex-col md:flex-row items-center'> <span className="block  mx-auto text-sm text-white sm:text-center  md:-mb-2 pt-3 md:py-2">&copy; {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Bac Mart</a> | All Rights Reserved.</span>
      </div>
        </div>
    </footer>
  );
}

export default Footer;
