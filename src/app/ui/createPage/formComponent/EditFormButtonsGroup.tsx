import AddNewComponentButton from '@/src/app/ui/createPage/formComponent/button/AddNewComponentButton';
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
            count={12}
          >
            <Image
              src="/componentButton/cardList.png"
              width={150}
              height={150}
              alt="Portfolio Card Button"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="BannerEditCardList"
            description="由圖片、敘述文字、連結組成的Banner，共1張"
            count={1}
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
            count={5}
          >
            <Image
              src="/componentButton/timeLine.png"
              width={150}
              height={150}
              alt="Time Line Button"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="ListPoints"
            description="由文字列點所組成"
            count={3}
          >
            <Image
              src="/componentButton/listPoints.png"
              width={150}
              height={150}
              alt="List Points"
            ></Image>
          </AddNewComponentButton>

          <AddNewComponentButton
            componentType="StringCard"
            description="純文字卡"
            count={1}
          >
            <Image
              src="/componentButton/stringCard.png"
              width={150}
              height={150}
              alt="String Card"
            ></Image>
          </AddNewComponentButton>
        </div>
      </div>
    </>
  );
}
