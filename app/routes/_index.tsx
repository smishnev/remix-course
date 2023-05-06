import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';
import homeStyles from '~/styles/home.css'

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const links = () => [{ rel: "stylesheet", href: homeStyles }];

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}
