import Footer from '../../components/Footer'
import AuthHeader from '../../components/AuthHeader/AuthHeader.tsx'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <AuthHeader title='Đăng kí' />
      {children}
      <Footer />
    </div>
  )
}
