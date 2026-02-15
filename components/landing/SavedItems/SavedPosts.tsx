import PostCard from "@/components/User/userCommunity/PostCard";
import {
  SavedItem,
  CommunityPost,
} from "@/redux/features/api/user/recommandetion/savedItemsGet";

interface SavedPostsProps {
  posts: (SavedItem & { savable: CommunityPost })[];
}

const SavedPosts = ({ posts }: SavedPostsProps) => {
  if (!posts?.length) {
    return <p>No saved posts</p>;
  }

  return (
    <section>
      <h1 className="text-primary pb-3 font-semibold text-lg md:text-3xl ">
        Your Saved Posts :
      </h1>
      <div className="space-y-6">
        {posts.map((item) => (
          <PostCard key={item.id} post={item.savable} />
        ))}
      </div>
    </section>
  );
};

export default SavedPosts;
