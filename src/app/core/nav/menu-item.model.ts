export interface IMenuItem {
    caption: string;
    link: any[];
    isVisible?: () => boolean;
    isDisabled?: () => boolean;
    onClick?: (event?: any) => void;
}
