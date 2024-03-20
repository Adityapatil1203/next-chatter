"use client";

import { useState, useEffect } from "react";
import { auth, firestore } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { AvatarGenerator } from "random-avatar-generator";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const router = useRouter()

  const generateRandomAvatar = () => {
    const generator = new AvatarGenerator();
    return generator.generateRandomAvatar();
  }

  const handleRefresh = () => {
    setAvatarUrl(generateRandomAvatar())
  }

  useEffect(() => {
    setAvatarUrl(generateRandomAvatar())
  }, [])

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const newError = {}

    if (!name.trim()) {
      newError.name = 'Name is required'
    }
    if (!email.trim()) {
      newError.email = 'Email is required'
    }
    if (password.length === 0) {
      newError.password = 'Password is required'
    }
    if (password !== confirmPassword) {
      newError.confirmPassword = 'Password not matched'
    }

    setErrors(newError)
    return Object.keys(newError).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {

      if (!validateForm()) {
        setLoading(false)
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      const docRef = doc(firestore, 'users', user.uid)

      await setDoc(docRef, {
        name,
        email,
        avatarUrl
      })

      toast.success('Register successful')
      router.push('/')
      setErrors({})
      setLoading(false)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }


  return (
    <div className='flex justify-center items-center h-screen p-10 m-2' >

      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-2xl shadow-lg p-10 '>
        <h1 className='text-2xl text-center font-semibold text-white' >Sign Up</h1>

        <div className='flex items-center space-y-2 justify-between border border-gray-300 p-2'>
          {typeof window !== 'undefined' && <img src={avatarUrl} alt="avatar" className='rounded-full h-20 w-20  ' />}
          <button onClick={handleRefresh} className='btn btn-outline' >New Avatar</button>
        </div>

        <div>
          <label className='label' >
            <span className='text-base label-text' >Name</span>
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full input input-bordered ' placeholder='Enter your name' />

          {
            errors.name && <span className='text-sm text-red-600 '>{errors.name}</span>
          }
        </div>

        <div>
          <label className='label' >
            <span className='text-base label-text' >Email</span>
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full input input-bordered ' placeholder='Enter your email' />

          {
            errors.email && <span className='text-sm text-red-600 '>{errors.email}</span>
          }
        </div>

        <div>
          <label className='label' >
            <span className='text-base label-text' >Password</span>
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full input input-bordered ' placeholder='Enter your password' />

          {
            errors.password && <span className='text-sm text-red-600 '>{errors.password}</span>
          }
        </div>

        <div>
          <label className='label' >
            <span className='text-base label-text' >Confirm Password</span>
          </label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className=' w-full input input-bordered ' placeholder='Enter your confirm Password' />

          {
            errors.confirmPassword && <span className='text-sm text-red-600 '>{errors.confirmPassword}</span>
          }
        </div>

        <div>
          <button className='btn btn-block bg-[#0b3a] ' >{
            loading ? <span className='loading loading-spinner loading-sm ' ></span> : 'Register'
          }</button>

        </div>

        <span>Already have an account?{' '}
          <Link href='/login' className='text-blue-700 hover:underline hover:text-blue-900 '>
            Login
          </Link>
        </span>


      </form>

    </div>
  )
}

export default Page