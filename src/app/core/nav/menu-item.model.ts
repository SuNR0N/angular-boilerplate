export interface IMenuItem {
    caption: string;
    link: any[];
    class?: string;
    isVisible?: () => boolean;
    isDisabled?: () => boolean;
    onClick?: (event?: any) => void;
}
