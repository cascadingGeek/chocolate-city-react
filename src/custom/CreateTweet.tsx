import React, { FC, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { postTweet } from "../lib/fetchAction";
import { useToast } from "../components/ui/use-toast";
import { useTweetToCreateStore } from "../store/createStore";
import { Dialog, DialogContent } from "../components/ui/dialog";

interface Props {
  handleFetchTweets: () => void;
}

const CreateTweet: FC<Props> = ({ handleFetchTweets }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const {
    postId,
    id,
    name,
    email,
    body,
    setTweetToCreate,
    resetTweetToCreate,
  } = useTweetToCreateStore();
  const [errors, setErrors] = useState({
    postId: false,
    id: false,
    name: false,
    email: false,
    body: false,
  });

  const validateInput = (field: string, value: string) => {
    switch (field) {
      case "postId":
      case "id":
        return value.trim() !== "";
      case "name":
        return /^[A-Za-z\s]+$/.test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "body":
        return value.trim() !== "";
      default:
        return false;
    }
  };

  const handleChange = (field: keyof typeof errors, value: string) => {
    setTweetToCreate(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: !validateInput(field, value),
    }));
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error);
  };

  useEffect(() => {
    setErrors({
      postId: !validateInput("postId", postId),
      id: !validateInput("id", id),
      name: !validateInput("name", name),
      email: !validateInput("email", email),
      body: !validateInput("body", body),
    });
  }, [postId, id, name, email, body]);

  const handleCreateTweet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast({
        title: "Error",
        description: "All fields are required and must be valid",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await postTweet({ postId, id, name, email, body });
      if (response?.status === 201) {
        toast({
          title: "Created",
          description: "Tweet has been created",
        });
        resetTweetToCreate();
        setErrors({
          postId: false,
          id: false,
          name: false,
          email: false,
          body: false,
        });
        await handleFetchTweets();
      } else {
        toast({
          title: "Error",
          description: "Please try again!",
        });
      }
    } catch (error) {
      console.error("Error creating tweet:", error);
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
      <Button
        variant="default"
        size="lg"
        className="bg-white text-gray-500"
        onClick={() => setDialogVisible(true)}
      >
        Create
      </Button>
      <DialogContent className="bg-[#02021a] border-0 outline-none p-5">
        <h3 className="text-white font-bold text-lg text-center mb-3">
          Create Tweet
        </h3>
        <form
          onSubmit={handleCreateTweet}
          className="w-full h-auto flex flex-col gap-5"
        >
          <input
            placeholder="Post ID"
            value={postId}
            onChange={(e) => handleChange("postId", e.target.value)}
            className={`border ${
              errors.postId ? "border-red-500" : "border-gray-500"
            } bg-transparent text-white px-3 py-2 rounded-lg`}
          />
          <input
            placeholder="ID"
            value={id}
            onChange={(e) => handleChange("id", e.target.value)}
            className={`border ${
              errors.id ? "border-red-500" : "border-gray-500"
            } bg-transparent text-white px-3 py-2 rounded-lg`}
          />
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-500"
            } bg-transparent text-white px-3 py-2 rounded-lg`}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-500"
            } bg-transparent text-white px-3 py-2 rounded-lg`}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => handleChange("body", e.target.value)}
            className={`border ${
              errors.body ? "border-red-500" : "border-gray-500"
            } bg-transparent text-white mb-5 px-3 py-2 rounded-lg`}
          ></textarea>
          <div className="flex items-center gap-5">
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={() => setDialogVisible(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              disabled={loading || !isFormValid()}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTweet;
