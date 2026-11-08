import { useAuth } from '../context/useAuth';
import { activities } from '../data/activities';

function Actividades() {
  const { usuario } = useAuth();

  function handleInscripcion(nombreActividad) {
    alert(`¡Te inscribiste correctamente en ${nombreActividad}!`);
  }

  return (
    <section className="actividades">
      <h1>Nuestras actividades</h1>

      {activities.map((activity) => (
        <article key={activity.id} className="actividad">
          <h2>{activity.titulo}</h2>
          <h3>{activity.subtitulo}</h3>
          <p>{activity.descripcion}</p>

          {usuario && (
            <button onClick={() => handleInscripcion(activity.titulo)}>
              Inscribirme
            </button>
          )}
        </article>
      ))}
    </section>
  );
}

export default Actividades;