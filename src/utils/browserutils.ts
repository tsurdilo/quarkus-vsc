import { commands } from "vscode";

export function openInBrowser(
	protocol: string,
	host: string,
	port: number,
	path: string
) {
	let url = `${protocol}://${host}:${port}/${path}`;
	let onSuccess = () => {};
	let onError = (err: any) => {
		console.log("\n\nError Log to open Browser : ", err);
	};
	commands
		.executeCommand(`browser-preview.openPreview`, url)
		.then(onSuccess, onError);
	return;
}
