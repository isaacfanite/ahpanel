// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
//import Pic from 'https://res.cloudinary.com/dw90vkmoc/image/upload/v1687554830/slider5_qzhkuc.jpg';
// ** Third Party Components
import classnames from 'classnames'
import { Grid, CheckSquare, MessageSquare } from 'react-feather'
import { useFetch } from "../../../hooks/useSWR";


// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs/Gallery'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap'


// ** Styles
import '@styles/base/pages/page-blog.scss'

const BlogList = () => {
  const { GetGallery } = useFetch();
  const { data: Gallery } = GetGallery();
  // ** States

  const renderRenderList = () => {
    return Gallery?.map((gallery, index) => {
      return (
        <Col md='6'>
          <Card>
            <Link to={`/pages/blog/detail/12`}>
              <CardImg className='img-fluid' src={gallery.gallery_image} alt="The Best Features Coming to iOS and Web design" top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>Catergory: 
                <Badge
                className={classnames('me-50')}
                color='light-warning'
                pill
              >
                {gallery.gallery_catergory}
              </Badge>
              </CardTitle>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
              <UncontrolledButtonDropdown>
                  <DropdownToggle color='primary' className='btn-icon btn-round dropdown-toggle'>
                    <Grid size={14} /> Actions
                  </DropdownToggle>
                  <DropdownMenu tag='ul' end>
                    <DropdownItem tag={Link} to={`/delete?id=${gallery._id}&route=gallerys`}>
                      <MessageSquare className='me-1' size={14} />
                      <span className='align-middle'>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs data={[{ title: 'Articles' }]} />
      <div className='blog-wrapper'>
          <div className='content-body'>
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                
              </div>
          </div>
        </div>
    </Fragment>
  )
}

export default BlogList
