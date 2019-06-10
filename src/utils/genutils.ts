import { window, QuickInput, ExtensionContext, QuickPickItem } from "vscode";
import { executeInTerminal } from "./quarkusterminalutils";

export interface GenState {
	title: string;
	step: number;
	totalSteps: number;
	genInfo: GenInfo;
}

export type GenInfo = {
	projectGroupId: string;
	projectArtifactId: string;
	projectVersion: string;
	className: string;
	path: string;
	extensions?: string[];
};

export function getDefaultGenState(): GenState {
	return {
		title: "",
		step: 0,
		totalSteps: 0,
		genInfo: getDefaultGenInfo()
	};
}

export function getDefaultGenInfo(): GenInfo {
	return {
		projectGroupId: "org.my.group",
		projectArtifactId: "quarkusproject",
		projectVersion: "1.0-SNAPSHOT",
		path: "/hello",
		className: "org.my.group.MyResource"
	};
}

export async function showGenOptions(
	genDefaultFunc: Function,
	genConfigFunc: Function,
	context: ExtensionContext,
	genState: GenState
): Promise<QuickInput> {
	var quickPick = window.createQuickPick();
	var items: QuickPickItem[] = [
		{
			label: "Generate default Quarkus project",
			description: "Uses default settings"
		},
		{
			label: "Configure Quarkus project",
			description: "Configure project settings"
		}
	];

	quickPick.items = items;
	quickPick.title = "Select project option";
	quickPick.onDidChangeSelection(selection => {
		if (selection[0]) {
			if (selection[0].label === items[0].label) {
				quickPick.dispose();
				confirmGen(context, genDefaultFunc, genState);
			} else if (selection[0].label === items[1].label) {
				confirmGen(context, genConfigFunc, genState);
			} else {
				window.showInformationMessage(
					`Invalid command ${selection[0]}`
				);
			}
		}
	});
	quickPick.onDidHide(() => quickPick.dispose());
	return quickPick;
}

export function genDefaultProject(
	_context: ExtensionContext,
	genState: GenState
) {
	window.showInformationMessage("Quarkus is alive -- gen default!");

	var defaultComamnd = `mvn io.quarkus:quarkus-maven-plugin:0.16.1:create \
    -DprojectGroupId=${genState.genInfo.projectGroupId} \
    -DprojectArtifactId=${genState.genInfo.projectArtifactId} \
    -DprojectVersion=${genState.genInfo.projectVersion} \
    -DclassName="${genState.genInfo.className}" \
    -Dpath="${genState.genInfo.path}"`;

	executeInTerminal(defaultComamnd, false);
}

export function genConfigProject(
	_context: ExtensionContext,
	_genState?: GenState
) {
	window.showInformationMessage("Quarkus is alive -- gen with config!");
	executeInTerminal("--version", true);
}

export function confirmGen(
	context: ExtensionContext,
	genFunction: Function,
	genState: GenState
) {
	window
		.showInformationMessage(
			"About to generate your Quarkus project. Please confirm.",
			{ modal: true },
			"Yes, generate!"
		)
		.then(answer => {
			if (answer === "Yes, generate!") {
				try {
					if (genState) {
						genFunction(context, genState);
					} else {
						genFunction(context);
					}
				} catch (e) {
					window.showInformationMessage(
						`Error generating your Quarkus project: ${e}`
					);
				}
			}
		});
}
