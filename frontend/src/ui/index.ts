export { default as Root } from 'src/ui/root';

export interface IStyledComponentProps<T> {
    classes: Record<keyof T, string>;
}
