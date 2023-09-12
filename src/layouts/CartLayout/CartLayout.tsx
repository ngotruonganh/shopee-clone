import AuthHeader from '../../components/AuthHeader'
import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children }: Props) {
  return (
    <div>
      <AuthHeader title='Giỏ Hàng' />
      {children}
      <Footer />
    </div>
  )
}
