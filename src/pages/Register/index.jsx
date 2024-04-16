import { useAuthentication } from '../../hooks/useAuthentication';
import './styles.css';
import { useState, useEffect } from 'react';

export const Register = () => {

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();


  const resetFields = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return
    }

    const res = await createUser(user);

    if (!authError) {
      resetFields();
    }


  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError])


  return (
    <div className='register'>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name='displayName'
            required
            placeholder='Nome do usuário'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name='email'
            required
            placeholder='E-mail do usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name='password'
            required
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </label>
        <label>
          <span>Confirmação:</span>
          <input
            type="password"
            name='confirmPassword'
            required
            placeholder='Confirme sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

        </label>
        <div className='mt-20'>
          {!loading && <button className='btn'>Cadastrar</button>}
          {loading && <button className='btn' disabled >Aguarde...</button>}
        </div>
        {error && <p className="error"> {error}</p>}
      </form>
    </div>
  )
}
