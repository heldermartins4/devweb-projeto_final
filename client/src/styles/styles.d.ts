import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title : string;

        colors: {
            primary: string;
            interativy:string;
            transparent:string,
            contrast: string;
            background: string;
            text: string;
            shadowItensMenu: string;
            textEditable: string;
            iconsInput: string;
        }
    }
}