import '../styles/header.css'
import { useState } from 'react'

const Header = () => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <div className="header_wrapper">
                <div className="title-container">
                    <p className='title'>Polaris</p>
                </div>
            </div>
        </>
    )
}

export default Header;