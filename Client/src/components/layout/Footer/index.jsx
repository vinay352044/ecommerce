import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#0295db] rounded-lg shadow m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-3">
        <div className="flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-2 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/images/svg/logo-black.svg" className="w-[10rem] h-[10rem] rounded-md" alt="Bac Mart Logo" />
          </Link>
          <ul className="mx-auto flex flex-wrap items-center mb-2 text-sm font-medium text-white sm:mb-0  gap-4">
            <li>
              <Link to='/' className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
        <hr className="my-1 border-gray-200 sm:mx-auto  lg:my-1"  />
        <span className="block  mx-auto text-sm text-gray-500 sm:text-center -mb-2 ">&copy; {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">Bac Mart</a> | All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
