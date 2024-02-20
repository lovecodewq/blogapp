import React from 'react'

interface ProtectedProps {
    children: React.ReactNode;
    authentication: boolean;
}

function Potected({children, authentication=true}: ProtectedProps) {
  return (
    <div>{children}</div>
  )
}

export default Potected