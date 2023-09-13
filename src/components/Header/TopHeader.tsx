import { Link, useNavigate } from 'react-router-dom'
import Popover from '../Popover'
import authApi from '../../apis/auth.api.ts'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context.tsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { purchaseStatus } from '../../contants/purchase.ts'
// import purchaseApi from '../../apis/purchase.api.ts'
// import noProduct from '../../assets/images/react.png'
// import { formatCurrency, generateNameId } from '../../utils/utils.ts'
import path from '../../contants/path.ts'

interface Props {
  children?: React.ReactNode
}

export default function TopHeader({ children }: Props) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      navigate('/login')
      toast.success('Đăng xuất thành công')
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  // const { data: purchasesInCartData } = useQuery({
  //   queryKey: ['purchases', { status: purchaseStatus.inCart }],
  //   queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
  //   enabled: isAuthenticated
  // })
  // const purchaseInCart = purchasesInCartData?.data.data
  return (
    <div className='pb-5 pt-2 bg-[linear-gradient(-180deg,#f53d2d,#f63)] text-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-end'>
          {/*<Popover*/}
          {/*  className='flex items-center py-1 hover:text-gray-300 cursor-pointer'*/}
          {/*  renderPopover={*/}
          {/*    <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>*/}
          {/*      <div className='flex flex-col py-2 pr-28 pl-3'>*/}
          {/*        <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>*/}
          {/*        <button className='py-2 px-3 hover:text-orange mt-2'>English</button>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  }*/}
          {/*>*/}
          {/*  <svg*/}
          {/*    xmlns='http://www.w3.org/2000/svg'*/}
          {/*    fill='none'*/}
          {/*    viewBox='0 0 24 24'*/}
          {/*    strokeWidth={1.5}*/}
          {/*    stroke='currentColor'*/}
          {/*    className='w-5 h-5'*/}
          {/*  >*/}
          {/*    <path*/}
          {/*      strokeLinecap='round'*/}
          {/*      strokeLinejoin='round'*/}
          {/*      d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*  <span className='mx-1'>Tiếng Việt</span>*/}
          {/*  <svg*/}
          {/*    xmlns='http://www.w3.org/2000/svg'*/}
          {/*    fill='none'*/}
          {/*    viewBox='0 0 24 24'*/}
          {/*    strokeWidth={1.5}*/}
          {/*    stroke='currentColor'*/}
          {/*    className='w-5 h-5'*/}
          {/*  >*/}
          {/*    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />*/}
          {/*  </svg>*/}
          {/*</Popover>*/}
          {isAuthenticated ? (
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  {/*<Link*/}
                  {/*  to='/profile'*/}
                  {/*  className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'*/}
                  {/*>*/}
                  {/*  Tài khoản của tôi*/}
                  {/*</Link>*/}
                  <Link
                    to={path.historyPurchase}
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Đơn mua
                  </Link>
                  <button
                    className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <img
                  src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div>{profile?.email}</div>
            </Popover>
          ) : (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4' />
              <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        {children}
        {/*<div className='grid grid-cols-12 gap-4 mt-4 items-end'>*/}
        {/*  <Link to='/' className='col-span-2'>*/}
        {/*    <h1 className='text-[40px] text-white'>Shop</h1>*/}
        {/*  </Link>*/}
        {/*  <form className='col-span-9'>*/}
        {/*    <div className='bg-white rounded-sm p-1 flex'>*/}
        {/*      <input*/}
        {/*        type='text'*/}
        {/*        name='search'*/}
        {/*        className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'*/}
        {/*        placeholder='Free Ship Đơn Từ 0Đ'*/}
        {/*      />*/}
        {/*      <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>*/}
        {/*        <svg*/}
        {/*          xmlns='http://www.w3.org/2000/svg'*/}
        {/*          fill='none'*/}
        {/*          viewBox='0 0 24 24'*/}
        {/*          strokeWidth={1.5}*/}
        {/*          stroke='currentColor'*/}
        {/*          className='w-6 h-6'*/}
        {/*        >*/}
        {/*          <path*/}
        {/*            strokeLinecap='round'*/}
        {/*            strokeLinejoin='round'*/}
        {/*            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'*/}
        {/*          />*/}
        {/*        </svg>*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*  <div className='cols-span-1 flex justify-center'>*/}
        {/*    <Popover*/}
        {/*      renderPopover={*/}
        {/*        <div className='p-2 w-[400px] rounded-sm border border-gray-200 bg-white absolute top-0 right-[-40px]'>*/}
        {/*          {purchaseInCart ? (*/}
        {/*            <>*/}
        {/*              <div>*/}
        {/*                {purchaseInCart.slice(0, 5).map((purchase) => (*/}
        {/*                  <Link*/}
        {/*                    to={`${path.home}${generateNameId({*/}
        {/*                      name: purchase.product.name,*/}
        {/*                      id: purchase.product._id*/}
        {/*                    })}`}*/}
        {/*                    key={purchase._id}*/}
        {/*                  >*/}
        {/*                    <div className='py-2 flex justify-between'>*/}
        {/*                      <img src={purchase.product.image} alt={purchase.product.name} className='w-[50px]' />*/}
        {/*                      <span>{purchase.product.name}</span>*/}
        {/*                      <span className='text-orange'>đ{formatCurrency(purchase.product.price)}</span>*/}
        {/*                    </div>*/}
        {/*                  </Link>*/}
        {/*                ))}*/}
        {/*              </div>*/}
        {/*              <div className='flex justify-between'>*/}
        {/*                <div>*/}
        {/*                  {purchaseInCart.length > 5 ? (*/}
        {/*                    <span> {purchaseInCart.length - 5} Thêm Hàng Vào Giỏ </span>*/}
        {/*                  ) : (*/}
        {/*                    <span></span>*/}
        {/*                  )}*/}
        {/*                </div>*/}
        {/*                <Link to={path.cart}>*/}
        {/*                  <button className='mt-20 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>*/}
        {/*                    Xem Giỏ Hàng*/}
        {/*                  </button>*/}
        {/*                </Link>*/}
        {/*              </div>*/}
        {/*            </>*/}
        {/*          ) : (*/}
        {/*            <div className='flex flex-col items-center justify-center'>*/}
        {/*              <img className='w-[200px] h-[200px]' src={noProduct} alt='no purchase' />*/}
        {/*              <p className='text-center'>Chưa có sản phẩm</p>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <Link to={path.cart}>*/}
        {/*        <div className='relative'>*/}
        {/*          <svg*/}
        {/*            xmlns='http://www.w3.org/2000/svg'*/}
        {/*            fill='none'*/}
        {/*            viewBox='0 0 24 24'*/}
        {/*            strokeWidth={1.5}*/}
        {/*            stroke='currentColor'*/}
        {/*            className='w-8 h-8'*/}
        {/*          >*/}
        {/*            <path*/}
        {/*              strokeLinecap='round'*/}
        {/*              strokeLinejoin='round'*/}
        {/*              d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'*/}
        {/*            />*/}
        {/*          </svg>*/}
        {/*          <span className='absolute top-[-5px] right-[-5px] bg-white text-orange rounded-md px-1'>{purchaseInCart?.length}</span>*/}
        {/*        </div>*/}
        {/*      </Link>*/}
        {/*    </Popover>*/}
        {/*    {purchaseInCart === undefined || purchaseInCart.length < 0 && (*/}
        {/*        <div>*/}
        {/*          fasfsakjhasdfhalskdjfhlkh*/}
        {/*        </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}
