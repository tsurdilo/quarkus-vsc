import { ExtensionContext } from "vscode";
import {
	showGenOptions,
	genDefaultProject,
	genConfigProject,
	getDefaultGenState
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
}
