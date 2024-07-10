import React, { FC } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ImSpinner2 } from "react-icons/im";
import albumCover from "../static/images/banner.png";

interface Props {
  photos: any;
  loading: boolean;
}

const AlbumPhotos: FC<Props> = ({ photos, loading }) => {
  return (
    <div className="w-full h-[100vh] overflow-y-auto scrollbar-hide p-5">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[70vh] w-full gap-3">
          <ImSpinner2 className="text-[#18283f] h-20 w-20 animate-spin" />
          <p className="text-center text-base">
            Fetching Album photos <br />
            <br />
            .....Please wait
          </p>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="20px">
            {photos.map((data: any) => (
              <img
                key={data.id}
                src={
                  data?.url?.includes("png") ||
                  data?.url?.includes("jpg") ||
                  data?.url?.includes("jpeg")
                    ? data?.url
                    : albumCover
                }
                alt="artist"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  margin: "3px",
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};
export default AlbumPhotos;
