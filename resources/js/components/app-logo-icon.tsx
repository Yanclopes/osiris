import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/favicon.svg"
            alt="Logo Osíris"
            className={props.className}
            style={props.style}
            width={props.width || 40}
            height={props.height || 42}
        />
    );
}
