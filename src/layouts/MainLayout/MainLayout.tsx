import TopHeader from '../../components/Header'
import MainHeader from '../../components/MainHeader'
// import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <>
      <TopHeader>
        <MainHeader />
      </TopHeader>
      <div className='max-w-7xl mx-auto'>{children}</div>
      {/*<Footer />*/}
    </>
  )
}
