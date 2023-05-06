import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';
import styles from '~/styles/note-details.css';

type notesPropsItem = {
	id: string;
	title: string;
	content: string;
}

export const meta: V2_MetaFunction = ({data}) => {
  return [{ title: data.title }];
};

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }: LoaderArgs) {
  const notes: notesPropsItem[] = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find(note => note.id === noteId);

if(!selectedNote) {
  throw json({message: `could not find note for is ${noteId}`}, {status: 404})
}

  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}