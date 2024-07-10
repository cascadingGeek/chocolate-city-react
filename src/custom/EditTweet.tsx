import React, { FC, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { updateTweet, fetchTweetDetails } from "../lib/fetchAction";
import { useToast } from "../components/ui/use-toast";
import { useTweetToUpdateStore } from "../store/inputStore";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { RiEdit2Fill } from "react-icons/ri";

interface Props {
  selectedTweetId: number | null;
  handleFetchTweets: () => void;
  onClick: () => void;
}

const EditTweet: FC<Props> = ({
  selectedTweetId,
  handleFetchTweets,
  onClick,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const {
    postId,
    id,
    name,
    email,
    body,
    setTweetToUpdate,
    resetTweetToUpdate,
  } = useTweetToUpdateStore();

  useEffect(() => {
    const fetchTweetData = async () => {
      if (selectedTweetId) {
        const tweetData = await fetchTweetDetails(selectedTweetId);
        setTweetToUpdate("postId", tweetData.postId || "");
        setTweetToUpdate("id", tweetData.id || "");
        setTweetToUpdate("name", tweetData.name || "");
        setTweetToUpdate("email", tweetData.email || "");
        setTweetToUpdate("body", tweetData.body || "");
      }
    };
    if (dialogVisible) {
      fetchTweetData();
    }
  }, [selectedTweetId, dialogVisible, setTweetToUpdate]);

  const handleUpdateTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTweetId) return;

    setLoading(true);
    try {
      const response = await updateTweet(selectedTweetId, {
        postId,
        id,
        name,
        email,
        body,
      });
      if (response?.status === 200) {
        toast({
          title: "Updated",
          description: "Tweet has been updated",
        });
        resetTweetToUpdate();
        await handleFetchTweets();
      } else {
        toast({
          title: "Error",
          description: "Please try again!",
        });
      }
    } catch (error) {
      console.error("Error updating tweet:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
      setDialogVisible(false);
    }
  };

  return (
    <Dialog open={dialogVisible} onOpenChange={() => setDialogVisible(false)}>
      <RiEdit2Fill
        className="text-2xl font-black text-white cursor-pointer"
        onClick={() => {
          setDialogVisible(true);
          onClick();
        }}
      />
      <DialogContent className="bg-[#02021a] border-0 outline-none p-5">
        <div className="w-full h-full overflow-y-auto scrollbar-hide">
          <p className="font-bold text-lg text-center mb-3 text-white">
            Update Tweet
          </p>
          <form
            onSubmit={handleUpdateTweet}
            className="w-full h-auto flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Post ID"
              value={postId}
              onChange={(e) => setTweetToUpdate("postId", e.target.value)}
              className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-lg"
            />
            <input
              placeholder="ID"
              value={id}
              onChange={(e) => setTweetToUpdate("id", e.target.value)}
              className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-lg"
            />
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setTweetToUpdate("name", e.target.value)}
              className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-lg"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setTweetToUpdate("email", e.target.value)}
              className="border border-gray-500 bg-transparent text-white px-3 py-2 rounded-lg"
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setTweetToUpdate("body", e.target.value)}
              className="border border-gray-500 bg-transparent text-white mb-5 px-3 py-2 rounded-lg"
            ></textarea>

            <div>
              <div className="flex items-center gap-5">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setDialogVisible(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTweet;
