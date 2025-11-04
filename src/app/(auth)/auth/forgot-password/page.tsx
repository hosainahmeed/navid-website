'use client'
import { Button, Form, Input, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import { useVerificationCreateMutation } from '@/app/redux/services/authApis';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const { Title, Text } = Typography

function ForgotPassword() {
  const [form] = Form.useForm();
  const [verificationCreate, { isLoading: isSignInLoading }] = useVerificationCreateMutation()
  const router = useRouter()
  const onFinish = async (values: any) => {
    try {
      const data = {
        email: values.email,
      }
      const res = await verificationCreate(data).unwrap();
      if (res?.success) {
        toast.success(res.message || 'Verification successful!');
        router.push(`/auth/verify-email?email=${values.email}`);
        return;
      }
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.message ||
        'Something went wrong while verifying!';
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
        <Title level={2} className="!mb-2 text-gray-800">
          Forgot Password
        </Title>
        <Text>Enter your email to reset your password</Text>
        <Form className='!mt-3' layout='vertical' requiredMark={false} onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input style={{ borderRadius: '0px' }} size='large' placeholder='Email' />
          </Form.Item>
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
              className='!bg-[#cc83ee] !text-white'
              size='large'
              type="primary" htmlType="submit">
              Send OTP
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword