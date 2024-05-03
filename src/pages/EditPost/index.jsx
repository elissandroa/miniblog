import { useState } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useEffect } from 'react';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

export const EditPost = () => {

  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    };
  }, [post])

  const navitgate = useNavigate();
  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    }

    updateDocument(id, data);
    navitgate("/dashboard");
  }

  return (
    <div className='editPost'>
      {
        post &&
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar !</p>
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
            <p className='preview_title'>
              preview da imagem:
            </p>
            <img src={post.image} alt={post.title} className="image_preview" />
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
            {!response.loading && <button className="btn">Salvar!</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      }
    </div>
  )
}
