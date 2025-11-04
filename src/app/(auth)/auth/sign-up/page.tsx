'use client'
import { Button, Checkbox, DatePicker, Divider, Form, Input, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import dayjs from 'dayjs';
import { useSignUpMutation } from '@/app/redux/services/authApis';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
const { Title } = Typography

interface Isignupdata {
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    date_of_birth: string
}

function SignUp() {
    const [form] = Form.useForm();
    const [isCheck, setIsCheck] = React.useState(false);
    const [signUp, { isLoading: isSignUping }] = useSignUpMutation()
    const router = useRouter()
    

    const onFinish = async (values: Isignupdata) => {
        try {
            const { name, email, password, confirm_password, date_of_birth } = values;
            if (!name || !email || !password || !confirm_password || !date_of_birth) {
                throw new Error('Please fill in all required fields');
            }

            if (password !== confirm_password) {
                throw new Error('Passwords do not match');
            }

            const token = Cookies.get('accessToken') || Cookies.get('token') || localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (token) {
                Cookies.remove('accessToken');
                Cookies.remove('token');
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
            }

            const formattedValues = { name, email, password, confirm_password, date_of_birth: dayjs(values.date_of_birth).format('MM-DD-YYYY') };
            const res = await signUp(formattedValues).unwrap();
            if (res?.success && res?.data?.email) {
                toast.success(res.message || 'Signup successful!');
                router.push(`/auth/one-time-password?email=${res.data.email}`);
                return;
            }

        } catch (error: any) {

            const message =
                error?.data?.message ||
                error?.message ||
                'Something went wrong while signing up!';
            toast.error(message);
        }
    };


    return (
        <div className='flex relative items-center justify-center h-screen'>
            <div
                className="absolute hidden md:block inset-0 z-0"
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
                        Create Your Account
                    </Title>
                    <Divider />

                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: "Please input your full name!" }]}
                    >
                        <Input style={{ borderRadius: '0px' }} size='large' placeholder='Enter your full name' />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input style={{ borderRadius: '0px' }} size='large' placeholder='Enter your email' />
                    </Form.Item>

                    <Form.Item
                        name="date_of_birth"
                        label="Date of Birth"
                        rules={[{ required: true, message: "Please select your date of birth!" }]}
                    >
                        <DatePicker
                            style={{ borderRadius: '0px', width: '100%' }}
                            size='large'
                            placeholder='Select your date of birth'
                            format="MM-DD-YYYY"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: "Please input your password!" },
                            { min: 6, message: "Password must be at least 6 characters!" }
                        ]}
                    >
                        <Input.Password style={{ borderRadius: '0px' }} size='large' placeholder='Create a password' />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{ borderRadius: '0px' }} size='large' placeholder='Confirm your password' />
                    </Form.Item>

                    <Form.Item name="agree" valuePropName="checked">
                        <Checkbox
                            checked={isCheck}
                            onChange={(e) => setIsCheck(e.target.checked)}
                        >
                            I agree to the{' '}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                                Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="text-blue-600 hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </Checkbox>
                    </Form.Item>

                    <Form.Item className='w-full'>
                        <Button
                            style={{
                                width: '100%',
                                backgroundColor: isCheck ? 'var(--purple-light)' : '#ccc',
                                color: '#fff',
                                border: 'none',
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: isCheck ? 'pointer' : 'not-allowed',
                                borderRadius: '0px',
                            }}
                            size='large'
                            disabled={!isCheck}
                            loading={isSignUping}
                            type="primary"
                            htmlType="submit"
                            className={cn("!bg-[#D59FF0] !text-white", !isCheck && "!bg-gray-400 !text-black")}
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4">
                    <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp