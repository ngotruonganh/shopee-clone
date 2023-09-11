import Footer from '../../components/Footer'
import AuthHeader from '../../components/AuthHeader'

interface Props {
  children?: React.ReactNode
}
export default function LoginLayout({ children }: Props) {
  return (
    <div>
      <AuthHeader title='Đăng nhập' />
      {children}
      <Footer />
    </div>
  )
}
