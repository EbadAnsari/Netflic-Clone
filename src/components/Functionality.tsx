export default function Functionality() {
	return (
		<div className="fixed right-0 top-0 z-50 cursor-pointer select-none">
			<div
				className="border border-transparent bg-slate-900 bg-opacity-10 px-5 py-2 text-xl text-white hover:border hover:border-white hover:bg-opacity-70"
				onClick={() => {
					sessionStorage.clear();
				}}
			>
				Session
			</div>
			<div
				className="border border-transparent bg-slate-900 bg-opacity-10 px-5 py-2 text-xl text-white hover:border hover:border-white hover:bg-opacity-70"
				onClick={() => {
					localStorage.clear();
				}}
			>
				LocalStorage
			</div>
		</div>
	);
}
