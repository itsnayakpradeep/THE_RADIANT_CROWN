import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
const TopNav = () => {
  const dispatch = useDispatch()
  const {auth} = useSelector((state) => ({...state}))
  const history = useHistory()

  const logOut = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    window.localStorage.removeItem("auth")
    history.push("/login")
  }
  return (
      <div className='nav bg-light d-flex justify-content-between'>
        <Link className='nav-link' to='/'>
            Home - {JSON.stringify(auth)}
        </Link>
        {auth !== null && <a className='nav-link' href onClick={logOut}>LogOut</a>}
        {auth === null && (
            <>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
              <Link className='nav-link' to='/register'>
                Register
              </Link>
            </>
          )}
      </div>
    );
  };

export default TopNav;