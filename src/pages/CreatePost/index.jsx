import { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthentication } from '../../hooks/useAuthentication';


export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const navitgate = useNavigate();
  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,

    });
    console.log("user:", user);
  }

  return (
    <div className='createPost'>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento !</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name='title'
            placeholder='Pense em um bom título'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name='image'
            placeholder='Insira uma imagem que representa o seu post.'
            required
            value={image}
            onChange={(e) => setImage(e.target.value)} />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            type="text"
            name='body'
            placeholder='Insira o conteúdo do post'
            required
            value={body}
            onChange={(e) => setBody(e.target.value)} />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name='tags'
            placeholder='inisra as tags separadas por vírgula'
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
}
