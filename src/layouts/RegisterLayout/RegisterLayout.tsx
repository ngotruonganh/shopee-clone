import AuthHeader from '../../components/AuthHeader/AuthHeader.tsx'
// import Footer from '../../components/Footer'

interface Props {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <AuthHeader title='Đăng kí' />
      {children}
      {/*<Footer />*/}
    </div>
  )
}
