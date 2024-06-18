import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { axiosWithToken } from "../AxiosWithToken";
import EditIcon from '@mui/icons-material/Edit';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import AddCommentIcon from '@mui/icons-material/AddComment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Article() {
  const { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  const { register, handleSubmit, reset } = useForm();
  const { state } = useLocation();
  const [articleEdit, setArticleEdit] = useState(false);
  const navigate = useNavigate();
  let [currentArticle, setCurrentArticle] = useState(state || {});

//let [currentArticle,setCurrentArticle]=useState(state)
  // Provide default values if state is null or undefined
  const article = state || {};
  const [comments, setComments] = useState(article.comments || []);

  const ISOtoUTC = (isoString) => {
    const date = new Date(isoString);
    return date.toUTCString();
  };

  // Enable edit state
  const enableEditState = () => {
    setArticleEdit(true);
  };

  // Modify article function
  const ModifiedArticle = async (editedArticle) => {
    let updatedArticle = { ...state, ...editedArticle };
    updatedArticle.dateOfModification = new Date();
    delete updatedArticle._id;

    try {
      // Save updated article
      let res = await axiosWithToken.put(`http://localhost:4000/author-api/articles`, updatedArticle);
      if (res.data.message === "Article updated") {
        setArticleEdit(false);
        navigate(`/author-profile/article/${updatedArticle.articleId}`, { state: res.data.article });
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const deleteArticle = async () => {
    let art = { ...currentArticle };
    delete art._id;
    try {
      let res = await axiosWithToken.put(`http://localhost:4000/author-api/articles/${currentArticle.articleId}`, art);
      if (res.data.message === 'Article deleted') {
        setCurrentArticle({ ...currentArticle, status: res.data.payload });
        navigate(`/author-profile/articles-by-author/${currentUser.username}`)
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  
  const restoreArticle = async () => {
    let art = { ...currentArticle };
    delete art._id;
    try {
      let res = await axiosWithToken.put(`http://localhost:4000/author-api/articles/${currentArticle.articleId}`, art);
      if (res.data.message === 'Article restored') {
        setCurrentArticle({ ...currentArticle, status: res.data.payload });
      }
    } catch (error) {
      console.error("Error restoring article:", error);
    }
  };

  // Writing comments by user
  const addCommentByUser = async (commentObj) => {
    commentObj.username = currentUser.username;
    try {
      const res = await axiosWithToken.post(`http://localhost:4000/user-api/comments/${article.articleId}`, commentObj);
      if (res.data.message === 'comments posted') {
        reset(); // Reset comment form
        setComments([...comments, commentObj]); // Update comments state with new comment
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!article.dateOfCreation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {articleEdit === false ? (
        <>
          <div className="d-flex justify-content-between ms-4">
            <div>
              <p className="display-3 me-4  mt-3 ms-2">{article.title || "No Title"}</p>
              <span className="py-3">
                <small className=" text-secondary me-4">
                  <FaRegCalendarAlt className="me-3 fs-3" />
                  Created on: {ISOtoUTC(article.dateOfCreation)}
                </small>
                <small className=" text-secondary">
                  <AccessTimeIcon className="me-3 fs-3"/>
                  Modified on: {ISOtoUTC(article.dateOfModification)}
                </small>
              </span>
            </div>
            <div>
              {currentUser.userType === "author" && (
                <>
                  <span className="me-2" onClick={enableEditState}>
                    <button>
                      <EditIcon className="me-2 fs-3"/>
                    </button>
                  </span>
                  <button onClick={deleteArticle} className="btn-danger"> 
                      <DeleteForeverIcon className="me-2 fs-3"/>
                    </button>
                </>
              )}
            </div>
          </div>
          <p className="lead mt-3 ms-4" style={{ whiteSpace: "pre-line" }}>
            {article.content || "No content available"}
          </p>
          {/* user comments */}
          <div>
            {comments.length === 0 ? (
              <p className="fs-4 ms-3">No comments posted yet...</p>
            ) : (

              comments.map((commentObj, ind) => (
                <div key={ind} className="bg-light p-3 mb-2">
                  <div className="d-flex justify-content">
                  
                  <p className="fs-5 fw-bold">{commentObj.username}</p>
                  </div>
                  <p className="mb-0">{commentObj.comment}</p>
                </div>
              ))
            )}
            {/* write comment by user */}
            {currentUser.userType === "user" && (
              <form onSubmit={handleSubmit(addCommentByUser)}>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4 mt-2 ms-3 w-75"
                  placeholder="Write comment here...."
                />
                <button type="submit" className="btn btn-success ms-4">
                <AddCommentIcon  className="me-2 fs-3"/>
                  Add Comment
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(ModifiedArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                    defaultValue={article.title}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                    defaultValue={article.category}
                  >
                    <option value="programming">Programming</option>
                    <option value="AI&ML">AI&ML</option>
                    <option value="database">Database</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                    defaultValue={article.content}

                  ></textarea>
                </div>

                <div className="text-end text-black ">
                  <button type="submit" className="text-black btn-success">
                    Save
                  </button>
                </div>
              </form>
      )}
    </div>
  );
}

export default Article;
