import Header from '#/components/base/common/header'
import { Outlet } from '@tanstack/react-router'
import React from 'react'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
