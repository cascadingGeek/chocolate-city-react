import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AllAlbums from "../../lib/types";
import { fetchAlbumPhotos, fetchAlbums } from "../../lib/fetchAction";
import { ImSpinner2 } from "react-icons/im";
import albumCover from "../../static/images/album-cover.jpg";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../components/ui/dialog";
import AlbumPhotos from "../../custom/AlbumPhotos";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const Albums = () => {
  const [albums, setAlbums] = useState<AllAlbums[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleFetchAllAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetchAlbums();
      setAlbums(response);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAlbumPhotos = async (albumId: number) => {
    setLoading(true);
    try {
      const response = await fetchAlbumPhotos(albumId);
      setPhotos(response);
      setSelectedAlbumId(albumId);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching album photos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllAlbums();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-[100vh] overflow-y-auto scrollbar-hide py-24 px-10">
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="bg-[#02021a] w-[90%] md:w-[50%] lg:w-[40%] xl:w-[40%] 2xl:w-[40%] max-w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[40%] 2xl:max-w-[40%] h-fit p-2 rounded-lg border-none outline-none">
          <div className="bg-transparent p-10 rounded-lg flex justify-center items-center flex-col">
            <p className="text-2xl mb-5 font-black text-white">Hello there!</p>
            <p className="text-base mb-10 text-center font-normal text-white">
              You can click on any of the albums to view the photos 😊
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <h2 className="text-[30px] font-bold mb-10">All Albums</h2>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[70vh] w-full gap-3">
          <ImSpinner2 className="text-[#18283f] h-20 w-20 animate-spin" />
          <p className="text-center text-base">
            Fetching Albums <br />
            <br />
            .....Please wait
          </p>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="20px">
            {albums.map((data, index) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className="flex flex-col gap-3 cursor-pointer"
                      key={index}
                      onClick={() => handleFetchAlbumPhotos(data.id)}
                    >
                      <img
                        src={albumCover}
                        alt="albums"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          margin: "3px",
                        }}
                      />
                      <div className="w-auto h-auto flex flex-row items-center gap-2">
                        <p className="text-gray-500 text-sm">Alias: </p>
                        <p className="text-white text-base">
                          {data?.title?.slice(0, 20)}
                        </p>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-base">Click to view album photos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild />
        <DialogContent className="top-[50%] left-[50%] max-w-[90vw] max-h-[90vh] md:overflow-y-auto lg:overflow-y-auto xl:overflow-y-auto 2xl:overflow-y-auto bg-[#02021a] border border-slate-800 p-1">
          <AlbumPhotos photos={photos} loading={loading} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Albums;
