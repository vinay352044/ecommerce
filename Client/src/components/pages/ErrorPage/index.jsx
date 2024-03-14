import { useSelector } from 'react-redux';
import Button from '../../common/Button'
import {useNavigate} from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate();
  const {isAuth , user,seller,admin} = useSelector(state => state.role)
  const handleNavigate = () => {
    user ? navigate('/') : seller ? navigate('/seller-dashboard/pendingorders') : admin ? navigate('/admin') : navigate('/');
  }

  return (
    <div className='w-screen h-screen  bg-slate-50'>
      <div className="w-screen h-[8vh] bg-[#0295db] text-white font-bold grid place-items-center text-3xl py-3">Bac-Mart</div>
      <div className='error-container w-screen h-[92vh] flex items-center flex-col justify-center gap-5'>
        <div className="error-img w-[min(80%,460px)]">
          <img src="/images/error-img.gif" alt="404 Error | Page Not Found" className='w-full' />
        </div>
          <Button className={'bg-[#0295db] hover:bg-white mt-2 px-3 py-2 rounded-md text-white hover:text-[#0295db] border-2 border-slate-50 hover:border-[#0295db] transition'} handleClick={handleNavigate} >
          GO TO HOMEPAGE
          </Button>
      </div>
    </div>
  )
}

export default ErrorPage
