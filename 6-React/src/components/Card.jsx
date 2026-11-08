
function Card({ titulo, subtitulo, imagen, children }) {
  return (
    <article className="card">
      <img src={imagen} alt={titulo} />

      <div className="card-content">
        <h2>{titulo}</h2>
        <h3>{subtitulo}</h3>

        <div className="card-description">
          {children}
        </div>
      </div>
    </article>
  );
}

export default Card;
