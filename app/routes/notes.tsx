import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import NewNote, {links as newNoteLinks} from "~/components/NewNote/NewNote"
import NewList, {links as newNoteListLinks} from "~/components/NoteList/NoteList"
import { getStoredNotes, storeNotes } from '~/data/notes';

export const links = () => [...newNoteLinks(), ...newNoteListLinks()];

export async function action ({request}: any) {
	const formData = await request.formData();

	// The same like code below
	// const noteData = {
	// 	title: formData.get('title'),
	// 	content: formData.get('content'),
	// }
	const noteData = Object.fromEntries(formData)

	// Validation
	if (noteData.title.trim().length < 5) {
		return { message: 'Invalid title - must be at least 5 characters long'}
	}

	const existingNotes = await getStoredNotes();
	noteData.id = new Date().toISOString();
	const updateNotes = existingNotes.concat(noteData);
	await storeNotes(updateNotes);

	return redirect('/notes')

}

export async function loader() {
	const notes = await getStoredNotes();

	if (!notes || notes.length === 0) {
		throw json(
		  { message: 'Could not find any notes.' },
		  {
			status: 404,
			statusText: 'Not Found',
		  }
		);
	  }

	return notes;
}

export default function NotesPage() {
	const notes = useLoaderData();
	return (
		<main>
			<NewNote />
			<NewList notes={notes} />
		</main>
	)
}

export function CatchBoundary() {
	const caughtResponse = useCatch();
  
	const message = caughtResponse.data?.message || 'Data not found.';
  
	return (
	  <main>
		<NewNote />
		<p className='info-message'>{message}</p>
	  </main>
	);
  }

export function ErrorBoundary ({error}: {error: Error}) {	
	return (
		<main className="error">
			<h1>An error ocurred!</h1>
			<p>{error?.message || 'Error'}</p>
			<p>
				Bsck to <Link to="/">safety</Link>
			</p>
		</main>
	)
}