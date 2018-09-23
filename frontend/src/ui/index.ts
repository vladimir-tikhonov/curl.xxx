export { default as Root } from 'src/ui/root';

export interface StyledComponentProps<T> {
    classes: Record<keyof T, string>;
}
