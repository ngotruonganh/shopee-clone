import { Link } from 'react-router-dom'

interface Props {
  title: string
}

export default function AuthHeader({ title }: Props) {
  return (
    <header className='py-5'>
      <div className='max-w-7xl mx-auto px-4'>
        <nav className='flex items-end'>
          <Link to='/'>
            <h1 className='text-[40px] text-orange'>Shop</h1>
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{title}</div>
        </nav>
      </div>
    </header>
  )
}
