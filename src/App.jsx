import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RootLayout from './components/Navigation/RootLayout';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from './components/UserProfile';
import AuthorProfile from './components/Author/AuthorProfile';
//import AddArticle from './components/Author/AddArticle';
import ArticlesByAuthor from './components/Author/ArticlesByAuthor';
import Articles from './components/Author/Articles';
import Article from './components/Author/Article';
import { useSelector } from 'react-redux';
import { Suspense,lazy } from 'react';
import Errorpage from './components/Errorpage';
const  AddArticle=lazy(()=>import('./components/Author/AddArticle'))
function App() {
  const { currentUser } = useSelector(state => state.userAuthorLoginReducer);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement:<Errorpage/>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "user-profile",
          element: <UserProfile />,
          children: [
            {
              path: 'articles',
              element: <Articles />
            },
            {
              path: 'article/:articleId',
              element: <Article />
            }
          ]
        },
        {
          path: "author-profile",
          element: <AuthorProfile />,
          children: [
            {
              path: 'new-article',
              element: <Suspense fallback="Loading..."><AddArticle /></Suspense>
            },
            {
              path: "articles-by-author/:author",
              element: <ArticlesByAuthor />
            },
            {
              path: "article/:articleId",
              element: <Article />
            },
            {
              path: '',
              element: <Navigate to={`articles-by-author/${currentUser?.username}`} />
            }
          ]
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
