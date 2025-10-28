'use client'
import { Button, Divider, Form, Input, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import { useResetPasswordMutation } from '@/app/redux/services/authApis';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const { Title, Text } = Typography

function ResetPassword() {
    const [form] = Form.useForm();
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {
            if (values.password !== values.confirm_password) {
                toast.error('Passwords do not match');
                return;
            }
            const data = {
                confirm_password: values.confirm_password,
                password: values.password
            }
            if (Cookies.get('accessToken')) Cookies.remove('accessToken');

            const res = await resetPassword(data).unwrap();
            if (res?.success) {
                if (Cookies.get('resetToken')) Cookies.remove('resetToken');
                if (res?.token) Cookies.set('accessToken', res.token);
                if (res?.data?.resetToken) {
                    Cookies.set('resetToken', res?.data?.resetToken);
                    Cookies.set('accessToken', res?.data?.token);
                    toast.success(res.message || 'Password reset successful!');
                    router.push('/');
                }
                return;
            }
        } catch (error: any) {
            const message =
                error?.data?.message ||
                error?.message ||
                'Something went wrong while resetting password!';
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
                        Reset Password
                    </Title>
                    <Text>Enter your new password</Text>
                    <Divider />

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password style={{ borderRadius: '0px' }} size='large' placeholder='Password' />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: "Please input your confirm password!" }]}
                    >
                        <Input.Password style={{ borderRadius: '0px' }} size='large' placeholder='Confirm Password' />
                    </Form.Item>
                    <Form.Item className='w-full'>
                        <Button
                            loading={isLoading}
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
                            type="primary" htmlType="submit">
                            Reset Password
                        </Button>
                    </Form.Item>
                    <Link href="/auth/sign-in" className="text-blue-600 ">
                        <h1 style={{ marginBottom: '1rem' }} className='text-center hover:underline'>Back to Sign In</h1>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default ResetPassword