import Link from 'next/link';

export default function SubMenu({ isBlog, userName }: { isBlog?: boolean; userName?: string }) {
  return (
    <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
      {isBlog ? (
        <>
          <div className="w-[88px] h-8 mx-auto m-2">
            <Link
              href={`/blog/${userName}`}
              className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            >
              내 블로그
            </Link>
          </div>
          <div className="w-[88px] h-8 mx-auto m-2">
            <Link
              href={`/blog/${userName}/write`}
              className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            >
              글쓰기
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="w-[88px] h-8 mx-auto m-2">
            <Link
              href={`/interview/${userName}/select`}
              className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            >
              모의 면접
            </Link>
          </div>
          <div className="w-[88px] h-8 mx-auto m-2">
            <Link
              href={`/personal-statement/${userName}/list`}
              className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            >
              자소서 첨삭
            </Link>
          </div>
          <div className="w-[88px] h-8 mx-auto m-2">
            <Link
              href="/portfolio"
              className="flex-center hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            >
              내 포트폴리오
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
