import { useUpdateProfileMutation } from '@/app/redux/services/profileApis';
import { Button, Form, Upload } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';

function UploadIdentity() {
  const [formDocs] = Form.useForm();
  const [updateDocsMutation, { isLoading: isDocsLoading }] = useUpdateProfileMutation();

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e?.fileList ?? [];
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
        toast.error("Please upload at least one document.");
        return;
      }

      const res = await updateDocsMutation(formData as any).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Your documents have been submitted successfully!");
        formDocs.resetFields();
      } else {
        throw new Error(res?.message || "Unable to submit your documents.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <p className='my-4 text-gray-500'>
        Please upload your identity documents to verify your account. The process only takes a minute.
      </p>

      <Form layout="vertical" requiredMark={false} form={formDocs} onFinish={handleDocumentsUpdate}>
        <Form.Item
          name="documents"
          label={<span className='text-sm text-gray-500'>Upload Identity Documents(multiple files allowed)</span>}
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please select document files' }]}
        >
          <Upload listType="picture" multiple beforeUpload={() => false}>
            <Button>Select Files</Button>
          </Upload>
        </Form.Item>

        <Button
          htmlType="submit"
          size="large"
          loading={isDocsLoading}
          style={{
            borderRadius: "0px",
            padding: "10px 24px",
            fontWeight: 600,
            backgroundColor: "var(--purple-light)",
            color: "#fff",
            border: "none",
          }}
          className='!bg-[var(--purple-light)] !text-white !rounded-none'
        >
          {isDocsLoading ? "Uploading..." : "Submit Documents"}
        </Button>
      </Form>
    </div>
  );
}

export default UploadIdentity;
