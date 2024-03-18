
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input } from 'antd';
import { User, Post } from '../components/types';
import '../App.css'
interface UserPostsProps {
  selectedUser: User | null;
}

const UserPosts: React.FC<UserPostsProps> = ({ selectedUser}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  // retrevial the posts of the selected user
  // and parse the data to json into the array

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (selectedUser) {
      fetchPosts();
    }
  }, [selectedUser]);

  const handleAddPost = () => {
    // Add a new post when form is submitted
    form.validateFields().then((values) => {
      const newPost = {
        userId: selectedUser!.id,
        id: posts.length + 1,
        title: values.title,
        body: values.body,
      };
      setPosts([...posts, newPost]);
      setModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Card title={selectedUser?.name || ''} loading={!posts.length}>
        {posts.map(post => (
          <Card.Grid key={post.id}>{post.body}</Card.Grid>
        ))}
      </Card>

      <Button className='buttonPost' onClick={() => setModalVisible(true)}>Add Post</Button>
      
      <Modal
        title="Add Post"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddPost}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[{ required: true, message: 'Please enter the body' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
 
    </div>
  );
};
export default UserPosts;

