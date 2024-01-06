import Image from 'next/image'
import logo from '@/../../public/image/images.jpg'
import AuthForm from './component/AuthForm'
import { FaReact } from 'react-icons/fa'
export default function Home() {
  return (
  <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
    <FaReact size={60} className='animate-spin mx-auto text-green-700 w-auto'/>
    <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
      Sign in to your account
    </h2>
    </div>
    {/* Authform */}
    <AuthForm/>
    </div>
  )
}
