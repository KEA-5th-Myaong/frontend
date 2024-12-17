import Icons from '@/app/_components/ui/Icon';
import { UserIcon, BookmarkIcon } from '@/app/_components/ui/iconPath';

export default function EmptyStateMessage({ type }: { type: string }) {
  const messages = {
    팔로잉: {
      title: '아직 팔로우한 사람이 없어요',
      description: '관심 있는 사람을 팔로우하고 소식을 받아보세요!',
    },
    북마크: {
      title: '북마크한 게시글이 없어요',
      description: '마음에 드는 글을 북마크하고 나중에 다시 읽어보세요!',
    },
  };

  const message = messages[type as keyof typeof messages];

  return (
    <div className="flex-center flex-col py-20 text-center">
      <div className="p-4 mb-6 bg-gray-4 rounded-full flex-center">
        {type === '팔로잉' ? (
          <Icons name={UserIcon} className="mx-1" />
        ) : (
          <Icons name={{ ...BookmarkIcon, options: { stroke: '#c2c2c2', strokeWidth: 2 } }} />
        )}
      </div>
      <p className="text-xl font-bold mb-2">{message?.title}</p>
      <p className="text-gray-0 dark:text-gray-2">{message?.description}</p>
    </div>
  );
}
