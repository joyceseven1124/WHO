import AddNewComponentButton from '@/src/app/ui/formComponent/button/AddNewrComponentButton';
import { PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
export default function EditFormButtonsGroup() {
  return (
    <>
      <div className="group relative mx-auto cursor-pointer  rounded-md border p-5">
        <div className="absolute  left-0  top-0 grid h-full  w-full grid-cols-[auto_auto] items-center justify-center gap-x-2 text-center text-gray-400 group-hover:hidden">
          <p>新增</p>
          <div className="height-5 flex w-5 items-center  justify-center rounded-full border bg-black">
            <PlusIcon width={16} height={16} color="white" />
          </div>
        </div>
        <div className="mx-auto grid max-w-[350px] grid-cols-[auto_auto]  gap-x-5 gap-y-5 opacity-0 group-hover:opacity-100  md:max-w-[520px] md:grid-cols-[auto_auto_auto]">
          <AddNewComponentButton
            componentType="PortfolioEditCardList"
            description="由圖片、敘述文字、連結組成的卡片，共12張"
          >
            <Image
              src="/componentButton/cardList.png"
              width={150}
              height={150}
              alt="Portfolio Card Button"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="PortfolioEditBanner"
            description="由圖片、敘述文字、連結組成的Banner，共1張"
          >
            <Image
              src="/componentButton/bannerCard.png"
              width={150}
              height={150}
              alt="Portfolio Banner Button"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="TimeLineEdit"
            description="由文字軸線所組成"
          >
            <Image
              src="/componentButton/timeLine.png"
              width={150}
              height={150}
              alt="Time Line Button"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="PortfolioEditCardListSlideShow"
            description="由圖片、敘述文字、連結組成的卡片，並且輪播，共12張"
          >
            <Image
              src="/componentButton/cardSlideShow.png"
              width={150}
              height={150}
              alt="Portfolio Card List Slideshow"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="PortfolioEditBannerSlideShow"
            description="由圖片、敘述文字、連結組成的Banner，並且輪播"
          >
            <Image
              src="/componentButton/bannerSlideShow.png"
              width={150}
              height={150}
              alt="Portfolio Banner Slideshow"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="ListPoints"
            description="由文字列點所組成"
          >
            <Image
              src="/componentButton/listPoints.png"
              width={150}
              height={150}
              alt="List Points"
            ></Image>
          </AddNewComponentButton>
        </div>
      </div>
    </>
  );
}
