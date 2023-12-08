import eye from "../assets/mdi_eye.svg";
import like from "../assets/like.svg";
import commentLogo from "../assets/commentLogo.svg";
import earn from "../assets/earn.svg";

const ReportCard = (props) => {
  const {
    snippet: { publishedAt, thumbnails },
    statistics: { viewCount, likeCount, commentCount },
  } = props;

  return (
    <>
      <div className="ml-5 mt-24 flex h-60 w-4/5 items-center justify-center bg-[#1E1E1E] p-8">
        <div className="flex w-full items-center justify-between">
          <div className="">
            <div className="mb-2 flex w-10/12 bg-[#707070]">
              <img src={earn} alt="" />
              <p className="ml-2 text-white">Top earner video</p>
            </div>
            <img className="rounded-lg" src={thumbnails.medium.url} alt="" />
            <div>
              <p className="text-white">{publishedAt}</p>
            </div>
          </div>

          <div className="text-white">
            <p>How to become a pro UI/UX Designer</p>
            <div className="ml-8 mt-4 flex">
              <img src={eye} alt="" />
              <p>{viewCount}</p>
            </div>
            <div className="ml-8 mt-4 flex">
              <img src={like} alt="" />
              <p>{likeCount}</p>
            </div>
            <div className="ml-8 mt-4 flex">
              <img src={commentLogo} alt="" />
              <p>{commentCount}</p>
            </div>
          </div>

          <div className="m-5 h-40 w-64 rounded-md bg-[#282828]">
            <div className="mb-2 mt-6 text-3xl font-bold text-white"></div>
            <div className="m-auto h-8 w-24 rounded-lg border bg-white"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCard;
