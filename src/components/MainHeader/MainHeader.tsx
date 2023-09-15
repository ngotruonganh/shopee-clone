import { Link } from 'react-router-dom'
import path from '../../contants/path.ts'
import Popover from '../Popover'
import { formatCurrency, generateNameId } from '../../utils/utils.ts'
import noProduct from '../../assets/images/react.png'
import { useQuery } from '@tanstack/react-query'
import { purchaseStatus } from '../../contants/purchase.ts'
import purchaseApi from '../../apis/purchase.api.ts'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context.tsx'
import { useTranslation } from 'react-i18next'

export default function MainHeader() {
  const { t } = useTranslation()
  const { isAuthenticated } = useContext(AppContext)
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchaseInCart = purchasesInCartData?.data.data
  return (
    <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
      <Link to='/' className='col-span-2'>
        <h1 className='text-[40px] text-white'>Shop</h1>
      </Link>
      <form className='col-span-9'>
        <div className='bg-white rounded-sm p-1 flex'>
          <input
            type='text'
            name='search'
            className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
            placeholder='Free Ship Đơn Từ 0Đ'
          />
          <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </div>
      </form>
      <div className='cols-span-1 flex justify-center'>
        <Popover
          renderPopover={
            <div className='p-2 w-[400px] rounded-sm border border-gray-200 bg-white absolute top-0 right-[-40px]'>
              {purchaseInCart ? (
                <>
                  <div>
                    {purchaseInCart.slice(0, 5).map((purchase) => (
                      <Link
                        to={`${path.home}${generateNameId({
                          name: purchase.product.name,
                          id: purchase.product._id
                        })}`}
                        key={purchase._id}
                      >
                        <div className='py-2 flex justify-between'>
                          <img src={purchase.product.image} alt={purchase.product.name} className='w-[50px]' />
                          <span>{purchase.product.name}</span>
                          <span className='text-orange'>đ{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      {purchaseInCart.length > 5 ? (
                        <span> {purchaseInCart.length - 5} Thêm Hàng Vào Giỏ </span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    <Link to={path.cart}>
                      <button className='mt-20 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                        {t('Cart')}
                      </button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <img className='w-[200px] h-[200px]' src={noProduct} alt='no purchase' />
                  <p className='text-center'>Chưa có sản phẩm</p>
                </div>
              )}
            </div>
          }
        >
          <Link to={path.cart}>
            <div className='relative'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              <span className='absolute top-[-5px] right-[-5px] bg-white text-orange rounded-md px-1'>
                {purchaseInCart?.length}
              </span>
            </div>
          </Link>
        </Popover>
        {purchaseInCart === undefined || (purchaseInCart.length < 0 && <div>fasfsakjhasdfhalskdjfhlkh</div>)}
      </div>
    </div>
  )
}
