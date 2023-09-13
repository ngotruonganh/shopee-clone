import { Link } from 'react-router-dom'

export default function CartHeader() {
  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto'>
        <Link to='/' className='flex items-end p-5'>
          <h1 className='text-[40px] text-orange'>Shop</h1>
          <span className='ml-5 text-xl lg:text-2xl'>Giỏ Hàng</span>
        </Link>
      </div>
    </div>
  )
}
