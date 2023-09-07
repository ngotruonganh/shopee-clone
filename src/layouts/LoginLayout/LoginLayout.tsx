import React from 'react'
import Footer from '../../components/Footer'
import LoginHeader from "../../components/LoginHeader";

interface Props {
  children?: React.ReactNode
}
export default function LoginLayout({ children }: Props) {
  return (
    <div>
      <LoginHeader />
      RegisterLayout
      {children}
      <Footer />
    </div>
  )
}
