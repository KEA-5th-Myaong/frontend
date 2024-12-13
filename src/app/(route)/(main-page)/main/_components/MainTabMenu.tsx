interface TabMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MainTabMenu({ activeTab, onTabChange }: TabMenuProps) {
  return (
    <div className="flex flex-col w-full max-w-[254px] sm:max-w-[416px]">
      <div className="flex justify-around w-full relative">
        {['최신', '팔로잉', '북마크'].map((tab) => (
          <button key={tab} type="button" onClick={() => onTabChange(tab)} className="pb-2">
            {tab}
          </button>
        ))}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-300 rounded-[10px]" />
        {activeTab !== '직군' && (
          <div
            className="absolute bottom-0 h-[2px] bg-primary-1 transition-all duration-300 ease-in-out rounded-[10px] w-1/3"
            style={{
              left: `${(['최신', '팔로잉', '북마크'].indexOf(activeTab) / 3) * 100}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}
