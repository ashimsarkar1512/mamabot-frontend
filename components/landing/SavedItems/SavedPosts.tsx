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
    <div className="space-y-6">
      {posts.map((item) => (
        <PostCard key={item.id} post={item.savable} />
      ))}
    </div>
  );
};

export default SavedPosts;
