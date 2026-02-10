import PostCard from "@/components/User/userCommunity/PostCard";

const SavedPosts = ({ posts }: { posts: any[] }) => {
  if (!posts?.length) {
    return <p>No saved posts</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((item) => (
        <PostCard key={item.id} post={item.savable} />
      ))}
    </div>
  );
};

export default SavedPosts;
