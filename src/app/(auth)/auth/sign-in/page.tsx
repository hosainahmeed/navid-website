'use client'
import { Button, Divider, Form, Input, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import { useSignInMutation } from '@/app/redux/services/authApis';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
const { Title, Text } = Typography

function SignIn() {
    const [form] = Form.useForm();
    const [signIn, { isLoading: isSignInLoading }] = useSignInMutation()
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {
            const data = {
                email: values.email,
                password: values.password
            }
            if (Cookies.get('accessToken')) {
                Cookies.remove('accessToken');
            }
            const res = await signIn(data).unwrap();
            if (res?.success) {
                Cookies.set('accessToken', res.token);
                toast.success(res.message || 'Sign in successful!');
                if (window !== undefined) {
                    window.location.href === '/'
                    return false
                }
                router.push('/');
                return false;
            }
        } catch (error: any) {
            const message =
                error?.data?.message ||
                error?.message ||
                'Something went wrong while signing in!';
            toast.error(message);
        }
    };

    return (
        <div className='flex relative  items-center justify-center min-h-screen'>
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, #dadada 1px, transparent 1px),
        linear-gradient(to bottom, #dadada 1px, transparent 1px)
      `,
                    backgroundSize: "120px 120px",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
                    maskImage:
                        "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
                }}
            />
            <div className='w-lg bg-white z-10 p-6 border border-[var(--border-color)] shadow-sm py-12'>
                <Form layout='vertical' requiredMark={false} onFinish={onFinish} form={form}>
                    <Title level={2} className="!mb-2 text-gray-800">
                        Welcome Back
                    </Title>
                    <Text>Enter your email and password to sign in</Text>
                    <Divider />
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input style={{ borderRadius: '0px' }} size='large' placeholder='Email' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password style={{ borderRadius: '0px' }} size='large' placeholder='Password' />
                    </Form.Item>
                    <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                        <h1 style={{ marginBottom: '1rem' }} className='text-end'>Forgot Password?</h1>
                    </Link>
                    <Form.Item className='w-full'>
                        <Button
                            loading={isSignInLoading}
                            style={{
                                width: '100%',
                                backgroundColor: 'var(--purple-light)',
                                color: '#fff',
                                border: 'none',
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                borderRadius: '0px',
                            }}
                            size='large'
                            type="primary" htmlType="submit"
                            className="!bg-[#D59FF0] !text-white"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center mt-4">
                    <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn