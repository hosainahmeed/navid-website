"use client";

import { Button, Card, Form, Input, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function SettingsSection() {
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleChange = (e: any) => {
        if (e.file.status === "done") {
            setAvatar(e.file.response.url);
        }
    };

    return (
        <div>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Card style={{ borderRadius: "0px" }}>
                    <Form layout="vertical">
                        <Form.Item>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                showUploadList={false}
                                onChange={handleChange}
                            >
                                {avatar ? <img src={avatar} alt="avatar" className="w-24 h-24 rounded-full" /> : <PlusOutlined />}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{
                                    backgroundColor: "#ec4899",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0px",
                                    padding: "8px 16px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease-in-out",
                                }}
                                htmlType="submit">Upload Profile Image</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="Information Update" style={{ borderRadius: "0px" }}>
                    <Form layout="vertical">
                        <Form.Item>
                            <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your name" />
                        </Form.Item>
                        <Form.Item>
                            <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your phone" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{
                                    backgroundColor: "#ec4899",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0px",
                                    padding: "8px 16px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease-in-out",
                                }}
                                htmlType="submit">Update Information</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="Change Password" style={{ borderRadius: "0px" }}>
                    <Form requiredMark={false} layout="vertical">
                        <Form.Item
                            name="oldPassword"
                            label={<b>Old Password</b>}
                            rules={[{ required: true }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Enter old password" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            label={<b>New Password</b>}
                            rules={[{ required: true }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Enter new password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label={<b>Confirm Password</b>}
                            rules={[{ required: true }]}
                        >
                            <Input.Password style={{ borderRadius: "0px" }} size="large" placeholder="Confirm password" />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{
                                    backgroundColor: "#ec4899",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "0px",
                                    padding: "8px 16px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease-in-out",
                                }}
                                size="large" htmlType="submit">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
}
