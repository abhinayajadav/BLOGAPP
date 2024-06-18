import React from 'react'

function Home() {
  return (
    <div>
   <h4 className='text-center text-danger fs-2 mb-4 mt-3'>BlogApp</h4>
      <img src="https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg"  className='w-50 d-block mx-auto mb-4' alt="" />
    <p className=' ms-3  me-2 fs-4'>This web application is a platform for authors and readers, enabling article creation, management,
       and interaction. Users register and log in, with roles determining access: authors can create, edit, delete, and restore articles, while readers can comment.
        The application uses React Router for navigation, Redux for state management, and Axios for API requests. Bootstrap and custom CSS ensure a responsive and visually
         appealing UI. The dynamic interface adapts based on user actions and roles, providing a seamless experience for managing and consuming content.
</p>
    </div>
  )
}

export default Home