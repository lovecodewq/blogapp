import React from 'react'

interface LogoProps {
    width?: string;
}
function Logo({ width = "100%" }: LogoProps) {
    return (
        <img src=' ' style={{ width }} alt='Logo placeholder' />
    )
}

export default Logo