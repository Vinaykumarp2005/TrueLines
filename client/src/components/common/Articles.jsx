import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(["Programming", "AI & ML", "Database"]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
  }, [selectedCategory, articles]);
  
  async function getArticles() {
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === 'articles') {
        setArticles(res.data.payload);
        setFilteredArticles(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error("Error fetching articles", err);
    }
  }

  function gotoArticleId(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  return (
    <div className='container '>
      <div className='d-flex justify-content-between align-items-center my-3'>
        <h2>Articles</h2>
        <select
          className='form-select w-auto dropdown'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value='all'>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        {error && <p className='text-danger text-center'>{error}</p>}
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
          {filteredArticles.map((articleObj) => (
            <div className='col' key={articleObj.articleId}>
              <div className='card h-100'>
                <div className='card-body'>
                  <div className='author-details text-end'>
                    <img src={articleObj.authorData.profileImageUrl} width='40px' className='rounded-circle' alt='' />
                    <p><small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small></p>
                  </div>
                  <h5 className='card-title'>{articleObj.title}</h5>
                  <p className='card-text'>{articleObj.content.substring(0, 80) + "..."}</p>
                  <button className='custom-btn btn-4' onClick={() => gotoArticleId(articleObj)}>Read more</button>
                  <div className='card-footer'>
                    <small className='text-body-secondary'>Last updated on {articleObj.dateOfModification}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
