import React, { FC, useState } from "react";
import { Button } from "../components/ui/button";
import { deleteTweet } from "../lib/fetchAction";
import { useToast } from "../components/ui/use-toast";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { MdDelete } from "react-icons/md";
import check from "../static/images/check.png";

interface Props {
  selectedTweetId: number | null;
  handleFetchTweets: () => void;
  onClick: () => void;
}

const DeleteTweet: FC<Props> = ({
  selectedTweetId,
  handleFetchTweets,
  onClick,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDeleteTweet = async () => {
    if (selectedTweetId) {
      setLoading(true);
      try {
        const result = await deleteTweet(selectedTweetId);
        if (result?.status === 200) {
          toast({
            title: "Deleted",
            description: "Tweet has been deleted",
          });
          setSuccess(true);
          await handleFetchTweets();
        } else {
          toast({
            title: "Error",
            description: "Kindly, Try again!",
          });
        }
      } catch (error) {
        console.error("Error deleting tweet:", error);
      } finally {
        setLoading(false);
        setDialogVisible(false);
        setSuccess(false);
      }
    }
  };

  return (
    <>
      <Dialog open={dialogVisible} onOpenChange={() => setDialogVisible(false)}>
        <MdDelete
          className="text-2xl font-black text-red-500 cursor-pointer"
          onClick={() => {
            setDialogVisible(true);
            onClick();
          }}
        />
        <DialogContent className="bg-[#02021a] border-0 outline-none p-5">
          <div className="w-full h-full flex flex-col items-center gap-8">
            <h3 className="text-center text-base font-bold text-white">
              Delete this tweet?
            </h3>
            <div className="flex items-center gap-5">
              <Button
                variant="default"
                size="sm"
                onClick={() => setDialogVisible(false)}
              >
                No
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteTweet}
                disabled={loading}
              >
                {loading ? "Deleting" : "Yes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={success} onOpenChange={() => setSuccess(false)}>
        <DialogContent className="bg-[#0A1019] w-[90%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] max-w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[40%] 2xl:max-w-[40%] h-fit p-2 rounded-lg border-none outline-none">
          <div className="bg-[#101720] p-10 rounded-lg flex flex-col items-center justify-center">
            <p className="text-2xl mb-5">Tweet Deleted</p>
            <img src={check} alt="Check" className="mb-5 w-40 h-40" />
            <p className="text-base mb-10 text-center">
              You have deleted the tweet with id {selectedTweetId}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteTweet;
