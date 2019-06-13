import {
	window,
	workspace,
	QuickInput,
	ExtensionContext,
	QuickPickItem
} from "vscode";
import { executeInTerminal } from "./quarkusterminalutils";
import MultiStepInput from "./multistep";
import * as path from "path";
import * as fs from "fs";
import { getQuarkusExtensionsInfo } from "./quarkusextensions";

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
	addmetrics?: QuickPickItem;
	addtracing?: QuickPickItem;
	addkubernetes?: QuickPickItem;
	addhealthcheck?: QuickPickItem;
};

const metricsInfo: QuickPickItem[] = [{ label: "Yes" }, { label: "No" }];
const tracingInfo: QuickPickItem[] = [{ label: "Yes" }, { label: "No" }];
const kubernetesInfo: QuickPickItem[] = [{ label: "Yes" }, { label: "No" }];
const healthcheckInfo: QuickPickItem[] = [{ label: "Yes" }, { label: "No" }];

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
	quickPick.onDidChangeSelection(async selection => {
		if (selection[0]) {
			if (selection[0].label === items[0].label) {
				quickPick.dispose();
				await confirmGen(context, genDefaultFunc, genState);
			} else if (selection[0].label === items[1].label) {
				await genConfigFunc(context, genState);
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

export async function genDefaultProject(
	_context: ExtensionContext,
	genState: GenState
) {
	var defaultComamnd = `mvn io.quarkus:quarkus-maven-plugin:0.16.1:create \
    -DprojectGroupId=${genState.genInfo.projectGroupId} \
    -DprojectArtifactId=${genState.genInfo.projectArtifactId} \
    -DprojectVersion=${genState.genInfo.projectVersion} \
    -DclassName="${genState.genInfo.className}" \
    -Dpath="${genState.genInfo.path}"`;

	executeInTerminal(defaultComamnd, false);
}

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function genConfigProjectRun(
	_context: ExtensionContext,
	genState: GenState
) {
	var defaultComamnd = `mvn io.quarkus:quarkus-maven-plugin:0.16.1:create \
    -DprojectGroupId=${genState.genInfo.projectGroupId} \
    -DprojectArtifactId=${genState.genInfo.projectArtifactId} \
    -DprojectVersion=${genState.genInfo.projectVersion} \
    -DclassName="${genState.genInfo.className}" \
    -Dpath="${genState.genInfo.path}"`;

	await executeInTerminal(defaultComamnd, false);

	// wait for generation to write to fs
	await delay(4000);

	var rootPath = workspace.rootPath ? workspace.rootPath : __dirname;
	var isGenInDir: boolean = fs.existsSync(
		path.resolve(rootPath, genState.genInfo.projectArtifactId)
	);

	if (isGenInDir) {
		await executeInTerminal(
			`cd ${genState.genInfo.projectArtifactId}`,
			false
		);
	}

	if (
		genState.genInfo.addmetrics &&
		genState.genInfo.addmetrics.label === "Yes"
	) {
		var addMetricsCommand =
			'./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-smallrye-metrics"';
		await executeInTerminal(addMetricsCommand, false);
	}

	if (
		genState.genInfo.addtracing &&
		genState.genInfo.addtracing.label === "Yes"
	) {
		var addTracingCommand =
			'./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-smallrye-opentracing"';
		await executeInTerminal(addTracingCommand, false);
	}

	if (
		genState.genInfo.addhealthcheck &&
		genState.genInfo.addhealthcheck.label === "Yes"
	) {
		var addhealthcheck =
			'./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-smallrye-health"';
		await executeInTerminal(addhealthcheck, false);
	}

	if (
		genState.genInfo.addkubernetes &&
		genState.genInfo.addkubernetes.label === "Yes"
	) {
		var addKubernetes =
			'./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-kubernetes"';
		await executeInTerminal(addKubernetes, false);
	}
}

export async function genConfigProject(
	context: ExtensionContext,
	genState: GenState
) {
	const title = "Configure your Quarkus Project";

	async function collectInputs(): Promise<GenState> {
		await MultiStepInput.run(input => pickGroupId(input, genState));
		return genState;
	}

	async function pickGroupId(input: MultiStepInput, genState: GenState) {
		genState.genInfo.projectGroupId = await input.showInputBox({
			title,
			step: 1,
			totalSteps: 9,
			value:
				typeof genState.genInfo.projectGroupId === "string"
					? genState.genInfo.projectGroupId
					: "org.my.group",
			prompt: "Choose your project group id",
			validate: validateGenInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickArtifactId(input, genState);
	}

	async function pickArtifactId(input: MultiStepInput, genState: GenState) {
		genState.genInfo.projectArtifactId = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 9,
			value:
				typeof genState.genInfo.projectArtifactId === "string"
					? genState.genInfo.projectArtifactId
					: "quarkusproject",
			prompt: "Choose your project artifact id",
			validate: validateGenInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickVersion(input, genState);
	}

	async function pickVersion(input: MultiStepInput, genState: GenState) {
		genState.genInfo.projectVersion = await input.showInputBox({
			title,
			step: 3,
			totalSteps: 9,
			value:
				typeof genState.genInfo.projectVersion === "string"
					? genState.genInfo.projectVersion
					: "1.0-SNAPSHOT",
			prompt: "Choose your project version",
			validate: validateGenInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickPath(input, genState);
	}

	async function pickPath(input: MultiStepInput, genState: GenState) {
		genState.genInfo.path = await input.showInputBox({
			title,
			step: 4,
			totalSteps: 9,
			value:
				typeof genState.genInfo.path === "string"
					? genState.genInfo.path
					: "/hello",
			prompt: "Choose your project path",
			validate: validateGenInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickClassName(input, genState);
	}

	async function pickClassName(input: MultiStepInput, genState: GenState) {
		genState.genInfo.className = await input.showInputBox({
			title,
			step: 5,
			totalSteps: 9,
			value:
				typeof genState.genInfo.className === "string"
					? genState.genInfo.className
					: "org.my.group.MyResource",
			prompt: "Choose your project class name",
			validate: validateGenInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickAddMetrics(input, genState);
	}

	async function pickAddMetrics(input: MultiStepInput, genState: GenState) {
		const pick = await input.showQuickPick({
			title,
			step: 6,
			totalSteps: 9,
			placeholder: "Add metrics?",
			items: metricsInfo,
			activeItem:
				typeof genState.genInfo.addmetrics !== "string"
					? genState.genInfo.addmetrics
					: undefined,
			shouldResume: shouldResume
		});
		genState.genInfo.addmetrics = pick;
		return (input: MultiStepInput) => pickAddTracing(input, genState);
	}

	async function pickAddTracing(input: MultiStepInput, genState: GenState) {
		const pick = await input.showQuickPick({
			title,
			step: 7,
			totalSteps: 9,
			placeholder: "Add tracing?",
			items: tracingInfo,
			activeItem:
				typeof genState.genInfo.addtracing !== "string"
					? genState.genInfo.addtracing
					: undefined,
			shouldResume: shouldResume
		});
		genState.genInfo.addtracing = pick;
		return (input: MultiStepInput) => pickAddKubernetes(input, genState);
	}

	async function pickAddKubernetes(
		input: MultiStepInput,
		genState: GenState
	) {
		const pick = await input.showQuickPick({
			title,
			step: 8,
			totalSteps: 9,
			placeholder: "Add Kubernetes support?",
			items: kubernetesInfo,
			activeItem:
				typeof genState.genInfo.addkubernetes !== "string"
					? genState.genInfo.addkubernetes
					: undefined,
			shouldResume: shouldResume
		});
		genState.genInfo.addkubernetes = pick;
		return (input: MultiStepInput) => pickAddHealtCheck(input, genState);
	}

	async function pickAddHealtCheck(
		input: MultiStepInput,
		genState: GenState
	) {
		const pick = await input.showQuickPick({
			title,
			step: 9,
			totalSteps: 9,
			placeholder: "Add Health Check?",
			items: healthcheckInfo,
			activeItem:
				typeof genState.genInfo.addhealthcheck !== "string"
					? genState.genInfo.addhealthcheck
					: undefined,
			shouldResume: shouldResume
		});
		genState.genInfo.addhealthcheck = pick;
	}

	await collectInputs();
	confirmGen(context, genConfigProjectRun, genState);
}

export async function confirmGen(
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
		.then(async answer => {
			if (answer === "Yes, generate!") {
				try {
					if (genState) {
						await genFunction(context, genState);
					} else {
						await genFunction(context);
					}
				} catch (e) {
					window.showInformationMessage(
						`Error generating your Quarkus project: ${e}`
					);
				}
			}
		});
}

export async function confirmInstallExtension(
	context: ExtensionContext,
	installFunction: Function,
	extensionid: string
) {
	window
		.showInformationMessage(
			`About to add Quarkus extension ${extensionid}. Please confirm.`,
			{ modal: true },
			"Yes, add!"
		)
		.then(async answer => {
			if (answer === "Yes, add!") {
				try {
					await installFunction(context, extensionid);
				} catch (e) {
					window.showInformationMessage(
						`Error adding Quarkus extension: ${e}`
					);
				}
			}
		});
}

export async function confirmStartInDevMode(
	context: ExtensionContext,
	startFunction: Function
) {
	window
		.showInformationMessage(
			`About to start Quarkus app in dev mode. Please confirm.`,
			{ modal: true },
			"Yes, start!"
		)
		.then(async answer => {
			if (answer === "Yes, start!") {
				try {
					await startFunction(context);
				} catch (e) {
					window.showInformationMessage(`Error starting app: ${e}`);
				}
			}
		});
}

async function validateGenInput(name: string) {
	await new Promise(_resolve => setTimeout(_resolve, 1000));
	return name.length < 1 ? "Invalid input" : undefined;
}

function shouldResume() {
	// Could show a notification with the option to resume.
	return new Promise<boolean>((_resolve, _reject) => {});
}

export function isQuarkusProject(): boolean {
	var rootPath = workspace.rootPath ? workspace.rootPath : __dirname;
	var havePom: boolean = fs.existsSync(path.resolve(rootPath, "pom.xml"));
	var haveMvnw: boolean = fs.existsSync(path.resolve(rootPath, "mvnw"));
	var haveMvnwCmd: boolean = fs.existsSync(
		path.resolve(rootPath, "mvnw.cmd")
	);

	return havePom && (haveMvnw || haveMvnwCmd);
}

export async function showExtensions(
	genInstallFunction: Function,
	context: ExtensionContext
): Promise<QuickInput> {
	var quickPick = window.createQuickPick();
	var items: QuickPickItem[] = getQuarkusExtensionsInfo();

	quickPick.items = items;
	quickPick.title = "Select extension to add";
	quickPick.onDidChangeSelection(async selection => {
		if (selection[0]) {
			await confirmInstallExtension(
				context,
				genInstallFunction,
				selection[0].label
			);
		} else {
			window.showErrorMessage(`Invalid extension ${selection[0]}`);
		}

		quickPick.dispose();
	});
	quickPick.onDidHide(() => quickPick.dispose());
	return quickPick;
}

export async function installExtension(
	_context: ExtensionContext,
	extensionid: string
) {
	var defaultComamnd = `./mvnw quarkus:add-extension -Dextensions="${extensionid}"`;
	await executeInTerminal(defaultComamnd, false);
}

export async function startDevMode(_context: ExtensionContext) {
	if (isQuarkusProject()) {
		await confirmStartInDevMode(_context, startAppInDevMode);
	} else {
		window.showErrorMessage(
			"Unable to start app - not inside a Quarkus project"
		);
	}
}

export async function startAppInDevMode() {
	var devStartCommand = "./mvnw compile quarkus:dev -Dquarkus.http.port=8081";
	await executeInTerminal(devStartCommand, false);
}
