import Footer from '../../components/Footer'
import Header from '../../components/Header'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className='container mx-auto'>{children}</div>
      <Footer />
    </div>
  )
}
