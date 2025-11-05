import Icon from "@/components/Icon";
import Button from "@/components/Button";
import SearchModal from "@/components/SearchModal";
import Notifications from "./Notifications";
import UserMenu from "./UserMenu";

type Props = {
    title: string;
    toggle: boolean;
    onShow: () => void;
    userName?: string;
    userRole?: string;
    userAvatar?: string;
};

const Header = ({
    title,
    toggle,
    onShow,
    userName = "Usuário",
    userRole = "Admin",
    userAvatar,
}: Props) => (
    <div
        className={`fixed top-0 right-0 z-20 px-8 bg-white max-md:px-0 ${
            toggle ? "left-18" : "left-69 max-xl:left-0"
        }`}
    >
        <div className="relative flex items-center h-18.25 border-b border-gray-100 max-md:h-16.25 max-md:px-6">
            <Button
                className="!hidden mr-6 [&_svg]:!size-5 max-xl:!flex"
                icon="burger"
                isSecondary
                isSmall
                isSquare
                onClick={onShow}
            />
            <div className="text-h5 max-md:hidden">{title}</div>
            <div className="flex items-center ml-auto">
                <SearchModal
                    className="!hidden max-xl:!flex"
                    onlyIcon
                    disableHotkeys
                />
                <Notifications />
                <div className="w-0.25 h-5 mx-2.5 bg-gray-100"></div>
                <UserMenu
                    userName={userName}
                    userRole={userRole}
                    userAvatar={userAvatar}
                />
            </div>
        </div>
    </div>
);

export default Header;
