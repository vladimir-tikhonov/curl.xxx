export { default as Root } from 'src/ui/root';

export type ExtractClassesPropType<T> = T extends (...args: any[]) => infer R
    ? StyledComponentProps<R>
    : StyledComponentProps<T>;

interface StyledComponentProps<T> {
    classes: Record<keyof T, string>;
}
