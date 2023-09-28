import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles

const FormsElements = () => {
  // eslint-disable-next-line
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log("data collected", data);
  //handlesubmit function
  const handleUpdate = () => {
    axios.put(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`, data)
    .then(function (response) {
      Swal.fire(
        'Congragulations!',
        'Congragulations, Updated successfuly!!',
        'success'
      )
      .then(function() {
        window.location = "/news";
    });
     
    })
    .catch(function (error) {
      Swal.fire(
        'Ooops!!!',
        'Something went wrong!!',
        'error'
      )
      .then(function() {
        window.location = "/news";
    });
    });
  }
  
return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update newsletter</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form >
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="title"
                      onChange={e => setData({...data, post_title: e.target.value})}
                      value={data.post_title} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                       {/* Integrate react-quill for the body field */}
                     <ReactQuill
                        value={data.post_description}
                        onChange={value => setData({...data, post_description: value})}
                        modules={{
                          toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                             {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Author</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="body"
                      onChange={e => setData({...data, post_auther: e.target.value})}
                      value={data.post_auther} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="image"
                      onChange={e => setData({...data, post_featured_image: e.target.value})}
                      value={data.post_featured_image}
                      />
                    </Form.Group>
                    <Button variant="warning" onClick={handleUpdate}>Update</Button>
                  </Form>
                </Col>
                <Col md={6}>
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={data.post_featured_image} className='w-100' alt={data.post_title} />
                </div>
                </Card.Body>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
 




   
