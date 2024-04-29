import { useParams } from 'react-router-dom'
import './styles.css'
import { useFetchDocument } from '../../hooks/useFetchDocument';


export const Post = () => {

    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className='post_container'>
            {loading && <p>Carrendo post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className='tags'>
                        {
                            post.tagsArray.map((tag) => (
                                <>
                                   <p><span>#</span>{tag}</p>
                                </>
                            ))
                        }
                    </div>

                </>
            )}
        </div>
    )
}
