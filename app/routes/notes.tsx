import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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