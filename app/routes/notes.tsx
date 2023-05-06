import NewNote, {links as newNoteLinks} from "~/components/newNote/NewNote"

export const links = () => [...newNoteLinks()];

export default function NotesPage() {
	return (
		<main>
			<NewNote />
		</main>
	)
}