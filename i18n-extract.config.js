export default {
	files: [
		"views/**/*.html",
		// If you also use .ejs extensions, uncomment the line below:
		// 'views/**/*.ejs',
		// If you have client-side JavaScript that uses the __() function,
		// and you want to extract strings from it, include its path:
		// 'public/js/**/*.js',
		// If you have server-side JavaScript files where you call __()
		// (e.g., in a helper file), include them here.
		// Ensure you only include files relevant for string extraction,
		// not your entire server logic unless it contains translatable strings.
		// For example:
		// 'src/lib/**/*.js',
	],
	// The name of the internationalized string marker function (your __ function)
	marker: "__",
	// Output options
	output: {
		// Path to your main locale file (e.g., English)
		locales: "locales/en.json",
		// Format of the output file
		format: "json",
		// Whether to sort keys alphabetically
		sort: true,
	},
	// You can remove this 'babelOptions' block unless you encounter parsing errors
	// with very advanced or non-standard JavaScript syntax in files you are scanning.
	// babelOptions: {
	//   plugins: [
	//     '@babel/plugin-syntax-dynamic-import',
	//   ],
	// },
};
