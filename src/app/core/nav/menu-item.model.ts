export interface IMenuItem {
    id: string;
    caption: string;
    link: any[];
    class?: string;
    isVisible?: () => boolean;
    isDisabled?: () => boolean;
    onClick?: (event?: any) => void;
}
