import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

function Layout({children}: Props) {
  return (
    <div className='layout'>
        {children}
    </div>
  )
}

export default Layout