import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getRules } from '../../utils/rules'
import Input from '../../components/Input'
import { omit } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AppContext } from '../../contexts/app.context.tsx'
import { useContext } from 'react'
import { setProfile } from '../../utils/auth.ts'
import authApi from '../../apis/auth.api.ts'
import { Helmet } from 'react-helmet-async'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.register(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        toast.success(data.data.message)
        navigate('/login')
      },
      onError: () => {
        toast.error('Email đã tồn tại')
      }
    })
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng kí | Shop</title>
        <meta name='description' content='Đăng kí tài khoản' />
      </Helmet>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                rules={rules.password}
                autoComplete='on'
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                rules={rules.confirm_password}
                autoComplete='on'
              />
              <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                Đăng ký
              </button>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
