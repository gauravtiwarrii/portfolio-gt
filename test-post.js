const fs = require('fs');
const path = require('path');

async function testPost() {
    console.log("Starting test...");
    const postsDirectory = path.join(process.cwd(), "content/blogs");
    const slug = "test-post-api";
    const title = "Test Post API";
    const excerpt = "test excerpt";
    const content = "Test content body";
    const date = "2026-03-05";
    const tagsArray = ["Test", "API"];
    const readTime = "1 min read";

    const frontmatter = `---
title: "${title}"
excerpt: "${excerpt || ""}"
date: "${date}"
readTime: "${readTime}"
tags: [${tagsArray.map((t) => `"${t}"`).join(", ")}]
---

${content}`;

    console.log("Frontmatter to write:\n", frontmatter);

    try {
        if (!fs.existsSync(postsDirectory)) {
            console.log("Directory does not exist. Creating:", postsDirectory);
            fs.mkdirSync(postsDirectory, { recursive: true });
        }

        const filePath = path.join(postsDirectory, `${slug}.md`);
        console.log("Writing file to:", filePath);
        fs.writeFileSync(filePath, frontmatter, "utf8");
        console.log("Write success!");
    } catch (err) {
        console.error("Error writing post file:", err);
    }
}

testPost();
