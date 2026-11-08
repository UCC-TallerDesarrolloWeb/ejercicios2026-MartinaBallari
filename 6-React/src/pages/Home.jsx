
import Card from '@components/Card';
import { activities } from '../data/activities';
import '../styles/Home.css';

function Home() {
  return (
    <main className="home">
      <h1>Bienvenidos a Gym App</h1>

      <p className="home-description">
        Conocé nuestras actividades y encontrá la que más te guste.
      </p>

      <section className="activities-container">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            titulo={activity.titulo}
            subtitulo={activity.subtitulo}
            imagen={activity.imagen}
          >
            <p>{activity.descripcion}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Home;
