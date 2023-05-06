import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, {links as newNoteLinks} from "~/components/newNote/NewNote"
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

	// Add validation

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