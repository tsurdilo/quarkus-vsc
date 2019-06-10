"use strict";
import * as vscode from "vscode";
import { Progress } from "vscode";
import { loadPackageInfo } from "./utils/contextutils";
import { QuarkusModule } from "./modules/quarkusmodule";

export async function activate(
	context: vscode.ExtensionContext
): Promise<void> {
	await loadPackageInfo(context);
	await doActivate(context);
}

async function doActivate(context: vscode.ExtensionContext): Promise<void> {
	registerCommand(context, "quarkus.generate", async () => {
		await vscode.window.withProgress(
			{ location: vscode.ProgressLocation.Notification },
			async (p: Progress<{}>) => {
				p.report({ message: "generating Quarkus project ..." });
				await QuarkusModule.generateProject(context);
				p.report({ message: "finished." });
			}
		);
	});
}

function registerCommand(
	context: vscode.ExtensionContext,
	commandName: string,
	func: (...args: any[]) => any
): void {
	context.subscriptions.push(
		vscode.commands.registerCommand(commandName, func)
	);
}

export function deactivate() {}
