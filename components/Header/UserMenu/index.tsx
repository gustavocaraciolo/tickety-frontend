import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Logout from "@/components/Sidebar/Logout";

type UserMenuProps = {
    userName: string;
    userRole: string;
    userAvatar?: string;
};

const UserMenu = ({ userName, userRole, userAvatar }: UserMenuProps) => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const menuItems = [
        {
            title: "Profile",
            icon: "user",
            href: "/settings",
        },
        {
            title: "Sair",
            icon: "logout",
            onClick: () => setIsLogoutModalOpen(true),
        },
    ];

    return (
        <>
            <Menu>
                <MenuButton className="flex items-center gap-2 max-md:gap-0 group">
                    <div className="flex justify-center items-center shrink-0 size-8 bg-primary-100 rounded-full">
                        {userAvatar ? (
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="size-8 rounded-full object-cover"
                            />
                        ) : (
                            <Icon
                                className="!size-4 fill-primary-500"
                                name="user"
                            />
                        )}
                    </div>
                    <div className="text-body-sm max-md:hidden">
                        <div className="font-semibold">{userName}</div>
                        <div className="text-gray-500">{userRole}</div>
                    </div>
                    <Icon
                        className="hidden ml-2 !size-4 fill-gray-400 transition-colors group-hover:fill-gray-900 group-[[data-open]]:fill-gray-900 group-[[data-open]]:rotate-90 max-md:block"
                        name="chevron"
                    />
                </MenuButton>
                <MenuItems
                    className="[--anchor-gap:0.5rem] [--anchor-offset:0.75rem] z-20 flex flex-col w-48 p-2 border border-gray-100 rounded-2xl outline-0 bg-white shadow-[0_1rem_2rem_-0.0625rem_rgba(128,136,151,0.20)] transition duration-200 ease-out origin-top data-closed:scale-95 data-closed:opacity-0 max-md:!left-auto max-md:right-6"
                    anchor="bottom end"
                    transition
                    modal={false}
                >
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.title}
                            as={item.href ? Link : "button"}
                            {...(item.href ? { href: item.href } : {})}
                            onClick={item.onClick}
                            className="group flex items-center gap-3 h-10 px-3 rounded-lg text-body-md font-medium text-gray-500 transition-colors hover:bg-gray-25 hover:text-gray-900"
                        >
                            <Icon
                                className="!size-5 fill-gray-400 transition-colors group-hover:fill-gray-900"
                                name={item.icon}
                            />
                            {item.title}
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
            <Modal open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
                <Logout onClose={() => setIsLogoutModalOpen(false)} />
            </Modal>
        </>
    );
};

export default UserMenu;
