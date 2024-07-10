import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AllTweets from "../../lib/types";
import { fetchTweets } from "../../lib/fetchAction";
import { ImSpinner2 } from "react-icons/im";
import user from "../../static/images/user.jpg";
import CreateTweet from "../../custom/CreateTweet";
import EditTweet from "../../custom/EditTweet";
import DeleteTweet from "../../custom/DeleteTweet";

const Tweets = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tweets, setTweets] = useState<AllTweets[]>([]);
  const [selectedTweetId, setSelectedTweetId] = useState<number | null>(null);

  const handleFetchTweets = async () => {
    setLoading(true);
    try {
      const response = await fetchTweets();
      setTweets(response);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTweets();
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-y-auto scrollbar-hide pt-48 pb-10 px-10 relative">
      <div className="w-full flex items-center justify-between fixed top-[85px] md:top-24 lg:top-20 xl:top-20 2xl:top-[90px] left-0 z-10 bg-[#02021a] px-10">
        <h2 className="text-lg md:text-xl lg:text-[30px] xl:text-[30px] 2xl:text-[30px] font-bold mb-10">
          {" "}
          All Tweets
        </h2>
        <CreateTweet handleFetchTweets={handleFetchTweets} />
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[70vh] w-full gap-3">
          <ImSpinner2 className="text-[#18283f] h-20 w-20 animate-spin" />
          <p className="text-center text-base">
            Fetching Tweets <br /> <br /> .....Please wait
          </p>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 500: 3, 700: 4, 900: 4 }}
        >
          <Masonry gutter="20px">
            {tweets.map((data, index) => (
              <div
                className="w-auto h-auto flex flex-col mb-10 gap-5 relative"
                key={index}
              >
                <div className="flex flex-col gap-5 items-center">
                  <img
                    src={user}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-gray-500 text-sm">{data?.email}</p>
                </div>
                <p className="text-white text-base text-center px-5">
                  {data?.body}
                </p>
                <div className="absolute top-0 right-5 w-full flex items-center gap-5 justify-end">
                  <EditTweet
                    selectedTweetId={selectedTweetId}
                    handleFetchTweets={handleFetchTweets}
                    onClick={() => setSelectedTweetId(data.id)}
                  />
                  <DeleteTweet
                    selectedTweetId={selectedTweetId}
                    handleFetchTweets={handleFetchTweets}
                    onClick={() => setSelectedTweetId(data.id)}
                  />
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default Tweets;
