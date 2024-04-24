import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import "./styles.css";

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  
  const { login, error: authError,  loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDevault();
    
    setError("");

    const user = {
      email,
      password,
    }
    
    const res = await login(user);

    console.log(res);
    
  };

  useEffect(() => {
    console.log(authError);
    if(authError){
      setError(authError);
    }
  }, [authError])
  

  return (
    <div className="login">
      <h1>Entrar</h1>
      <p>Faça o login para acessar o sistema</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="mt-20">
          {!loading && <button className="btn">Entrar</button>}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
        </div>
        {error && <p className="error"> {error}</p>}
      </form>
    </div>
  );
};
