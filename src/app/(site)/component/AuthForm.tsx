"use client";
import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Inputs";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { RiLoader4Fill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const {status} = useSession()
  const {push} = useRouter()
  const [variant, setvariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() =>{
    if(status == 'authenticated'){
       push('/users')
    }
  },[status , push])
  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setvariant("REGISTER");
    } else {
      setvariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSumbit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant == "REGISTER") {
      axios.post('/api/register' , data)
      .then(() => signIn('credentials' , data))
      .catch(() => toast.error('Something Went Wrong'))
      .finally(() => setLoading(false))
    } else if (variant == "LOGIN") {
     signIn('credentials' , {   
      ...data,
      redirect:false
     })
     .then((callback) => {
      if(callback?.error){
        toast.error('Invaid Email And Password')
      }
     else if(callback?.ok && !callback.error){
        toast.success('Logged in')
        push('/users')
      }
     })
     .finally(() => setLoading(false))
    }
  };
  const socialAction = (action: string) => {
    setLoading(true);
    signIn(action , { redirect: false})
    .then((callback) => {
     if(callback?.error){
      toast.error('invaid cridential')
     }
     else if (callback?.ok && !callback.error){
    toast.success('login')
     }
    })
    .finally(() => setLoading(false))
  }


  return (
    <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSumbit)}>
          {variant == "REGISTER" && (
            <Input
              id="name"
              label="Username"
              register={register}
              errors={errors}
              disable={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disable={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disable={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
           { isLoading ? <RiLoader4Fill className='animate-spin my-auto mr-3'/>:null}
              {variant == "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
              <AuthSocialButton 
              icon={BsGithub}
              onClick={() => socialAction('github')}
              />
                <AuthSocialButton 
              icon={BsGoogle}
              onClick={() => socialAction('google')}
              />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
             <div>
              {variant == 'LOGIN' ? 'New to Messenger?' : 'Already have acount?'}
             </div>
             <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant == 'LOGIN' ? 'Create an account' : 'Login'}
             </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
