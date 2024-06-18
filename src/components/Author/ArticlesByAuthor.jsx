import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axiosWithToken } from '../AxiosWithToken';

function ArticlesByAuthor() {
    const [articlesList, setArticlesList] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.userAuthorLoginReducer);

    const getArticlesOfAuthor = async () => {
        try {
            const res = await axiosWithToken.get(`author-api/articles/${currentUser.username}`);
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
        navigate(`/author-profile/article/${articleObj.articleId}`,{state:articleObj});
    };

    useEffect(() => {
        if (currentUser) {
            getArticlesOfAuthor();
        } else {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
                {articlesList.map((article) => (
                    <div className="col" key={article.articleId}>
                        <div className="card h-100 rounded">
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text ">
                                    {article.content.substring(0, 80) + "...."}
                                </p>
                                <button className="custom-btn btn-4 p-2 rounded bg-info" onClick={() => readArticle(article)} style={{ backgroundImage: "linear-gradient(to right, #6d6027, #d3cbb8)" }}>
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

export default ArticlesByAuthor;
