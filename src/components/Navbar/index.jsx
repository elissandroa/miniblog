import { Link, NavLink } from 'react-router-dom';
import './styles.css';

export const Navbar = () => {

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
                <li>
                    <NavLink to={'/about'} >
                        Sobre
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
