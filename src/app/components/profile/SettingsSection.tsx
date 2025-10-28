"use client";

import { useEffect } from "react";
import { Button, Card, Form, Image, Input, message, Upload } from "antd";
import { imageUrl } from "@/app/utils/imagePreview";
import { useUpdateProfileMutation } from "@/app/redux/services/profileApis";
import { useChangePasswordMutation } from "@/app/redux/services/authApis";
import toast from "react-hot-toast";

export default function SettingsSection({ data }: { data: any }) {
    const [formInfo] = Form.useForm();
    const [formPassword] = Form.useForm();
    const [formImg] = Form.useForm();
    const [formDocs] = Form.useForm();
    const [formTax] = Form.useForm();
    // Separate mutation instances so each button has its own loading state
    const [updateInfoMutation, { isLoading: isInfoLoading }] = useUpdateProfileMutation();
    const [updateImgMutation, { isLoading: isImgLoading }] = useUpdateProfileMutation();
    const [updateDocsMutation, { isLoading: isDocsLoading }] = useUpdateProfileMutation();
    const [updateTaxMutation, { isLoading: isTaxLoading }] = useUpdateProfileMutation();
    const [changePasswordMutation, { isLoading: isChangePasswordLoading }] = useChangePasswordMutation();

    useEffect(() => {
        if (data) {
            formInfo.setFieldsValue({
                name: data?.name,
                email: data?.email,
                phone: data?.phone,
            });
            formTax.setFieldsValue({
                tax_id: data?.tax_id ?? "",
            });

        }
    }, [data, formInfo, formTax]);

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        return e?.fileList ?? [];
    };

    const handleInfoUpdate = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("name", values?.name ?? "");
            formData.append("phone", values?.phone ?? "");
            const res = await updateInfoMutation(formData as any).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Information updated successfully!");
            } else {
                throw new Error(res?.message || 'Failed to update profile');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Failed to update profile");
        }
    };

    const handleProfileImgUpdate = async (values: any) => {
        try {
            const formData = new FormData();
            const profileFile = values?.profile_img?.[0]?.originFileObj as File | undefined;
            if (profileFile) {
                formData.append("img", profileFile);
            } else {
                toast.error("Please select an image");
                return;
            }
            const res = await updateImgMutation(formData as any).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Profile image updated successfully!");
                formImg.resetFields();
            } else {
                throw new Error(res?.message || 'Failed to update profile image');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Failed to update profile image");
        }
    };

    const handleDocumentsUpdate = async (values: any) => {
        try {
            const formData = new FormData();
            if (Array.isArray(values?.documents) && values.documents.length > 0) {
                values.documents.forEach((f: any) => {
                    if (f?.originFileObj) {
                        formData.append("documents", f.originFileObj as File);
                    }
                });
            } else {
                toast.error("Please select document files");
                return;
            }
            const res = await updateDocsMutation(formData as any).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Documents updated successfully!");
                formDocs.resetFields();
            } else {
                throw new Error(res?.message || 'Failed to update documents');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Failed to update documents");
        }
    };

    const handleTaxIdUpdate = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('tax_id', values?.tax_id ?? '');
            const res = await updateTaxMutation(formData as any).unwrap();
            if (res?.success) {
                toast.success(res?.message || 'Tax ID updated successfully!');
            } else {
                throw new Error(res?.message || 'Failed to update Tax ID');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Failed to update Tax ID');
        }
    };

    const handlePasswordChange = async (values: any) => {
        if (values.newPassword !== values.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const payload = {
                old_password: values.oldPassword,
                password: values.newPassword,
                confirm_password: values.confirmPassword,
            };
            const res = await changePasswordMutation(payload as any).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Password changed successfully!");
                formPassword.resetFields();
            } else {
                throw new Error(res?.message || 'Failed to change password');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || "Failed to change password");
        }
    };

    return (
        <div>
            {/* Profile Image */}
            <Card
                variant="outlined"
                headStyle={{ backgroundColor: "#EDEDED", borderBottom: "1px solid var(--border-color)", borderRadius: "0px" }}
                title={<span className="font-semibold text-lg">Profile Image</span>}
                style={{ borderRadius: "0px", marginBottom: 16 }}
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Select New Profile Image</h1>
                    <div className="flex items-center gap-4 mb-4">
                        {data?.img && (
                            <Image
                                src={imageUrl({ image: data.img })}
                                alt="Current profile"
                                className="border border-[var(--border-color)] p-1 max-h-[120px] object-contain"
                                style={{ width: "auto" }}
                            />
                        )}
                    </div>
                </div>
                <Form layout="vertical" requiredMark={false} form={formImg} onFinish={handleProfileImgUpdate}>
                    <Form.Item
                        name="profile_img"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please select a profile image' }]}
                    >
                        <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                            <Button>Select Profile Image</Button>
                        </Upload>
                    </Form.Item>
                    <Button htmlType="submit" size="large" loading={isImgLoading} style={{ borderRadius: "0px", padding: "8px 20px", fontWeight: 600 }}>Update Profile Image</Button>
                </Form>
            </Card>

            {/* Documents */}
            <Card
                variant="outlined"
                headStyle={{ backgroundColor: "#EDEDED", borderBottom: "1px solid var(--border-color)", borderRadius: "0px" }}
                title={<span className="font-semibold text-lg">Documents</span>}
                style={{ borderRadius: "0px" }}
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Upload Documents</h1>
                    <div className="flex items-center flex-wrap gap-2 mb-4">{Array.isArray(data?.documents) && data.documents.length > 0 ? (
                        data.documents.map((url: string, index: number) => (
                            <Image
                                key={index}
                                src={imageUrl({ image: url })}
                                alt={`Document ${index + 1}`}
                                className="p-1 inset-0 max-h-[200px] object-contain aspect-video border border-[var(--border-color)]"
                                style={{ width: "auto" }}
                            />
                        ))
                    ) : (
                        <p className="text-center flex h-24 items-center justify-center">No documents submitted</p>
                    )}
                    </div>
                </div>
                <Form layout="vertical" requiredMark={false} form={formDocs} onFinish={handleDocumentsUpdate}>
                    <Form.Item
                        name="documents"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'Please select document files' }]}
                    >
                        <Upload listType="picture" multiple beforeUpload={() => false}>
                            <Button>Select Documents</Button>
                        </Upload>
                    </Form.Item>
                    <Button htmlType="submit" size="large" loading={isDocsLoading}
                        style={{
                            borderRadius: "0px",
                            padding: "8px 20px",
                            fontWeight: 600,
                            backgroundColor: "var(--purple-light)",
                            color: "#fff",
                            border: "none",
                        }}>Update Documents</Button>
                </Form>
            </Card>
            <Card
                variant="outlined"
                headStyle={{ backgroundColor: "#EDEDED", borderBottom: "1px solid var(--border-color)" }}
                title={<span className="font-semibold text-lg">Add Tax ID</span>}
                className="shadow-sm"
                style={{ borderRadius: "0px" }}
            >
                <Form requiredMark={false} layout="vertical" form={formTax} onFinish={handleTaxIdUpdate}>
                    <Form.Item name="tax_id" label="Tax ID">
                        <Input style={{ borderRadius: "0px" }} size="large" placeholder="Enter your tax id" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            size="large" type="default"
                            loading={isTaxLoading}
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: 600,
                                backgroundColor: "var(--purple-light)",
                                color: "#fff",
                                border: "none",
                            }}
                            htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Information Update */}
                <Card
                    variant="outlined"
                    headStyle={{ backgroundColor: "#EDEDED", borderBottom: "2px solid var(--border-color)", borderRadius: "0px" }}
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
                            loading={isInfoLoading}
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: 600,
                                backgroundColor: "var(--purple-light)",
                                color: "#fff",
                                border: "none",
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
                            loading={isChangePasswordLoading}
                            style={{
                                borderRadius: "0px",
                                padding: "8px 20px",
                                fontWeight: 600,
                                backgroundColor: "var(--purple-light)",
                                color: "#fff",
                                border: "none",
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
