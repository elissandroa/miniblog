import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { PostDetails } from '../../components/PostDetails';

export const Home = () => {

  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className='home'>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className='search_form'>
        <input type="text"
          placeholder='Ou busque por tags...'
          name='query'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-rark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {
          posts && posts.map((post) => (
            <PostDetails post={post} key={post.id}/>
          ))
        }
        {
          posts && posts.length === 0 && (
            <div className='nopost'>
              <p>Não foram encontrados posts</p>
              <Link to={"/posts/create"} className='btn'>Criar primeiro post</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
