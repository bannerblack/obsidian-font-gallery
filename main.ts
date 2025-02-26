import {
	App,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	TFolder,
	TFile,
	FuzzySuggestModal,
} from "obsidian";
import {
	DEFAULT_SETTINGS,
	FontGallerySettings,
	CLASSIC_TEMPLATE,
	MODERN_TEMPLATE,
} from "./DEFAULT_SETTINGS";

/*=======================================================
 *                    TYPE DEFINITIONS
 *=======================================================*/

// Define interface for FontData
interface SystemFontData {
	family: string;
	fullName?: string;
	style?: string;
	postscriptName?: string;
}

/*=======================================================
 *                    PLUGIN CLASS
 *=======================================================*/

export default class FontGallery extends Plugin {
	settings: FontGallerySettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon(
			"text-font",
			"Font Gallery",
			(evt: MouseEvent) => {
				new FontGalleryModal(this.app).open();
			}
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "create-font-previews",
			name: "Create Font Preview Notes",
			callback: () => {
				new FontGalleryModal(this.app).open();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FontGallerySettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

/*=======================================================
 *                    MODAL CLASSES
 *=======================================================*/

class FontGalleryModal extends Modal {
	createToc: boolean = true;
	metadataLocation: "tags" | "links" | "properties" = "properties";
	tocFontSize: number = 1.5;
	fontTemplate: string = "";
	includeMetadata: boolean = true;
	outputFolder: string = "";
	plugin: FontGallery;
	templateSelection: "classic" | "modern" | "custom" = "modern";

	constructor(app: App) {
		super(app);
		// Initialize from plugin settings if available
		const plugin = (app as any).plugins.plugins["font-gallery"];
		this.plugin = plugin;

		console.log("FontGalleryModal - Constructor called");

		if (plugin && plugin.settings) {
			console.log("FontGalleryModal - Plugin settings found");
			this.createToc = plugin.settings.createTableOfContents;
			this.metadataLocation = plugin.settings.metadataLocation;
			this.tocFontSize = plugin.settings.tocFontSize;
			this.includeMetadata = plugin.settings.includeMetadata;
			this.outputFolder = plugin.settings.outputFolder;
			this.templateSelection = plugin.settings.templateSelection;

			// Set the template based on the template selection
			if (this.templateSelection === "classic") {
				console.log("FontGalleryModal - Using classic template");
				this.fontTemplate = CLASSIC_TEMPLATE;
			} else if (this.templateSelection === "modern") {
				console.log("FontGalleryModal - Using modern template");
				this.fontTemplate = MODERN_TEMPLATE;
			} else if (this.templateSelection === "custom") {
				console.log(
					"FontGalleryModal - Using custom template from settings"
				);
				this.fontTemplate = plugin.settings.fontTemplate;
			} else {
				// Fallback to default
				console.log(
					"FontGalleryModal - Using default template (fallback)"
				);
				this.fontTemplate = DEFAULT_SETTINGS.fontTemplate;
			}

			console.log(
				"FontGalleryModal - Template selection:",
				this.templateSelection
			);
			console.log(
				"FontGalleryModal - Template content:",
				this.fontTemplate.substring(0, 50) + "..."
			);
		} else {
			console.log(
				"FontGalleryModal - No plugin settings found, using defaults"
			);
			// Use default template if no settings are available
			this.fontTemplate = DEFAULT_SETTINGS.fontTemplate;
		}
	}

	// Helper method to add CSS styles to the modal
	addModalStyles() {
		const { contentEl } = this;

		// Add a style element to the modal
		const styleEl = contentEl.createEl("style");
		styleEl.textContent = `
			.font-gallery-modal {
				padding: 20px;
			}
			
			.modal-header {
				margin-bottom: 24px;
				text-align: center;
			}
			
			.modal-title {
				margin-bottom: 8px;
				font-size: 24px;
			}
			
			.font-gallery-description {
				opacity: 0.8;
				margin-bottom: 16px;
			}
			
			.font-gallery-options-container {
				margin-bottom: 24px;
				display: flex;
				flex-direction: column;
				gap: 16px;
			}
			
			.font-gallery-option {
				display: flex;
				align-items: center;
				padding: 10px;
				background-color: var(--background-secondary);
				border-radius: 8px;
			}
			
			.option-label {
				flex: 1;
				margin-right: 10px;
				font-weight: 500;
			}
			
			.font-gallery-button-container {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			
			.font-gallery-create-button {
				padding: 8px 16px;
				font-size: 16px;
				font-weight: 500;
			}
			
			.font-gallery-edit-template-button {
				padding: 6px 12px;
				background-color: var(--interactive-accent);
				color: var(--text-on-accent);
				border-radius: 4px;
				border: none;
				cursor: pointer;
			}
			
			.font-gallery-edit-template-button:hover {
				background-color: var(--interactive-accent-hover);
			}
			
			.folder-input-container {
				display: flex;
				flex: 1;
				gap: 8px;
			}
			
			.font-gallery-folder-input {
				flex: 1;
				padding: 4px 8px;
			}
			
			.font-gallery-folder-browse {
				padding: 4px 8px;
				background-color: var(--interactive-accent);
				color: var(--text-on-accent);
				border-radius: 4px;
				border: none;
				cursor: pointer;
			}
		`;
	}

	// Helper method to create option containers with consistent styling
	createOptionContainer(
		parent: HTMLElement,
		additionalClass?: string
	): HTMLElement {
		const container = parent.createEl("div", {
			cls:
				"font-gallery-option" +
				(additionalClass ? " " + additionalClass : ""),
		});
		return container;
	}

	async getSystemFonts(): Promise<SystemFontData[]> {
		try {
			// Try to use Local Font Access API
			if ("queryLocalFonts" in window) {
				const fonts = await (window as any).queryLocalFonts();
				return fonts.map((font: any) => ({
					family: font.family,
					fullName: font.fullName,
					style: font.style,
					postscriptName: font.postscriptName,
				}));
			}

			// If Local Font Access API is not available, return empty array
			console.warn("Local Font Access API not available in this browser");
			return [];
		} catch (error) {
			console.error("Error getting system fonts:", error);
			return [];
		}
	}

	// Deduplicate fonts by family name
	deduplicateFonts(fonts: SystemFontData[]): SystemFontData[] {
		const uniqueFamilies = new Map<string, SystemFontData>();

		// Keep only the first occurrence of each font family
		for (const font of fonts) {
			if (!uniqueFamilies.has(font.family.toLowerCase())) {
				uniqueFamilies.set(font.family.toLowerCase(), font);
			}
		}

		return Array.from(uniqueFamilies.values());
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("font-gallery-modal");

		// Add CSS for better styling
		this.addModalStyles();

		// Header section
		const headerSection = contentEl.createEl("div", {
			cls: "modal-header",
		});
		headerSection.createEl("h1", {
			text: "Font Gallery",
			cls: "modal-title",
		});
		headerSection.createEl("p", {
			text: "This will create preview notes for system fonts using the Local Font Access API. This feature requires a compatible browser.",
			cls: "font-gallery-description",
		});

		// Add options container
		const optionsContainer = contentEl.createEl("div", {
			cls: "font-gallery-options-container",
		});

		// Template selection option
		const templateContainer = this.createOptionContainer(
			optionsContainer,
			"template-selection-option"
		);

		templateContainer.createEl("label", {
			text: "Template Style:",
			attr: { for: "font-gallery-template-selection" },
			cls: "option-label",
		});

		const templateSelect = templateContainer.createEl("select", {
			cls: "font-gallery-template-select",
			attr: { id: "font-gallery-template-selection" },
		});

		const templateOptions = [
			{ value: "classic", text: "Classic Layout" },
			{ value: "modern", text: "Modern Layout" },
			{ value: "custom", text: "Custom Template" },
		];

		templateOptions.forEach((option) => {
			const optionEl = templateSelect.createEl("option", {
				text: option.text,
				attr: {
					value: option.value,
					selected: this.templateSelection === option.value,
				},
			});
		});

		templateSelect.addEventListener("change", (e) => {
			const target = e.target as HTMLSelectElement;
			this.templateSelection = target.value as
				| "classic"
				| "modern"
				| "custom";

			// Set the template based on selection
			if (this.templateSelection === "classic") {
				this.fontTemplate = CLASSIC_TEMPLATE;
			} else if (this.templateSelection === "modern") {
				this.fontTemplate = MODERN_TEMPLATE;
			} else if (this.templateSelection === "custom" && this.plugin) {
				// For custom, use the saved custom template if one exists
				if (this.plugin.settings.templateSelection === "custom") {
					// If we already have a custom template saved, use that
					this.fontTemplate = this.plugin.settings.fontTemplate;
				} else {
					// When first switching to custom, clone the current template as a starting point
					// This gives users a better starting point than an empty template
					this.fontTemplate =
						this.plugin.settings.templateSelection === "classic"
							? CLASSIC_TEMPLATE
							: MODERN_TEMPLATE;
				}
			}

			// Update edit template button visibility
			if (editTemplateButton) {
				editTemplateButton.style.display =
					this.templateSelection === "custom" ? "block" : "none";
			}
		});

		// Table of Contents option
		const tocContainer = this.createOptionContainer(
			optionsContainer,
			"toc-option"
		);

		const tocLabel = tocContainer.createEl("label", {
			text: "Create Table of Contents (Fonts MOC)",
			attr: { for: "font-gallery-toc" },
			cls: "option-label",
		});

		const tocCheckbox = tocContainer.createEl("input", {
			type: "checkbox",
			cls: "font-gallery-toc-checkbox",
			attr: {
				id: "font-gallery-toc",
				checked: this.createToc,
			},
		});

		tocCheckbox.addEventListener("change", (e) => {
			const target = e.target as HTMLInputElement;
			this.createToc = target.checked;
			tocFontSizeContainer.style.display = this.createToc
				? "flex"
				: "none";
		});

		// TOC Font Size option (only visible when TOC is enabled)
		const tocFontSizeContainer = this.createOptionContainer(
			optionsContainer,
			"toc-font-size-option"
		);
		tocFontSizeContainer.style.display = this.createToc ? "flex" : "none";

		tocFontSizeContainer.createEl("label", {
			text: "TOC Font Size (em):",
			attr: { for: "font-gallery-toc-font-size" },
			cls: "option-label",
		});

		const fontSizeValueDisplay = tocFontSizeContainer.createEl("span", {
			text: ` ${this.tocFontSize}`,
			cls: "font-gallery-toc-font-size-value",
		});

		const tocFontSizeSlider = tocFontSizeContainer.createEl("input", {
			type: "range",
			cls: "font-gallery-toc-font-size-slider",
			attr: {
				id: "font-gallery-toc-font-size",
				min: "0.8",
				max: "3",
				step: "0.1",
				value: String(this.tocFontSize),
			},
		});

		tocFontSizeSlider.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement;
			this.tocFontSize = parseFloat(target.value);
			fontSizeValueDisplay.setText(` ${this.tocFontSize}`);
		});

		// Include metadata toggle
		const includeMetadataContainer = this.createOptionContainer(
			optionsContainer,
			"include-metadata-option"
		);

		includeMetadataContainer.createEl("label", {
			text: "Include Metadata in Notes:",
			attr: { for: "font-gallery-include-metadata" },
			cls: "option-label",
		});

		const includeMetadataCheckbox = includeMetadataContainer.createEl(
			"input",
			{
				type: "checkbox",
				cls: "font-gallery-include-metadata-checkbox",
				attr: {
					id: "font-gallery-include-metadata",
					checked: this.includeMetadata,
				},
			}
		);

		// Metadata location option
		const metadataContainer = this.createOptionContainer(
			optionsContainer,
			"metadata-option"
		);

		metadataContainer.style.display = this.includeMetadata
			? "flex"
			: "none";

		includeMetadataCheckbox.addEventListener("change", (e) => {
			const target = e.target as HTMLInputElement;
			this.includeMetadata = target.checked;
			metadataContainer.style.display = this.includeMetadata
				? "flex"
				: "none";
		});

		metadataContainer.createEl("label", {
			text: "Store Font Metadata as:",
			attr: { for: "font-gallery-metadata" },
			cls: "option-label",
		});

		const metadataSelect = metadataContainer.createEl("select", {
			cls: "font-gallery-metadata-select",
			attr: { id: "font-gallery-metadata" },
		});

		const options = [
			{ value: "tags", text: "Tags" },
			{ value: "links", text: "Links" },
			{ value: "properties", text: "Note Properties (YAML)" },
		];

		options.forEach((option) => {
			const optionEl = metadataSelect.createEl("option", {
				text: option.text,
				attr: {
					value: option.value,
					selected: this.metadataLocation === option.value,
				},
			});
		});

		metadataSelect.addEventListener("change", (e) => {
			const target = e.target as HTMLSelectElement;
			this.metadataLocation = target.value as
				| "tags"
				| "links"
				| "properties";
		});

		// Output folder selection
		const folderContainer = this.createOptionContainer(
			optionsContainer,
			"folder-option"
		);

		folderContainer.createEl("label", {
			text: "Output Folder:",
			cls: "option-label",
		});

		const folderInputContainer = folderContainer.createEl("div", {
			cls: "folder-input-container",
		});

		const folderInput = folderInputContainer.createEl("input", {
			type: "text",
			cls: "font-gallery-folder-input",
			attr: {
				placeholder: "Enter folder path (leave empty for vault root)",
				value: this.outputFolder,
			},
		});

		const folderBrowseButton = folderInputContainer.createEl("button", {
			text: "Browse",
			cls: "font-gallery-folder-browse",
		});

		folderInput.addEventListener("change", (e) => {
			const target = e.target as HTMLInputElement;
			this.outputFolder = target.value;
		});

		folderBrowseButton.addEventListener("click", async () => {
			// Use Obsidian's file explorer API to select a folder
			const folderPath = await this.selectFolder();
			if (folderPath) {
				folderInput.value = folderPath;
				this.outputFolder = folderPath;
			}
		});

		// Template editor option
		const templateEditorContainer = this.createOptionContainer(
			optionsContainer,
			"template-editor-option"
		);

		templateEditorContainer.createEl("label", {
			text: "Custom Template:",
			cls: "option-label",
		});

		const editTemplateButton = templateEditorContainer.createEl("button", {
			text: "Edit Template",
			cls: "font-gallery-edit-template-button",
		});

		// Only show edit button for custom template
		editTemplateButton.style.display =
			this.templateSelection === "custom" ? "block" : "none";

		editTemplateButton.addEventListener("click", () => {
			new TemplateEditorModal(this.app, this).open();
		});

		// Button container
		const buttonContainer = contentEl.createEl("div", {
			cls: "font-gallery-button-container",
		});

		const createButton = buttonContainer.createEl("button", {
			text: "Create Font Preview Notes",
			cls: "font-gallery-create-button",
		});

		createButton.addEventListener("click", async () => {
			// Save settings before proceeding
			if (this.plugin) {
				this.plugin.settings.createTableOfContents = this.createToc;
				this.plugin.settings.metadataLocation = this.metadataLocation;
				this.plugin.settings.tocFontSize = this.tocFontSize;
				this.plugin.settings.fontTemplate = this.fontTemplate;
				this.plugin.settings.includeMetadata = this.includeMetadata;
				this.plugin.settings.outputFolder = this.outputFolder;
				this.plugin.settings.templateSelection = this.templateSelection;
				await this.plugin.saveSettings();
			}

			const progressNotice = new Notice("Getting system fonts...", 0);

			try {
				let fonts = await this.getSystemFonts();

				if (fonts.length === 0) {
					progressNotice.setMessage(
						"No system fonts found. The Local Font Access API may not be available in your browser."
					);
					setTimeout(() => progressNotice.hide(), 5000);
					return;
				}

				// Deduplicate fonts by family name
				const originalCount = fonts.length;
				fonts = this.deduplicateFonts(fonts);

				if (originalCount !== fonts.length) {
					progressNotice.setMessage(
						`Found ${originalCount} fonts, processing ${fonts.length} unique font families...`
					);
				} else {
					progressNotice.setMessage(
						`Processing ${fonts.length} fonts...`
					);
				}

				let successCount = 0;
				let failCount = 0;
				let processedCount = 0;
				let tocLinks: Array<{ name: string; family: string }> = [];

				const processBatch = async (
					startIdx: number,
					batchSize: number
				) => {
					const endIdx = Math.min(startIdx + batchSize, fonts.length);
					const batch = fonts.slice(startIdx, endIdx);

					for (const font of batch) {
						try {
							const fontName = font.family.replace(
								/[^a-zA-Z0-9-_]/g,
								"-"
							);
							const ff = "font-family: '" + font.family + "';";

							// Generate metadata based on selected location
							let yamlFrontmatter = "";
							let tagsLine = "";
							let linksLine = "";

							if (this.includeMetadata) {
								if (this.metadataLocation === "properties") {
									yamlFrontmatter = `---
fontFamily: "${font.family}"
${font.fullName ? `fullName: "${font.fullName}"` : ""}
${font.style ? `style: "${font.style}"` : ""}
${font.postscriptName ? `postscriptName: "${font.postscriptName}"` : ""}
type: FontPreview
---

`;
								} else if (this.metadataLocation === "tags") {
									tagsLine = `#font #${fontName} ${
										font.style
											? `#${font.style.replace(
													/\s+/g,
													"-"
											  )}`
											: ""
									}\n\n`;
								} else if (this.metadataLocation === "links") {
									linksLine = `[[Font]] [[${fontName}]] ${
										font.style ? `[[${font.style}]]` : ""
									}\n\n`;
								}
							}

							// Process template variables
							let processedTemplate = this.fontTemplate;
							processedTemplate = processedTemplate.replace(
								/{fontFamily}/g,
								font.family
							);
							processedTemplate = processedTemplate.replace(
								/{fontName}/g,
								fontName
							);
							processedTemplate = processedTemplate.replace(
								/{fullName}/g,
								font.fullName || font.family
							);
							processedTemplate = processedTemplate.replace(
								/{style}/g,
								font.style || "Regular"
							);
							processedTemplate = processedTemplate.replace(
								/{postscriptName}/g,
								font.postscriptName || ""
							);

							const htmlTemplate =
								`${yamlFrontmatter}${tagsLine}${linksLine}${processedTemplate}`.trim();

							// Create folder if it doesn't exist
							let folderPath = this.outputFolder
								? this.outputFolder.trim()
								: "";
							let notePath = "";

							if (folderPath) {
								// Create folder if it doesn't exist
								try {
									const folderExists =
										this.app.vault.getAbstractFileByPath(
											folderPath
										);
									if (!folderExists) {
										await this.app.vault.createFolder(
											folderPath
										);
									} else if (
										!(folderExists instanceof TFolder)
									) {
										// Path exists but is not a folder
										throw new Error(
											`${folderPath} exists but is not a folder`
										);
									}
								} catch (error) {
									console.error(
										`Error creating folder ${folderPath}:`,
										error
									);
									new Notice(
										`Error creating folder: ${error.message}`
									);
									failCount++;
									continue;
								}

								// Ensure folder path ends with a slash
								if (!folderPath.endsWith("/")) {
									folderPath += "/";
								}

								notePath = `${folderPath}${fontName}.md`;
							} else {
								notePath = `${fontName}.md`;
							}

							// Check if note already exists and modify it instead of creating a new one
							const existingFile =
								this.app.vault.getAbstractFileByPath(notePath);

							try {
								if (existingFile instanceof TFile) {
									// File exists, modify it
									await this.app.vault.modify(
										existingFile,
										htmlTemplate
									);
									successCount++;
									tocLinks.push({
										name: fontName,
										family: font.family,
									});
								} else {
									// File doesn't exist, create it
									const note = await this.app.vault.create(
										notePath,
										htmlTemplate
									);

									if (note) {
										successCount++;
										tocLinks.push({
											name: fontName,
											family: font.family,
										});
									} else {
										failCount++;
									}
								}
							} catch (error) {
								console.error(
									`Error creating/updating note for ${font.family}:`,
									error
								);
								failCount++;
							}
						} catch (error) {
							console.error(
								`Error processing font ${font.family}:`,
								error
							);
							failCount++;
						}
					}
				};

				const batchSize = 10;
				for (let i = 0; i < fonts.length; i += batchSize) {
					await processBatch(i, batchSize);
					processedCount += Math.min(batchSize, fonts.length - i);
					progressNotice.setMessage(
						`Processed ${Math.min(
							processedCount,
							fonts.length
						)} of ${fonts.length} fonts...`
					);
				}

				// Create or update TOC if enabled
				if (this.createToc && tocLinks.length > 0) {
					try {
						const tocPath = this.outputFolder
							? this.outputFolder.endsWith("/")
								? `${this.outputFolder}Fonts MOC.md`
								: `${this.outputFolder}/Fonts MOC.md`
							: "Fonts MOC.md";

						// Generate TOC content with the new format
						let tocContent = `<h1 style="font-size: 4em;">Font Gallery</h1>\n<h4 style="text-align: left; font-weight: normal; font-size: 1.5rem; font-style:italic; margin-top: -20px">A collection of fonts installed on your system.</h4>\n<p style="margin-top: 1em; margin-bottom: 2em;">This gallery showcases all the fonts available through the Local Font Access API on your system. Each font has its own dedicated page with typography samples and visual characteristics.</p>\n<hr>\n\n`;

						// Sort links alphabetically
						tocLinks.sort((a, b) =>
							a.name.localeCompare(b.name, undefined, {
								sensitivity: "base",
							})
						);

						// Add links to TOC with the new format
						for (const font of tocLinks) {
							tocContent += `<p style="font-size: 2em; font-family: '${font.family}';">${font.family}</p>\n\n`;
							tocContent += `[[${font.name}]]\n\n<hr>\n\n`;
						}

						// Check if TOC already exists
						const existingToc =
							this.app.vault.getAbstractFileByPath(tocPath);

						if (existingToc instanceof TFile) {
							// Update existing TOC
							await this.app.vault.modify(
								existingToc,
								tocContent
							);
						} else {
							// Create new TOC
							await this.app.vault.create(tocPath, tocContent);
						}

						// Set final message but make it disappear after 5 seconds
						progressNotice.setMessage(
							`Finished processing ${successCount} fonts, ${failCount} failed. Table of Contents created.`
						);
						setTimeout(() => progressNotice.hide(), 5000);
					} catch (error) {
						console.error(
							"Error creating Table of Contents:",
							error
						);
						// Set error message but make it disappear after 5 seconds
						progressNotice.setMessage(
							`Finished processing ${successCount} fonts, ${failCount} failed. Failed to create Table of Contents.`
						);
						setTimeout(() => progressNotice.hide(), 5000);
					}
				} else {
					// Set final message but make it disappear after 5 seconds
					progressNotice.setMessage(
						`Finished processing ${successCount} fonts, ${failCount} failed.`
					);
					setTimeout(() => progressNotice.hide(), 5000);
				}
			} catch (error) {
				console.error("Error processing fonts:", error);
				// Set error message but make it disappear after 5 seconds
				progressNotice.setMessage(
					"An error occurred while processing fonts."
				);
				setTimeout(() => progressNotice.hide(), 5000);
			}
		});
	}

	// Method to select a folder using Obsidian's file explorer
	async selectFolder(): Promise<string | null> {
		return new Promise((resolve) => {
			const folderModal = new FolderSuggestModal(this.app);
			folderModal.setCallback((folder: TFolder) => {
				resolve(folder ? folder.path : null);
			});
			folderModal.open();
		});
	}
}

/*=======================================================
 *                TEMPLATE EDITOR MODAL
 *=======================================================*/

class TemplateEditorModal extends Modal {
	template: string;
	modal: FontGalleryModal;
	originalTemplate: string;

	constructor(app: App, modal: FontGalleryModal) {
		super(app);
		this.modal = modal;

		console.log(
			"TemplateEditorModal - Current template selection:",
			modal.templateSelection
		);
		console.log(
			"TemplateEditorModal - Current template content:",
			modal.fontTemplate
		);

		// Always use the current template from the modal
		this.template = modal.fontTemplate;

		// Set the original template based on the selected template type
		if (modal.templateSelection === "classic") {
			this.originalTemplate = CLASSIC_TEMPLATE;
		} else if (modal.templateSelection === "modern") {
			this.originalTemplate = MODERN_TEMPLATE;
		} else if (modal.templateSelection === "custom" && modal.plugin) {
			// For custom template, use the current template from settings
			this.originalTemplate = modal.plugin.settings.fontTemplate;
		} else {
			// Fallback to default
			this.originalTemplate = DEFAULT_SETTINGS.fontTemplate;
		}

		console.log(
			"TemplateEditorModal - Original template set to:",
			this.originalTemplate.substring(0, 50) + "..."
		);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("font-gallery-modal");

		// Add CSS for better styling
		this.addModalStyles();

		// Header section
		const headerSection = contentEl.createEl("div", {
			cls: "modal-header",
		});
		headerSection.createEl("h1", {
			text: "Font Preview Template",
			cls: "modal-title",
		});
		headerSection.createEl("p", {
			text: "This template will be used to generate font preview notes.",
			cls: "font-gallery-description",
		});

		// Template type selection
		const templateTypeContainer = contentEl.createEl("div", {
			cls: "template-type-container",
		});

		templateTypeContainer.createEl("h3", {
			text:
				"Editing Template Style: " +
				this.getTemplateStyleName(this.modal.templateSelection),
		});

		// Template editor
		const templateEditor = contentEl.createEl("textarea", {
			cls: "font-gallery-template-editor",
		});

		console.log(
			"TemplateEditorModal - Setting editor value to:",
			this.template.substring(0, 50) + "..."
		);

		// Set the value after creating the element to ensure it's properly loaded
		templateEditor.value = this.template;

		// Set textarea styles
		templateEditor.style.width = "100%";
		templateEditor.style.height = "300px";
		templateEditor.style.fontFamily = "monospace";
		templateEditor.style.padding = "10px";
		templateEditor.style.marginBottom = "20px";
		templateEditor.style.border =
			"1px solid var(--background-modifier-border)";
		templateEditor.style.backgroundColor = "var(--background-primary)";

		// Add info text for variables
		const variablesInfo = contentEl.createEl("div", {
			cls: "variables-info",
		});

		variablesInfo.createEl("h3", {
			text: "Available Template Variables:",
		});

		const variablesList = variablesInfo.createEl("ul");
		[
			"{fontFamily} - The font's family name",
			"{fontName} - Sanitized version of the font name (used for filenames)",
			"{fullName} - The font's full name (falls back to family name if not available)",
			"{style} - The font's style (falls back to 'Regular' if not available)",
			"{postscriptName} - The font's PostScript name (if available)",
		].forEach((text) => {
			variablesList.createEl("li", { text });
		});

		variablesInfo.style.marginBottom = "20px";

		// Button container
		const buttonContainer = contentEl.createEl("div", {
			cls: "font-gallery-button-container",
		});

		// Add reset button
		const resetButton = buttonContainer.createEl("button", {
			text: "Reset to Default",
			cls: "font-gallery-reset-button",
		});

		resetButton.style.marginRight = "10px";
		resetButton.style.backgroundColor = "var(--background-modifier-error)";
		resetButton.style.color = "var(--text-on-accent)";

		resetButton.addEventListener("click", () => {
			// Confirm before resetting
			if (
				confirm(
					"Are you sure you want to reset to the default template?"
				)
			) {
				templateEditor.value = this.originalTemplate;
				this.template = this.originalTemplate;
			}
		});

		const saveButton = buttonContainer.createEl("button", {
			text: "Save Template",
			cls: "font-gallery-create-button",
		});

		saveButton.addEventListener("click", () => {
			console.log("TemplateEditorModal - Save button clicked");
			console.log(
				"TemplateEditorModal - New template value:",
				templateEditor.value.substring(0, 50) + "..."
			);

			this.template = templateEditor.value;
			this.modal.fontTemplate = this.template;

			// When saving, make sure we're in custom template mode
			this.modal.templateSelection = "custom";

			// Also save to plugin settings if available
			if (this.modal.plugin && this.modal.plugin.settings) {
				console.log("TemplateEditorModal - Saving to plugin settings");
				this.modal.plugin.settings.fontTemplate = this.template;
				this.modal.plugin.settings.templateSelection = "custom";
				this.modal.plugin
					.saveSettings()
					.then(() => {
						console.log(
							"TemplateEditorModal - Settings saved successfully"
						);
						new Notice("Template saved successfully");
						this.close();
					})
					.catch((error) => {
						console.error(
							"TemplateEditorModal - Error saving settings:",
							error
						);
						new Notice("Error saving template: " + error.message);
					});
			} else {
				console.log(
					"TemplateEditorModal - No plugin settings available, closing without saving"
				);
				new Notice("Template saved successfully");
				this.close();
			}
		});
	}

	// Helper to get readable template style name
	getTemplateStyleName(templateSelection: string): string {
		switch (templateSelection) {
			case "classic":
				return "Classic Layout";
			case "modern":
				return "Modern Layout";
			case "custom":
				return "Custom Template";
			default:
				return "Custom Template";
		}
	}

	addModalStyles() {
		const { contentEl } = this;
		const styleEl = contentEl.createEl("style");
		styleEl.textContent = `
			.font-gallery-modal {
				padding: 20px;
			}
			
			.modal-header {
				margin-bottom: 24px;
				text-align: center;
			}
			
			.modal-title {
				margin-bottom: 8px;
				font-size: 24px;
			}
			
			.font-gallery-description {
				opacity: 0.8;
				margin-bottom: 16px;
			}
			
			.font-gallery-button-container {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			
			.font-gallery-create-button {
				padding: 8px 16px;
				font-size: 16px;
				font-weight: 500;
			}
			
			.font-gallery-template-editor {
				width: 100%;
				min-height: 300px;
				font-family: monospace;
				padding: 10px;
				border-radius: 4px;
				background-color: var(--background-primary);
				border: 1px solid var(--background-modifier-border);
			}
		`;
	}
}

/*=======================================================
 *                  SETTINGS TAB
 *=======================================================*/

class FontGallerySettingTab extends PluginSettingTab {
	plugin: FontGallery;

	constructor(app: App, plugin: FontGallery) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Include Metadata")
			.setDesc("Include font metadata in notes")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeMetadata)
					.onChange((value) => {
						this.plugin.settings.includeMetadata = value;
						this.plugin.saveSettings();
						new Notice("Include metadata setting updated");
					})
			);

		new Setting(containerEl)
			.setName("Metadata Location")
			.setDesc("Where to store font metadata")
			.addDropdown((dropdown) =>
				dropdown
					.addOptions({
						tags: "Tags",
						links: "Links",
						properties: "Note Properties (YAML)",
					})
					.setValue(this.plugin.settings.metadataLocation)
					.onChange((value) => {
						this.plugin.settings.metadataLocation = value as
							| "tags"
							| "links"
							| "properties";
						this.plugin.saveSettings();
						new Notice("Metadata location updated");
					})
			);

		new Setting(containerEl)
			.setName("Output Folder")
			.setDesc(
				"Folder where font notes will be created (leave empty for vault root)"
			)
			.addText((text) => {
				text.setPlaceholder("Enter folder path")
					.setValue(this.plugin.settings.outputFolder)
					.onChange((value) => {
						this.plugin.settings.outputFolder = value;
						this.plugin.saveSettings();
					});
			})
			.addButton((button) => {
				button
					.setButtonText("Browse")
					.setCta()
					.onClick(async () => {
						const folderModal = new FolderSuggestModal(this.app);
						folderModal.setCallback((folder: TFolder) => {
							if (folder) {
								this.plugin.settings.outputFolder = folder.path;
								this.plugin.saveSettings();
								this.display(); // Refresh the settings panel
							}
						});
						folderModal.open();
					});
			});

		new Setting(containerEl)
			.setName("Create Table of Contents")
			.setDesc("Create a table of contents for font notes")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.createTableOfContents)
					.onChange((value) => {
						this.plugin.settings.createTableOfContents = value;
						this.plugin.saveSettings();
						new Notice("Table of contents setting updated");
					})
			);

		new Setting(containerEl)
			.setName("TOC Font Size")
			.setDesc("Font size for table of contents")
			.addSlider((slider) =>
				slider
					.setValue(this.plugin.settings.tocFontSize)
					.setLimits(0.8, 3, 0.1)
					.onChange((value) => {
						this.plugin.settings.tocFontSize = value;
						this.plugin.saveSettings();
						new Notice("TOC font size updated");
					})
			);

		new Setting(containerEl)
			.setName("Template Style")
			.setDesc("Choose the template style for font preview notes")
			.addDropdown((dropdown) => {
				dropdown
					.addOption("classic", "Classic Layout")
					.addOption("modern", "Modern Layout")
					.addOption("custom", "Custom Template")
					.setValue(this.plugin.settings.templateSelection)
					.onChange(async (value) => {
						const newSelection = value as
							| "classic"
							| "modern"
							| "custom";

						// Store the previous selection to handle transitions
						const previousSelection =
							this.plugin.settings.templateSelection;
						this.plugin.settings.templateSelection = newSelection;

						// Update the template based on selection
						if (newSelection === "classic") {
							this.plugin.settings.fontTemplate =
								CLASSIC_TEMPLATE;
						} else if (newSelection === "modern") {
							this.plugin.settings.fontTemplate = MODERN_TEMPLATE;
						} else if (newSelection === "custom") {
							// For custom template handling
							if (previousSelection === "custom") {
								// If already using custom, keep the current custom template
								// No need to change the template
							} else {
								// First time switching to custom, use the current template as a starting point
								// This gives a better starting point than an empty template
								this.plugin.settings.fontTemplate =
									previousSelection === "classic"
										? CLASSIC_TEMPLATE
										: MODERN_TEMPLATE;
							}
						}

						await this.plugin.saveSettings();
						new Notice(`Template style updated to ${value}`);

						// Refresh settings to show/hide template editor button
						this.display();
					});
			});

		// Always show the template editor button, but only enable it for custom template
		const templateEditorSetting = new Setting(containerEl)
			.setName("Font Preview Template")
			.setDesc("Customize the HTML template used for font preview notes");

		const isCustomTemplate =
			this.plugin.settings.templateSelection === "custom";

		templateEditorSetting.addButton((button) =>
			button
				.setButtonText("Edit Template")
				.setCta()
				.setDisabled(!isCustomTemplate)
				.onClick(() => {
					if (isCustomTemplate) {
						// Create a proper template editor that can save back to settings
						const templateEditor = new TemplateEditorSettingsModal(
							this.app,
							this.plugin
						);
						templateEditor.open();
					} else {
						// If not in custom template mode, show a notice
						new Notice(
							"Please select 'Custom Template' from the Template Style dropdown first."
						);
					}
				})
		);

		// Add a description about the template editing
		if (!isCustomTemplate) {
			templateEditorSetting.setDesc(
				"Select 'Custom Template' from the Template Style dropdown to enable template editing."
			);
		}
	}
}

/*=======================================================
 *            TEMPLATE EDITOR SETTINGS MODAL
 *=======================================================*/

// Class for template editing from settings
class TemplateEditorSettingsModal extends Modal {
	plugin: FontGallery;
	template: string;
	originalTemplate: string;

	constructor(app: App, plugin: FontGallery) {
		super(app);
		this.plugin = plugin;

		console.log(
			"TemplateEditorSettingsModal - Current template selection:",
			plugin.settings.templateSelection
		);
		console.log(
			"TemplateEditorSettingsModal - Current template content:",
			plugin.settings.fontTemplate.substring(0, 50) + "..."
		);

		// Always use the current template from settings
		this.template = plugin.settings.fontTemplate;

		// Set the original template based on the selected template type
		if (plugin.settings.templateSelection === "classic") {
			this.originalTemplate = CLASSIC_TEMPLATE;
		} else if (plugin.settings.templateSelection === "modern") {
			this.originalTemplate = MODERN_TEMPLATE;
		} else if (plugin.settings.templateSelection === "custom") {
			// For custom, use the current template as the original
			// This allows resetting to the last saved custom template
			this.originalTemplate = plugin.settings.fontTemplate;
		} else {
			// Fallback to default
			this.originalTemplate = DEFAULT_SETTINGS.fontTemplate;
		}

		console.log(
			"TemplateEditorSettingsModal - Original template set to:",
			this.originalTemplate.substring(0, 50) + "..."
		);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("font-gallery-modal");

		// Add CSS for better styling
		this.addModalStyles();

		// Header section
		const headerSection = contentEl.createEl("div", {
			cls: "modal-header",
		});
		headerSection.createEl("h1", {
			text: "Font Preview Template",
			cls: "modal-title",
		});
		headerSection.createEl("p", {
			text: "This template will be used to generate font preview notes.",
			cls: "font-gallery-description",
		});

		// Template type selection
		const templateTypeContainer = contentEl.createEl("div", {
			cls: "template-type-container",
		});

		templateTypeContainer.createEl("h3", {
			text:
				"Editing Template Style: " +
				this.getTemplateStyleName(
					this.plugin.settings.templateSelection
				),
		});

		// Template editor
		const templateEditor = contentEl.createEl("textarea", {
			cls: "font-gallery-template-editor",
		});

		console.log(
			"TemplateEditorSettingsModal - Setting editor value to:",
			this.template.substring(0, 50) + "..."
		);

		// Set the value after creating the element to ensure it's properly loaded
		templateEditor.value = this.template;

		// Set textarea styles
		templateEditor.style.width = "100%";
		templateEditor.style.height = "300px";
		templateEditor.style.fontFamily = "monospace";
		templateEditor.style.padding = "10px";
		templateEditor.style.marginBottom = "20px";
		templateEditor.style.border =
			"1px solid var(--background-modifier-border)";
		templateEditor.style.backgroundColor = "var(--background-primary)";

		// Add info text for variables
		const variablesInfo = contentEl.createEl("div", {
			cls: "variables-info",
		});

		variablesInfo.createEl("h3", {
			text: "Available Template Variables:",
		});

		const variablesList = variablesInfo.createEl("ul");
		[
			"{fontFamily} - The font's family name",
			"{fontName} - Sanitized version of the font name (used for filenames)",
			"{fullName} - The font's full name (falls back to family name if not available)",
			"{style} - The font's style (falls back to 'Regular' if not available)",
			"{postscriptName} - The font's PostScript name (if available)",
		].forEach((text) => {
			variablesList.createEl("li", { text });
		});

		variablesInfo.style.marginBottom = "20px";

		// Button container
		const buttonContainer = contentEl.createEl("div", {
			cls: "font-gallery-button-container",
		});

		// Add reset button
		const resetButton = buttonContainer.createEl("button", {
			text: "Reset to Default",
			cls: "font-gallery-reset-button",
		});

		resetButton.style.marginRight = "10px";
		resetButton.style.backgroundColor = "var(--background-modifier-error)";
		resetButton.style.color = "var(--text-on-accent)";

		resetButton.addEventListener("click", () => {
			// Confirm before resetting
			if (
				confirm(
					"Are you sure you want to reset to the default template?"
				)
			) {
				templateEditor.value = this.originalTemplate;
				this.template = this.originalTemplate;
			}
		});

		const saveButton = buttonContainer.createEl("button", {
			text: "Save Template",
			cls: "font-gallery-create-button",
		});

		saveButton.addEventListener("click", () => {
			console.log("TemplateEditorSettingsModal - Save button clicked");
			console.log(
				"TemplateEditorSettingsModal - New template value:",
				templateEditor.value.substring(0, 50) + "..."
			);

			this.template = templateEditor.value;
			this.plugin.settings.fontTemplate = this.template;

			// When saving, make sure we're in custom template mode
			this.plugin.settings.templateSelection = "custom";

			this.plugin
				.saveSettings()
				.then(() => {
					console.log(
						"TemplateEditorSettingsModal - Settings saved successfully"
					);
					new Notice("Template saved successfully");
					this.close();
				})
				.catch((error) => {
					console.error(
						"TemplateEditorSettingsModal - Error saving settings:",
						error
					);
					new Notice("Error saving template: " + error.message);
				});
		});
	}

	// Helper to get readable template style name
	getTemplateStyleName(templateSelection: string): string {
		switch (templateSelection) {
			case "classic":
				return "Classic Layout";
			case "modern":
				return "Modern Layout";
			case "custom":
				return "Custom Template";
			default:
				return "Custom Template";
		}
	}

	addModalStyles() {
		const { contentEl } = this;
		const styleEl = contentEl.createEl("style");
		styleEl.textContent = `
			.font-gallery-modal {
				padding: 20px;
			}
			
			.modal-header {
				margin-bottom: 24px;
				text-align: center;
			}
			
			.modal-title {
				margin-bottom: 8px;
				font-size: 24px;
			}
			
			.font-gallery-description {
				opacity: 0.8;
				margin-bottom: 16px;
			}
			
			.font-gallery-button-container {
				display: flex;
				justify-content: center;
				margin-top: 20px;
			}
			
			.font-gallery-create-button {
				padding: 8px 16px;
				font-size: 16px;
				font-weight: 500;
			}
			
			.font-gallery-template-editor {
				width: 100%;
				min-height: 300px;
				font-family: monospace;
				padding: 10px;
				border-radius: 4px;
				background-color: var(--background-primary);
				border: 1px solid var(--background-modifier-border);
			}
		`;
	}
}

/*=======================================================
 *                FOLDER SUGGEST MODAL
 *=======================================================*/

// Class for folder selection modal
class FolderSuggestModal extends FuzzySuggestModal<TFolder> {
	callback: (folder: TFolder) => void;

	constructor(app: App) {
		super(app);
	}

	setCallback(callback: (folder: TFolder) => void): void {
		this.callback = callback;
	}

	getItems(): TFolder[] {
		return this.app.vault
			.getAllLoadedFiles()
			.filter((file): file is TFolder => file instanceof TFolder);
	}

	getItemText(folder: TFolder): string {
		return folder.path;
	}

	onChooseItem(folder: TFolder, evt: MouseEvent | KeyboardEvent): void {
		if (this.callback) {
			this.callback(folder);
		}
	}
}
