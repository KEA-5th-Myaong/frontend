// components/SubMenu.tsx

interface SubMenuProps {
  menuItems: { id: number; name: string; onClick: () => void }[];
}

export default function SubMenu({ menuItems }: SubMenuProps) {
  return (
    <div className="absolute bg-white-0 border-2 text-gray-0 w-[108px] left-1/2 transform -translate-x-1/2 rounded-md mt-2">
      {menuItems.map((menu) => (
        <div key={menu.id} className="w-[88px] h-8 mx-auto m-2">
          <button
            type="button"
            className="hover:bg-primary-1 hover:text-white-0 font-normal text-gray-0 text-xs rounded-md w-full h-full"
            onClick={menu.onClick}
          >
            {menu.name}
          </button>
        </div>
      ))}
    </div>
  );
}
