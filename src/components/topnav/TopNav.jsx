import React from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'
import user_image from '../../assets/images/tuat.png'

import user_menu from '../../assets/JsonData/user_menus.json'
import { useSessionStorage } from '../../pages/useSessionStorage';



const curr_user = {
    display_name: 'Tuat Tran',
    image: user_image
}

const renderUserToggle = (user,nomUser) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {nomUser}
        </div>
    </div>
)



const Topnav = () => {
    const [isLogged, setLoggin] = useSessionStorage('login', false);
    const [nomUser, setNomUser] = useSessionStorage('nom', 0);
    function logout(){
        window.location.reload(false);
        setLoggin(false);
    }
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='' />
                <i className='bx bx-search'>  </i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user,nomUser)}
                        contentData={user_menu}
                        renderItems={(item, index) => <Link  key={index} onClick={logout} to='/login'>Logout</Link>}
                        
                    />
                </div>

                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}

export default Topnav