// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import classnames from 'classnames'

// ** Third Party Components
import { useFetch } from "../../hooks/useSWR";

// ** Custom Components

// ** Reactstrap Imports

const BlogSidebar = () => {
  const { GetSuccess } = useFetch();
  const { data: Stories } = GetSuccess();
  // ** States

  const renderRecentPosts = () => {
    return Stories?.map((stories, index) => {
      return (
        <><div
          key={index} className={classnames('d-flex')}
        >
          <Link className='me-2' to={`/stories/detail/${stories._id}`}>
            <img className='rounded' src={stories.image} alt={stories.title} width='100' height='70' />
          </Link>
          <div>
            <h6 className='blog-recent-post-title'>
              <Link className='text-body-heading' to={`/stories/detail/${stories._id}`}>
                {stories.title}
              </Link>
            </h6>
          </div>
        </div><br></br></>
      )
    })
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
              <Fragment>
                <div className='blog-recent-posts mt-3'>
                  <h6 className='section-label'>Recent Posts</h6>
                  <div className='mt-75'>{renderRecentPosts()}</div>
                </div>
              </Fragment>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
