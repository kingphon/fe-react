import React, { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import {
  ExpandMoreOutlined,
  ExpandLessOutlined,
  MenuOutlined,
  HomeRounded,
  RoomRounded,
  HomeWorkRounded,
  BusinessRounded
} from '@material-ui/icons';

const HorizontalSidebar = ({ navOpen, statusNav, setNavOpen }) => {

  const [menu, setMenu] = useState([
    {
      path: '/',
      icon: HomeRounded,
      text: 'Dashboard',
      active: true
    },
    {
      icon: RoomRounded,
      text: 'Location',
      active: false,
      subMenu: {
        open: false,
        items: [
          {
            path: '/province',
            icon: BusinessRounded,
            text: 'Province',
            active: false
          },
          {
            path: '/district',
            icon: HomeWorkRounded,
            text: 'District',
            active: false
          },
          {
            path: '/zone',
            icon: HomeRounded,
            text: 'Zone',
            active: false
          }
        ]
      }
    },
    // {
    //   path: '/product',
    //   icon: 'grid layout',
    //   text: 'Product',
    //   active: false,
    // subMenu: {
    //   open: false,
    //   items: [
    //     {
    //       path: '/product/category',
    //       icon: 'grid layout',
    //       text: 'Product Category',
    //       active: false
    //     },
    //     {
    //       path: '/product/type_group',
    //       icon: 'grid layout',
    //       text: 'Product Type Group',
    //       active: false
    //     },
    //     {
    //       path: '/product/type',
    //       icon: 'grid layout',
    //       text: 'Product Type',
    //       active: false
    //     },
    //     {
    //       path: '/product/brand',
    //       icon: 'grid layout',
    //       text: 'Product Brand',
    //       active: false
    //     },
    //   ]
    // }
    // },

    // {
    //   path: '/post',
    //   icon: 'newspaper outline',
    //   text: 'News',
    //   active: false,
    //   subMenu: {
    //     open: false,
    //     items: [
    //       {
    //         path: '/post/type',
    //         icon: 'grid layout',
    //         text: 'Post Type',
    //         active: false
    //       }
    //     ]
    //   }
    // },
    // {
    //   path: '/user',
    //   icon: 'group',
    //   text: 'User',
    //   active: false,
    //   subMenu: {
    //     open: false,
    //     items: [
    //       {
    //         path: '/user/group',
    //         icon: 'user',
    //         text: 'User Group',
    //         active: false
    //       }
    //     ]
    //   }
    // },
    // {
    //   path: '/promotion',
    //   icon: 'dollar sign',
    //   text: 'Promotion',
    //   active: false
    // },
    // {
    //   path: '/setting',
    //   icon: 'dollar sign',
    //   text: 'Setting',
    //   active: false
    // }
  ])

  const handleOpenSubMenu = index => {
    menu[index].subMenu.open = !menu[index].subMenu.open
    setMenu([...menu])
  }

  return (
    <div className={`main-layout--sidebar ${statusNav}`}>
      <MenuOutlined
        className={`open-close-icon ${statusNav}-nav`}
        size="large"
        color="secondary"
        onClick={() => setNavOpen(!navOpen)}
      />
      <ul style={{ textAlign: `${navOpen ? "left" : "center"}` }}>
        {
          menu.map((item, index) => (
            <li key={index}>
              {item.path ?
                (<Link to={item.path}>
                  <div>
                    <item.icon />
                    {navOpen && <span> {item.text}</span>}
                  </div>
                  {(navOpen && item.hasOwnProperty('subMenu')) &&
                    (item.subMenu.open ? <ExpandMoreOutlined onClick={() => handleOpenSubMenu(index)} /> :
                      <ExpandLessOutlined onClick={() => handleOpenSubMenu(index)} />)
                  }
                </Link>) :
                (<Link onClick={() => handleOpenSubMenu(index)}>
                  <div>
                    <item.icon />
                    {navOpen && <span> {item.text}</span>}
                  </div>
                  {(item.hasOwnProperty('subMenu')) &&
                    (item.subMenu.open ? <ExpandMoreOutlined onClick={() => handleOpenSubMenu(index)} /> :
                      <ExpandLessOutlined onClick={() => handleOpenSubMenu(index)} />)
                  }
                </Link>)
              }

              {(item.hasOwnProperty('subMenu') && item.subMenu.open) &&
                <ul className="main-layout--sidebar sub-menu">
                  {item.subMenu.items.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>
                        <item.icon />
                        {navOpen && <span>{item.text}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default HorizontalSidebar