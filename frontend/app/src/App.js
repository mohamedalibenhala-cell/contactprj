import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [response, setResponse] = useState("");
  const [showLink, setShowLink] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://backend:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("");

    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setResponse("Message envoyé avec succès !!");
        setShowLink(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setResponse("Erreur lors de l’envoi.");
      }
    } catch (err) {
      setResponse("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Formulaire de Contact</h1>

        <form onSubmit={handleSubmit} className="form">

          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Votre message..."
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Envoyer</button>

        </form>

        {response && <p className="response">{response}</p>}
        {/* lien visible seulement après ajout */}
        {showLink && (
          <div className="linkContainer">
            <a href={`${API_URL}/contacts`} target="_blank" rel="noreferrer">
              Voir la liste des contacts
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;