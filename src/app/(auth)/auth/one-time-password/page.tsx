'use client'
import { useVerificationCreateMutation, useVerifyOtpMutation } from '@/app/redux/services/authApis';
import { Button, Form, Input, Typography } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import Cookies from 'js-cookie';
const { Title } = Typography

function OneTimePassword() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation()
    const [verificationCreate, { isLoading: isVerificationCreating }] = useVerificationCreateMutation()
    const [form] = Form.useForm();
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {
            if (!email) {
                throw new Error('Email is required!');
            }
            if (!values.code) {
                throw new Error('Code is required!');
            }
            const data = {
                email,
                code: values.code
            }
            const res = await verifyOtp(data).unwrap();
            if (res?.success) {
                console.log(res)
                alert(res.message || 'Verification successful!');
                if (Cookies.get('accessToken')) {
                    Cookies.remove('accessToken');
                }
                Cookies.set('accessToken', res?.data?.token);
                router.push('/');
                return;
            }
        } catch (error: any) {
            console.log(error)
            const message =
                error?.data?.message ||
                error?.message ||
                'Something went wrong while verifying OTP!';
            alert(message);
        }
    };

    const handleResend = async () => {
        try {
            if (!email) {
                throw new Error('Email is required!');
            }
            const data = {
                email,
            }
            const res = await verificationCreate(data).unwrap();
            if (res?.success) {
                alert(res.message || 'Verification successful!');
                return;
            }
        } catch (error: any) {
            console.log(error)
            const message =
                error?.data?.message ||
                error?.message ||
                'Something went wrong while verifying OTP!';
            alert(message);
        }
    }

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
            <div className='w-lg bg-white z-10 p-6 border border-[var(--border-color)] shadow-sm'>
                <Form layout='vertical' requiredMark={false} onFinish={onFinish} form={form}>
                    <Title level={2} className="!mb-2 text-gray-800">
                        Enter code
                    </Title>
                    <p className='text-gray-600 text-sm mb-5'>
                        Sent to {email}
                    </p>
                    <Form.Item
                        name="code"
                        rules={[{ required: true, message: "Please input your code!", max: 6, min: 6 }]}
                    >
                        <Input style={{ borderRadius: '0px' }} size='large' placeholder='Code' maxLength={6} />
                    </Form.Item>
                    <Form.Item className='w-full'>
                        <Button
                            loading={isVerifyOtpLoading}
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
                                marginTop: '1rem'
                            }}
                            size='large'
                            type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <span
                    onClick={handleResend}
                    className='text-[var(--purple-light)] hover:underline cursor-pointer'>{isVerificationCreating ? 'Resending...' : 'Resend code'}</span>
            </div>
        </div>
    )
}

export default OneTimePassword