import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import './topnav.css'

import {Link, useNavigate} from 'react-router-dom'
import i18n from "../../locales/i18n";
import Dropdown from '../dropdown/Dropdown'
import vietnamflag from '../../assets/img/vietnam-flag-icon.svg'
import englandFlag from '../../assets/img/united-kingdom-flag-icon.svg'
import UserService from "../../services/UserService";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slice/authSlice";
import {toast} from "react-toastify";

const notifications = [
    {
        "icon": "bx bx-error",
        "content": "lỗi thôi"
    },
    {
        "icon": "bx bx-package",
        "content": "lỗi thôi"
    },
    {
        "icon": "bx bx-cart",
        "content": "lỗi thôi"
    },
    {
        "icon": "bx bx-error",
        "content": "lỗi thôi"
    },
    {
        "icon": "bx bx-cart",
        "content": "lỗi thôi"
    }
]

const curr_user = {
    display_name: 'Admin',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser_font_awesome.svg&psig=AOvVaw1AvJu4X8PcS6tL7rtP8Cmj&ust=1678888764027000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCND8-pbK2_0CFQAAAAAdAAAAABAE'
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt=""/>
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to={item.href} key={index} >
        <div className="notification-item" onClick={item.onClick}>
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    const [language, setLanguage] = useState('en');
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutAdmin = () => {
        UserService.logout().then(() => {
            dispatch(logout());
            toast.success(t('logout_success'));

            navigate('/login');
        });
    }
    const switchLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
    };
    const user_menu = [
        {
            "icon": "bx bx-user",
            "content": "Profile",
            "href": "/profile"
        },
        {
            "icon": "bx bx-wallet-alt",
            "content": "My Wallet",
            "href": "/wallet"
        },
        {
            "icon": "bx bx-cog",
            "content": "Settings",
            "href": "/settings"
        },

        {
            "icon": "bx bx-log-out-circle bx-rotate-180",
            "content": "Logout",
            "href": "/login",
            "onClick": logoutAdmin

        }
    ]
    const languageChange = [
        {
            "icon": englandFlag,
            "content": "English",
            "value": "en"
        },
        {
            "icon": vietnamflag,
            "content": "Vietnamese",
            "value": "vi"

        }
    ]

    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...'/>
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <div>
                        <Dropdown
                            icon='bx bx-world'
                            contentData={languageChange.map(item => item.content
                            )}
                            renderItems={(item, index) => (
                                <div className="notification-item" key={index}
                                     onClick={() => switchLanguage(languageChange[index].value)}>
                                    <div className="notification-item__icon">
                                        <img src={languageChange[index].icon} style={{
                                            width: '25px',
                                            marginRight: '10px'
                                        }}/>
                                    </div>
                                    {item}
                                    {languageChange[index].value === language && <i className="bx bx-check"></i>}


                                </div>
                            )}
                        />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Topnav