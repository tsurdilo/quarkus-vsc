import { window, ExtensionContext } from "vscode";
import {
	showGenOptions,
	genDefaultProject,
	genConfigProject,
	getDefaultGenState,
	isQuarkusProject,
	showExtensions,
	installExtension,
	startDevMode
} from "../utils/genutils";

export namespace QuarkusModule {
	export async function generateProject(
		context: ExtensionContext
	): Promise<void> {
		var quickInput = await showGenOptions(
			genDefaultProject,
			genConfigProject,
			context,
			getDefaultGenState()
		);
		quickInput.show();
	}

	export async function runInDevMode(
		context: ExtensionContext
	): Promise<void> {
		startDevMode(context);
	}

	export async function enableExtension(
		_context: ExtensionContext
	): Promise<void> {
		if (isQuarkusProject()) {
			var quickInput = await showExtensions(installExtension, _context);
			quickInput.show();
		} else {
			window.showErrorMessage(
				"Unable to add extension - not inside a Quarkus project"
			);
		}
	}
}
