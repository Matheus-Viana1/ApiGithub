import axios from "axios";
import { useState } from "react";
import "./App.css";

type GithubData = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  );

  const handlePesquisa = () => {
    axios
      .get<GithubData>(`https://api.github.com/users/${username}`)
      .then((response) => {
        setName(response.data.name || "Usuário não encontrado");
        setBio(response.data.bio || "Sem biografia disponível");
        setAvatarUrl(response.data.avatar_url);
      })
      .catch(() => {
        setName("Usuário não encontrado");
        setBio("");
        setAvatarUrl("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png");
      });
  };

  return (
    <div className="container-geral">
      <div className="container">
        <header className="header-top">|Projeto EMIDES2AM|</header>
        <main>
          <div className="form">
            <h1>Consumindo API do GitHub</h1>
            <input
              type="text"
              placeholder="Digite o usuário"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handlePesquisa}>Consultar</button>
          </div>
          <div className="conteudo">
            <div>
              <img src={avatarUrl} alt="Avatar do GitHub" />
              <h1>{name}</h1>
              <p>{bio}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
