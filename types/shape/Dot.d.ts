import { PureComponent } from 'react';
import { PresentationAttributesWithProps } from '../util/types';
interface DotProps {
    className?: string;
    cx?: number;
    cy?: number;
    r?: number;
}
export type Props = PresentationAttributesWithProps<DotProps, SVGCircleElement> & DotProps;
export declare class Dot extends PureComponent<Props> {
    render(): JSX.Element;
}
export {};
