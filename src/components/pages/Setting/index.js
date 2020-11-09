import React from 'react'
import { Link } from 'react-router-dom'

const settings = [
    {
        url: "/setting/profile",
        name: "Profile"
    },
    {
        url: "/setting/change-password",
        name: "Change Password"
    }
]

const Render = ({ children }) => (
    <div className="setting-screen">
        <ul style={{ listStyle: 'none' }}>
            {settings.map(({ url, name }, key) => (
                <li key={key} className={window.location.pathname === url ? 'active' : ''}>
                    <Link to={url}>{name}</Link>
                </li>
            ))}
        </ul>
        <div className="setting-content">
            {children}
        </div>
    </div>
)

const Setting = ({ children, ...rest }) => {
    const renderProps = {
        children,
        ...rest
    }

    return <Render {...renderProps} />
}

export default Setting