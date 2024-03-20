"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newError = {}

    if (!email.trim()) {
      newError.email = 'Email is required'
    }
    if (password.length === 0) {
      newError.password = 'Password is required'
    }

    setErrors(newError)
    return Object.keys(newError).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!validateForm()) {
        setLoading(false)
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (user) {
        toast.success('Login successful')
        router.push('/')
      }

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen p-10 m-2'>
      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-2xl shadow-lg p-10'>
        <h1 className='text-2xl text-center font-semibold text-white'>Login</h1>
        <div>
          <label className='label'>
            <span className='text-base label-text'>Email</span>
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full input input-bordered' placeholder='Enter your email' />
          {errors.email && <span className='text-sm text-red-600'>{errors.email}</span>}
        </div>
        <div>
          <label className='label'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full input input-bordered' placeholder='Enter your password' />
          {errors.password && <span className='text-sm text-red-600'>{errors.password}</span>}
        </div>
        <div>
          <button className='btn btn-block bg-[#0b3a]'>
            {loading ? <span className='loading loading-spinner loading-sm'></span> : 'Login'}
          </button>
        </div>
        <span>
          Don't have an account?{' '}
          <Link href='/register' className='text-blue-700 hover:underline hover:text-blue-900'>
            Register
          </Link>
        </span>
      </form>
    </div>
  )
}

export default Page