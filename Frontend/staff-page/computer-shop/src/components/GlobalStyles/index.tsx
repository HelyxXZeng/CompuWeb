import { ReactNode } from 'react';
import './GlobalStyles.scss';

interface Props {
    children: ReactNode;
}

function GlobalStyles({ children }: Props) {
    return children;
}

export default GlobalStyles;
