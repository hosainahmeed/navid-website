"use client";

import { useEffect } from "react";
import { Button, Card, Form, Input, message } from "antd";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function SettingsSection({ data }: { data: any }) {
    const [formInfo] = Form.useForm();
    const [formPassword] = Form.useForm();


    useEffect(() => {
        if (data) {
            formInfo.setFieldsValue({
                name: data?.name,
                email: data?.email,
                phone: data?.phone,
            });

        }
    }, [data, formInfo]);


    const handleInfoUpdate = (values: any) => {
        console.log("Updated Info:", values);
        message.success("Information updated successfully!");
    };

    const handlePasswordChange = (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }
        console.log("Password Changed:", values);
        message.success("Password changed successfully!");
        formPassword.resetFields();
    };

    return (
        <div>
            <Card
                variant="outlined"
                headStyle={{ backgroundColor: "#EDEDED", borderBottom: "1px solid var(--border-color)" }}
                title={<span className="font-semibold text-lg">Add Tax ID</span>}
                className="shadow-sm"
                style={{ borderRadius: "0px" }}
            >
                <Form requiredMark={false} layout="vertical">
                    <Form.Item name="tax_id" label="Tax ID">
                        <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your tax id" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large" type="default"
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: "600",
                            }}
                            htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Information Update */}
                <Card
                    variant="outlined"
                    headStyle={{ backgroundColor: "#EDEDED", borderBottom: "2px solid var(--border-color)" ,borderRadius:"0px"}}
                    title={<span className="font-semibold text-lg">Information Update</span>}
                    style={{ borderRadius: "0px" }}
                >
                    <Form requiredMark={false} layout="vertical" form={formInfo} onFinish={handleInfoUpdate}>
                        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                            <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your name" />
                        </Form.Item>

                        <Form.Item name="phone" label="Phone">
                            <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your phone number" />
                        </Form.Item>

                        <Form.Item name="email" label="Email">
                            <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your email" disabled />
                        </Form.Item>

                        <Button
                            htmlType="submit"
                            size="large"
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: "600",
                            }}
                        >
                            Update Information
                        </Button>
                    </Form>
                </Card>

                {/* Change Password */}
                <Card
                    variant="outlined"
                    headStyle={{ backgroundColor: "#EDEDED", borderBottom: "2px solid var(--border-color)", borderRadius: "0px" }}
                    title={<span className="font-semibold text-lg">Change Password</span>}
                    style={{ borderRadius: "0px" }}
                >
                    <Form
                        requiredMark={false}
                        layout="vertical"
                        form={formPassword}
                        onFinish={handlePasswordChange}
                    >
                        <Form.Item
                            name="oldPassword"
                            label={<b>Old Password</b>}
                            rules={[{ required: true, message: "Please enter your old password" }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Enter old password" />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            label={<b>New Password</b>}
                            rules={[{ required: true, message: "Please enter new password" }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Enter new password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={<b>Confirm Password</b>}
                            rules={[{ required: true, message: "Please confirm new password" }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Confirm new password" />
                        </Form.Item>

                        <Button
                            htmlType="submit"
                            size="large"
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: "600",
                            }}
                        >
                            Change Password
                        </Button>
                    </Form>
                </Card>
            </div>
            
        </div>
    );
}
