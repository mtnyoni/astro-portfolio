import eslintPluginAstro from "eslint-plugin-astro"
export default [
	...eslintPluginAstro.configs.recommended,
	{
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...reactRefresh.configs.recommended.rules,
			"react-refresh/only-export-components": [
				"warn",
				{ allowConstantExport: true },
			],
		},
		ignore: ["node_modules/**"],
	},
]
