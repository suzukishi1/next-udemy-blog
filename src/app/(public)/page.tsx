import PostCard from "@/components/post/PostCard";
import { getPosts } from "@/lib/post";

// const post1 = {
//   id: "1",
//   title: "title",
//   content: "content",
//   topImage: "https://picsum.photos/seed/1/600/400",
//   createdAt: new Date("2025/9/12"),
//   author: {
//     name: "author",
//   },
// };
// const post2 = {
//   id: "2",
//   title: "title2",
//   content: "content2",
//   topImage: "https://picsum.photos/seed/2/600/400",
//   createdAt: new Date("2025/9/13"),
//   author: {
//     name: "author2",
//   },
// };
export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
