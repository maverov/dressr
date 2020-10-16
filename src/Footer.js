import React from 'react'

function Footer() {
    return (
        <div style={{display: "flex", justifyContent: "center", margin: "43px 0", marginTop: "60px"}}>
            Copyright &copy; Hristiyan Maverov {new Date().getFullYear()}
        </div>
    )
}

export default Footer
