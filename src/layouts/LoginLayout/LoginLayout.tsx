import AuthHeader from '../../components/AuthHeader'
// import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}
export default function LoginLayout({ children }: Props) {
  return (
    <div>
      <AuthHeader title='Đăng nhập' />
      {children}
      {/*<Footer />*/}
    </div>
  )
}
