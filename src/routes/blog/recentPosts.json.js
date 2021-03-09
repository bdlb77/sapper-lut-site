import fs from "fs";
import path from "path";
import marked from "marked";
import posts from './_posts.js';
import grayMatter from "gray-matter";

function getAllPosts(filesPath) {
	const data = fs.readdirSync(filesPath).map(filename => {
		const post = fs.readFileSync(path.resolve(filesPath, filename), "utf-8");
		
		// Parse Front Matter from String
		const { data, content } = grayMatter(post);
		// MD -> HTML
		const renderer = new marked.Renderer();
		const html = marked(content, { renderer });
		// builds data
		return { 
			html,
			...data
		};
	});

	return data;

}
const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function sortPosts(posts) {
	return posts.sort( (post1, post2) => {
		const date1 = new Date(post1.date);
		const date2 = new Date(post2.date);
		return date2 - date1;
	})
}
export function get(req, res) {
	const posts = getAllPosts("src/posts");
	const [one, two, three] = sortPosts(posts);
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify([one, two, three]));
}

