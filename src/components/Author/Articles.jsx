import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../AxiosWithToken';
import './Articles.css'
function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const navigate = useNavigate();

  const getArticlesOfAuthor = async () => {
    try {
      const res = await axiosWithToken.get('user-api/articles');
      setArticlesList(res.data.payload);
    } catch (error) {
      console.error('Error fetching articles:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const readArticle = (articleObj) => {
    console.log('Navigating to article:', articleObj.articleId);
    navigate(`/user-profile/article/${articleObj.articleId}`, { state: articleObj });
  };

  useEffect(() => {
    getArticlesOfAuthor();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3  mt-5 ms-4 ">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100 m-4  rounded shadow">
              <div className="card-body">
                <h5 className="card-title ">{article.title}</h5>
                <p className="card-text ms-3 ">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <button className="btn btn-4 btn-info "  onClick={() => readArticle(article)} >
                 Read More
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {article.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
