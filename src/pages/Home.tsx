import { Link } from 'react-router-dom';
import { MainNav } from '~/components';

export default function HomePage() {
  return (
    <div>
      <MainNav />
      <h1>WorldWise</h1>
      <Link to='/app'>Go to the app</Link>
    </div>
  );
}
