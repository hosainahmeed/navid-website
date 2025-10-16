'use client'
import { Button, Checkbox, DatePicker, Divider, Form, Input, Typography } from 'antd'
import Link from 'next/link';
import React from 'react'
import dayjs from 'dayjs';

const { Title } = Typography

function SignUp() {
    const [form] = Form.useForm();
    const [isCheck, setIsCheck] = React.useState(false);

    const onFinish = (values: any) => {
        // Format the date to DD-MM-YYYY before sending
        const formattedValues = {
            ...values,
            date_of_birth: dayjs(values.date_of_birth).format('MM-DD-YYYY')
        };
        console.log('Received values of form:', formattedValues);
    };

    return (
        <div className='flex relative items-center justify-center h-screen'>
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
                        Create Your Account
                    </Title>
                    <Divider />

                    {/* Name Field */}
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: "Please input your full name!" }]}
                    >
                        <Input style={{ borderRadius: '0px' }} size='large' placeholder='Enter your full name' />
                    </Form.Item>

                    {/* Email Field */}
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

                    {/* Date of Birth Field */}
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

                    {/* Password Field */}
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

                    {/* Confirm Password Field */}
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

                    {/* Terms and Conditions Checkbox */}
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
                                href="/privacy-policy"
                                className="text-blue-600 hover:underline"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </Checkbox>
                    </Form.Item>

                    {/* Submit Button */}
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
                            type="primary"
                            htmlType="submit"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                {/* Link to Sign In */}
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