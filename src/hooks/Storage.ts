export function useSession() {
	return {
		get(value: string) {
			return sessionStorage.getItem(value) ?? "";
		},
		set(key: string, value: string) {
			sessionStorage.setItem(key, value);
		},
		clear(...keys: string[]) {
			keys.forEach((key) => sessionStorage.removeItem(key));
		},
	};
}

export function useLocalStorage() {
	return {
		get(value: string) {
			return localStorage.getItem(value) ?? "";
		},
		set(key: string, value: string) {
			localStorage.setItem(key, value);
		},
	};
}
