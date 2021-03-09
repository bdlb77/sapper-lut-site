import posts from './_posts.js';
import fs from "fs";
import path from "path";
import marked from "marked";
import grayMatter from "gray-matter";
// const lookup = new Map();
// posts.forEach(post => {
// 	lookup.set(post.slug, JSON.stringify(post));
// });

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	// if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		// Reading Correct File
		const post = fs.readFileSync(path.resolve("src/posts", `${slug}.md`), "utf-8");

		// Parse FrontMatter
		const { data, content } = grayMatter(post);

		// Render HTML from string
		const renderer = new marked.Renderer();
		const html = marked(content, { renderer });

		res.end(JSON.stringify({
			html,
			...data
		}))
		// res.end(lookup.get(slug));
	// } else {
		// res.writeHead(404, {
		// 	'Content-Type': 'application/json'
		// });

		// res.end(JSON.stringify({
		// 	message: `Not found`
		// }));
	// }
}
