import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Artist from "../../lib/types";
import { fetchArtists } from "../../lib/fetchAction";
import { ImSpinner2 } from "react-icons/im";
import artistCover from "../../static/images/artist-cover.jpg";

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchArtists = async () => {
    setLoading(true);
    try {
      const response = await fetchArtists();
      setArtists(response);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchArtists();
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-y-auto scrollbar-hide py-24 px-10">
      <h2 className="text-[30px] font-bold mb-10"> All Artists</h2>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[70vh] w-full gap-3">
          <ImSpinner2 className="text-[#18283f] h-20 w-20 animate-spin" />
          <p className="text-center text-base">
            {" "}
            Fetching Artists <br /> <br /> .....Please wait
          </p>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="20px">
            {artists.map((data, index) => {
              return (
                <div className="flex flex-col gap-3" key={index}>
                  <img
                    src={artistCover}
                    alt="artist"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      margin: "3px",
                    }}
                  />
                  <div className="w-full h-auto flex flex-col items-start">
                    <div className="w-auto h-auto flex flex-row items-center gap-2">
                      <p className="text-gray-500 text-sm">Alias: </p>
                      <p className="text-white text-base">{data?.username}</p>
                    </div>
                    <div className="w-auto h-auto flex flex-row items-center gap-2">
                      <p className="text-gray-500 text-sm">Full Name: </p>
                      <p className="text-white text-lg">{data?.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};
export default Artists;
