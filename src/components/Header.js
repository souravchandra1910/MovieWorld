import React,{useContext} from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom'
import { Appstate } from '../App';
function Header() {
  const useAppstate=useContext(Appstate)
  return (
    <div className='text-3xl text-red-500 flex justify-between font-bold p-3 border-b-2 border-gray-500'>
      <Link to='/card'><span>Movie<span className='text-white'>World</span></span></Link>
      {useAppstate.login?
        <Link to='/addmovie'><h1 className='text-lg text-white cursor-pointer'>
        <button className='bg-black pr-2 btn'><AddIcon className='m-3' />
          Add New
        </button>
      </h1>
      </Link>
      :
      <Link to='/'><h1 className='text-lg text-white cursor-pointer'>
      <button className='bg-black pr-2   bg-green-400 p-2 '>
        Login
      </button>
    </h1>
    </Link>
  }
    </div>
  )
}

export default Header