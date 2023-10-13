import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [post_title, setTitle] = useState('');
  const [post_auther, setAuthor] = useState('');
  const [post_description, setDescription] = useState('');
  const [post_featured_image, setImage] = useState('');

  // Use useParams to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Check if the responseData is not null
        if (responseData) {
          setData(responseData);
          setTitle(responseData.post_title);
          setAuthor(responseData.post_auther);
          setDescription(responseData.post_description);
          setImage(responseData.post_featured_image);
        } else {
          // Handle the case when responseData is null
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, [id]);

  // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_title,
        post_auther,
        post_description, // Send updated content as is
        post_featured_image,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response or perform any additional actions
        
        toast.success('Article updated successfully');
        window.location = "/articles";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
        window.location = "/articles";
      });
  };

  return (
    <div className='blog-edit-wrapper'>
      <Row>
        <Col sm='12'>
          <Card>
            <CardBody>
              {data && (
                <>
                  <Form className='mt-2'>
                    <Row>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Title
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={post_title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-slug'>
                          Author
                        </Label>
                        <Input
                          id='blog-edit-slug'
                          value={post_auther}
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Content</Label>
                        <ReactQuill
                          value={post_description}
                          onChange={(value) => setDescription(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <div className='border rounded p-2'>
                          <h4 className='mb-1'>Featured Image</h4>
                          <div className='d-flex flex-column flex-md-row'>
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={post_featured_image}
                              alt='featured img'
                              width='170'
                              height='110'
                            />
                            <div>
                              <small className='text-muted'>
                                Required image resolution 800x400, image size 10mb.
                              </small>
                              <p className='my-50'>
                                <a href='/' onClick={(e) => e.preventDefault()}>
                                  {post_featured_image}
                                </a>
                              </p>
                              <div className='d-inline-block'>
                                <div className='mb-0'>
                                  <Input
                                    type='file'
                                    accept='.jpg, .png, .gif'
                                    onChange={(e) => setImage(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit}>
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
