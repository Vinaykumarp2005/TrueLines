import { useEffect, useState } from "react";
import axios from "axios";

import {NavLink,Outlet} from 'react-router-dom'

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
        fetchArticles();
    }, []);

    async function fetchUsers() {
        try {
            const res = await axios.get("http://localhost:3000/admin-api/users-authors");
            setUsers(res.data.payload);
        } catch (err) {
            setError("Failed to load users");
        }
    }

    async function fetchArticles() {
        try {
            const res = await axios.get("http://localhost:3000/admin-api/articles");
            setArticles(res.data.payload);
        } catch (err) {
            setError("Failed to load articles");
        }
    }

    async function toggleUser(id) {
        await axios.put(`http://localhost:3000/admin-api/toggle-user/${id}`);
        fetchUsers();
    }

    async function toggleArticle(articleId) {
        await axios.put(`http://localhost:3000/admin-api/toggle-article/${articleId}`);
        fetchArticles();
    }

    return (
        <div className="container p-5">
            <h2 className="text-center  p-5">Admin Dashboard</h2>

            {error && <p className="text-danger">{error}</p>}


            <ul className='d-flex justify-content-around list-unstyled fs-3'>
            <li className='nav-item'>
                      <NavLink to='users-authors' className="nav-link">Users Authors</NavLink>
                    </li>
                    
                    <li className='nav-item'>
                      <NavLink to='articles' className="nav-link">Articles</NavLink>
                    </li>
                  </ul>
                  
{/* 
            <h3>Users & Authors</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.isActive ? "Active" : "Blocked"}</td>
                            <td>
                                <button className={`btn ${user.isActive ? "btn-danger" : "btn-success"}`} onClick={() => toggleUser(user._id)}>
                                    {user.isActive ? "Block" : "Enable"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="mt-4">Articles</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.articleId}>
                            <td>{article.title}</td>
                            <td>{article.category}</td>
                            <td>{article.authorData.nameOfAuthor}</td>
                            <td>{article.isArticleActive ? "Visible" : "Blocked"}</td>
                            <td>
                                <button className={`btn ${article.isArticleActive ? "btn-danger" : "btn-success"}`} onClick={() => toggleArticle(article.articleId)}>
                                    {article.isArticleActive ? "Block" : "Unblock"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="mt-5">
                    <Outlet/>
                  </div>
        </div>
    );
}

export default AdminDashboard;
