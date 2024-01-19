import { TrailerModalSliceType } from "@interfaces/ModalInterface";
import { closeModal } from "@store/slice/TrailerModalSlice";
import { useDispatch, useSelector } from "react-redux";
import TrailerModal from "./TrailerModal";

export default function Modal() {
	const modalState: TrailerModalSliceType = useSelector(
		(state: any) => state.TrailerModalReducer,
	);

	const dispatch = useDispatch();

	window.onkeydown = function (event) {
		event.stopImmediatePropagation();
		if (event.key === "Escape") dispatch(closeModal());
	};
	document.body.style.overflow = "hidden";

	return (
		(modalState.modalState === "open" && (
			<section className="modal fixed left-0 top-0 z-modal flex h-screen w-screen items-center justify-center bg-black bg-opacity-80">
				<TrailerModal />
			</section>
		)) ||
		(() => {
			window.onkeydown = null;
			document.body.style.overflow = "unset";
			return null;
		})()
	);
}
