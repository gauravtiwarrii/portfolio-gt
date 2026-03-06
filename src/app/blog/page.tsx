import { getAllPosts } from "@/lib/blog";
import BlogClient from "./BlogClient";

export default function BlogPage() {
    const posts = getAllPosts();
    return <BlogClient initialPosts={posts} />;
}
