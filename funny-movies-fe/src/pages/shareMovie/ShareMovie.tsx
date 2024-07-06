import React, { useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

interface ShareMovieProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any
}

const ShareMovie: React.FC<ShareMovieProps> = ({ socket }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleShare = async (values: { title: string, url: string, description: string; }) => {
    setLoading(true);
    try {
      await axios.post('/movie', {
        title: values.title,
        url: values.url,
        description: values.description,
      });
      message.success('Movie shared successfully');
      socket.emit('createdMovie', { title: values.title });
      navigate('/');
    } catch (error) {
      console.log(error);
      message.error('Failed to share movie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="border p-8 w-full max-w-md">
        <h2 className="text-xl mb-4">Share a Youtube movie</h2>
        <Form
          layout="vertical"
          onFinish={handleShare}
        >
          <Form.Item label="Title" name="title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </Form.Item>
          <Form.Item label="Youtube URL" name="url">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Youtube URL"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Share
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShareMovie;
