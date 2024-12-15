export default function MoreOptions({
  handleEditClick,
  handleDeleteClick,
}: {
  handleEditClick?: () => void;
  handleDeleteClick?: () => void;
}) {
  return (
    <div className="absolute border dark:border-black-5 rounded-lg p-2.5 bg-white-0 dark:bg-black-4 right-0">
      <button
        type="button"
        onClick={handleEditClick}
        className="px-2 sm:px-4 md:px-8 py-1.5 whitespace-nowrap rounded-lg text-gray-0 dark:text-white-0 hover:bg-primary-1 hover:text-white-0"
      >
        수정
      </button>
      <button
        type="button"
        onClick={handleDeleteClick}
        className="px-2 sm:px-4 md:px-8 py-1.5 whitespace-nowrap rounded-lg text-gray-0 dark:text-white-0 hover:bg-primary-1 hover:text-white-0"
      >
        삭제
      </button>
    </div>
  );
}
