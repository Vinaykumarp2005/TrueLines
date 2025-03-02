import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import {createBrowserRouter, Navigate,RouterProvider} from 'react-router-dom';
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import ArticleByID from './components/common/ArticleByID.jsx'
import Articles from './components/common/Articles.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import UserAuthorContext from './contexts/UserAuthorContext.jsx';


const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"signin",
        element:<Signin />
      },
      {
        path:'signup',
        element:<Signup/>
      },
      {
        path:"user-profile/:email",
        element:<UserProfile/>,
        children:[
          {
            path:"articles",
            element:<Articles />
          },{
            path:":articleid",
            element:<ArticleByID/>
          },{
            path:"",
            element:<Navigate to="articles"/>
          }
        ]
      }
   ,{
    path: "author-profile/:email",
    element: <AuthorProfile />,
    children: [
      {
        path: "articles",
        element: <Articles />
      },
      {
        path: ":articleId",
        element: <ArticleByID />
      },
      {
        path: 'article',
        element: <PostArticle />
      },
      {
        path: "",
        element: <Navigate to="articles" />
      }
    ]
   }
  ]
}
],{
  future: {
    v7_startTransition: true,  // ✅ Opt into React.startTransition()
    v7_relativeSplatPath: true, // ✅ Enable new relative route behavior
  },
}

)





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthorContext>
    <RouterProvider router={browserRouterObj}/>
    </UserAuthorContext>
  </StrictMode>,
)
