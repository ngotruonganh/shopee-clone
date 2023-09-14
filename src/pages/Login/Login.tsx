import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import { useForm } from 'react-hook-form'
import { getRules } from '../../utils/rules.ts'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api.ts'
import { toast } from 'react-toastify'
import { AppContext } from '../../contexts/app.context.tsx'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = data
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        toast.success(data.data.message)
        navigate('/')
      },
      onError: () => {
        toast.error('Email hoặc password không đúng')
      }
    })
  })

  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng nhập | Shop</title>
        <meta name='description' content='Đăng nhập tài khoản' />
      </Helmet>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                defaultValue='guest@gmail.com'
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                rules={rules.email}
              />
              <Input
                defaultValue='123456'
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on'
                rules={rules.password}
              />
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
