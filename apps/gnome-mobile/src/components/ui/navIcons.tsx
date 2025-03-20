import React from "react";
import { ColorValue } from "react-native";
import { SvgXml } from "react-native-svg";

interface IProps {
  color: ColorValue;
  icon: string;
  size?: number;
}

const NavIcon = ({ color, icon, size = 25 }: IProps) => {
  return <SvgXml xml={icon} width={size} height={size} color={color} />;
};

export default NavIcon;

export const NavHomeIcon = `<svg viewBox="0 0 26 26" color="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9375 10.3959H15.9465" stroke="currentColor" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.9376 6.75C17.9106 6.75 19.5834 8.43041 19.5834 10.4691C19.5834 12.5402 17.8834 13.9936 16.3131 14.982C16.1986 15.0484 16.0692 15.0833 15.9376 15.0833C15.8059 15.0833 15.6765 15.0484 15.5621 14.982C13.9947 13.984 12.2917 12.5474 12.2917 10.4691C12.2917 8.43041 13.9646 6.75 15.9376 6.75Z" stroke="currentColor" stroke-width="1.5625"/>
<path d="M3.4375 13C3.4375 8.33502 3.4375 6.00255 4.88671 4.55333C6.33593 3.10413 8.6684 3.10413 13.3333 3.10413C17.9982 3.10413 20.3307 3.10413 21.78 4.55333C23.2292 6.00255 23.2292 8.33502 23.2292 13C23.2292 17.6649 23.2292 19.9974 21.78 21.4466C20.3307 22.8958 17.9982 22.8958 13.3333 22.8958C8.6684 22.8958 6.33593 22.8958 4.88671 21.4466C3.4375 19.9974 3.4375 17.6649 3.4375 13Z" stroke="currentColor" stroke-width="1.5625"/>
<path d="M18.5417 22.375L3.95837 7.79163" stroke="currentColor" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.25 15.0834L5 21.3334" stroke="currentColor" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const NavMushroomIcon = `<svg viewBox="0 0 26 26" color="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2044 14.0416C13 17.1666 9.54005 18.6068 9.90173 20.5778C10.325 22.8844 12.7285 24.0849 14.5411 23.031C17.1111 21.5367 16.0154 15.9196 14.9914 14.062" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M13.0159 2.58337C8.14886 2.58337 4.18579 5.34191 3.64571 9.90773C2.89027 16.2941 23.057 14.5326 22.3572 9.68643C21.7171 5.25292 17.804 2.58337 13.0159 2.58337Z" stroke="currentColor" stroke-width="1.5"/>
<path d="M17.1666 6.75C18.2083 6.75 19.25 7.79167 19.25 8.83333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const NavImageIcon = `<svg viewBox="0 0 26 25" color="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.91663 18.7234C7.05069 20.0864 7.35367 21.0037 8.03841 21.6884C9.26658 22.9167 11.2433 22.9167 15.1967 22.9167C19.1502 22.9167 21.1269 22.9167 22.3551 21.6884C23.5833 20.4603 23.5833 18.4835 23.5833 14.5301C23.5833 10.5767 23.5833 8.59996 22.3551 7.37178C21.6704 6.68704 20.753 6.38406 19.3901 6.25" stroke="currentColor" stroke-width="1.5625"/>
<path d="M2.74994 10.4166C2.74994 6.48827 2.74994 4.52409 3.97032 3.3037C5.19072 2.08331 7.1549 2.08331 11.0833 2.08331C15.0116 2.08331 16.9759 2.08331 18.1962 3.3037C19.4166 4.52409 19.4166 6.48827 19.4166 10.4166C19.4166 14.345 19.4166 16.3092 18.1962 17.5296C16.9759 18.75 15.0116 18.75 11.0833 18.75C7.1549 18.75 5.19072 18.75 3.97032 17.5296C2.74994 16.3092 2.74994 14.345 2.74994 10.4166Z" stroke="currentColor" stroke-width="1.5625"/>
<path d="M2.74994 11.5818C3.39475 11.4998 4.04665 11.4594 4.69964 11.4607C7.46207 11.4097 10.1569 12.1628 12.3032 13.5859C14.2937 14.9056 15.6923 16.7219 16.2916 18.75" stroke="currentColor" stroke-width="1.5625" stroke-linejoin="round"/>
<path d="M14.2081 7.29169H14.2171" stroke="currentColor" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const NavFriendsIcon = `<svg viewBox="0 0 25 25" color="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.6394 18.75C22.4199 18.75 23.0408 18.2589 23.5982 17.572C24.7393 16.166 22.8658 15.0425 22.1512 14.4923C21.4248 13.9329 20.6138 13.616 19.7915 13.5417M18.7498 11.4583C20.188 11.4583 21.354 10.2924 21.354 8.85417C21.354 7.41593 20.188 6.25 18.7498 6.25" stroke="currentColor" stroke-width="1.5625" stroke-linecap="round"/>
<path d="M3.36022 18.75C2.57968 18.75 1.95887 18.2589 1.40144 17.572C0.260349 16.166 2.13387 15.0425 2.84842 14.4923C3.57481 13.9329 4.38586 13.616 5.20817 13.5417M5.72901 11.4583C4.29077 11.4583 3.12484 10.2924 3.12484 8.85417C3.12484 7.41593 4.29077 6.25 5.72901 6.25" stroke="currentColor" stroke-width="1.5625" stroke-linecap="round"/>
<path d="M8.42047 15.7408C7.35611 16.3989 4.56544 17.7428 6.26515 19.4244C7.09544 20.2458 8.02017 20.8333 9.18278 20.8333H15.8169C16.9795 20.8333 17.9042 20.2458 18.7346 19.4244C20.4342 17.7428 17.6436 16.3989 16.5792 15.7408C14.0833 14.1975 10.9163 14.1975 8.42047 15.7408Z" stroke="currentColor" stroke-width="1.5625" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.1457 7.81252C16.1457 9.82606 14.5134 11.4584 12.4999 11.4584C10.4863 11.4584 8.854 9.82606 8.854 7.81252C8.854 5.79898 10.4863 4.16669 12.4999 4.16669C14.5134 4.16669 16.1457 5.79898 16.1457 7.81252Z" stroke="currentColor" stroke-width="1.5625"/>
</svg>`;
