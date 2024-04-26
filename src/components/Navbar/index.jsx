import { Link, NavLink } from 'react-router-dom';
import './styles.css';

import { useAuthentication, logout } from '../../hooks/useAuthentication';

import { useAuthValue } from '../../context/AuthContext';

export const Navbar = () => {

    const user = useAuthValue();
    const { logout } = useAuthentication();

    

    return (
        <nav className='navbar'>
            <Link to={'/'} className='brand'>
                Mini <span>Blog</span>
            </Link>
            <ul className='links_list'>
                <li>
                    <NavLink to={'/'} >
                        Home
                    </NavLink>
                </li>
                {
                    user && (
                        <>
                            <li>
                                <NavLink to={'/posts/create'} >
                                    Novo post
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard'} >
                                    Dashboard
                                </NavLink>
                            </li>
                        </>
                    )
                }
                {!user && (
                    <>
                        <li>
                            <NavLink to={'/login'} >
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/register'} >
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to={'/about'} >
                        Sobre
                    </NavLink>
                </li>
                { user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    )
}
