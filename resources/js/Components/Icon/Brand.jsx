import React from 'react';

const EmptyDatasImg = ({color, className, ...rest}) => {
    return (
        <svg viewBox="400 300 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m102.958 162.245 94.388-43.571 94.286 43.571-94.286 23.776-94.388-23.776Z" fill="#000" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M231.735 71.326c-5.612 0-9.592 1.94-12.347 4.082-2.857 2.143-4.286.714-6.939-2.143-3.367-3.571-11.53-2.347-17.041-1.734-9.387 1.02-16.734 8.265-17.755 17.653-1.326 12.142 8.164 22.347 20 22.347 3.776 0 7.347-1.021 10.408-2.96 4.082-2.449 9.082-2.347 13.164.102 2.551 1.531 6.02 2.756 10.51 2.756s7.959-1.225 10.51-2.756c4.082-2.449 9.184-2.653 13.163-.102 3.062 1.837 6.633 2.96 10.409 2.96 11.836 0 21.326-10.205 20-22.347-1.021-9.388-8.368-16.735-17.756-17.653a19.595 19.595 0 0 0-14.387 4.081c-2.857 2.143-6.735 2.041-9.592-.102-2.755-2.347-6.735-4.184-12.347-4.184ZM290.715 83.265a3.878 3.878 0 1 0 0-7.755 3.878 3.878 0 0 0 0 7.755Z" fill="#000"/>
            <path d="M74.999 64.388H60.713V78.06h14.286V64.387ZM89.182 50.51H74.897v13.673h14.285V50.51Z" fill="#fff" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M244.798 52.55h-5.204v5.205h5.204V52.55ZM286.632 54.695h-39.081v1.02h39.081v-1.02ZM291.123 54.696h-1.02v1.02h1.02v-1.02ZM322.245 55.715h-1.939v-1.02h1.939v1.02Zm-7.755 0h-1.939v-1.02h1.939v1.02Zm-7.858 0h-1.938v-1.02h1.938v1.02Zm-7.755 0h-1.939v-1.02h1.939v1.02ZM329.079 54.695h-1.02v1.02h1.02v-1.02ZM332.348 60.001l-.51-.816 6.224-3.776-6.224-4.081.612-.919 7.551 5-7.653 4.592Z" fill="#000"/>
            <path d="m281.428 44.898 7.551-9.183M275.714 20l-13.163 26.53M125.716 71.938l19.898 25M150.203 37.245l15.102 36.122" stroke="#DEDFEA" strokeWidth=".87" strokeMiterlimit="10"/>
            <path d="m200.408 200.919 19.388 6.123h12.449v-67.143l20.918 17.143c6.837 6.632 17.857 6.224 24.082-1.021l20.306-23.367 15.612 9.082c1.429.816 3.265.408 4.184-.919.918-1.428.51-3.367-.918-4.285l-15-9.592 15.204 9.694c1.326.918 3.163.51 4.081-.817.919-1.428.612-3.265-.816-4.183l-14.796-9.694 14.592 9.592c1.53 1.02 3.673.612 4.694-.919 1.02-1.53.612-3.673-.919-4.694l-14.387-9.592 14.489 9.592c1.531 1.021 3.674.613 4.694-.918 1.021-1.633.613-3.776-1.02-4.796l-24.286-15.102 8.367-4.592c1.939-1.02 2.654-3.367 1.633-5.306-1.02-1.939-3.367-2.755-5.306-1.837l-8.163 3.98c-6.021 2.959-10.817 6.326-14.592 10.612l-17.551 19.694s-22.449-19.796-32.245-28.775c-4.082-3.776-9.286-6.123-14.796-6.02l-22.959.611h1.122-1.428 1.122l-22.959-.612c-5.51-.102-10.714 2.245-14.796 6.02-9.796 8.98-32.245 28.776-32.245 28.776l-17.551-19.694c-3.775-4.286-8.571-7.755-14.592-10.612l-8.163-3.98c-1.939-.918-4.388-.204-5.306 1.837-.918 1.939-.204 4.286 1.632 5.306l8.368 4.592-24.286 15.102c-1.632 1.02-2.04 3.163-1.02 4.796 1.02 1.531 3.163 1.939 4.694.918l14.49-9.592-14.388 9.592c-1.53 1.021-1.94 3.164-.919 4.694 1.02 1.531 3.164 1.939 4.694.919l14.592-9.592-14.796 9.694c-1.428.918-1.837 2.857-.816 4.183.918 1.327 2.755 1.735 4.081.817l15.205-9.694-15 9.592c-1.43.918-1.837 2.857-.919 4.285.919 1.327 2.755 1.735 4.184.919l15.612-9.082 20.306 23.367c6.225 7.245 17.347 7.653 24.082 1.021l20.918-17.143v67.143h12.449l19.388-6.123h5.306Z" fill="#FFC7DE" stroke="#000" strokeWidth=".87" strokeMiterlimit="10"/>
            <path d="M259.693 121.123c-7.449-6.633-18.673-16.633-24.898-22.245-4.082-3.775-9.286-6.122-14.796-6.02l-22.959.612h1.122-1.428 1.122l-22.959-.612c-5.51-.102-10.714 2.245-14.796 6.02-6.224 5.714-17.449 15.714-24.898 22.245l20.612 24.388 6.837-5.612v67.142h12.449l19.388-6.122h6.02l19.388 6.122h12.449v-67.142l6.837 5.612 20.51-24.388Z" fill="#FF006C" stroke="#000" strokeWidth=".87" strokeMiterlimit="10"/>
            <path d="M292.041 115.817c5.918 0 10.714-4.796 10.714-10.714" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="m297.552 132.653-3.061-1.734-7.245 13.367 10.306-11.633Z" fill="#000" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M102.859 115.817c-5.919 0-10.715-4.796-10.715-10.715" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="m97.347 132.653 3.061-1.735 7.143 13.368-10.204-11.633Z" fill="#000" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M219.897 83.98c-.714 0-1.326.103-1.938.409-1.735-9.49-10.102-16.633-20.102-16.633s-18.266 7.143-20.102 16.633c-.613-.204-1.225-.408-1.939-.408-2.857 0-5.102 2.245-5.102 5.102s2.245 5.102 5.102 5.102c.816 0 1.633-.204 2.347-.613 2.347 8.572 10.306 14.898 19.694 14.898 9.387 0 17.245-6.326 19.694-14.898.714.409 1.53.613 2.346.613 2.858 0 5.103-2.245 5.103-5.102 0-2.858-2.245-5.102-5.103-5.102Z" fill="#FFC7DE" stroke="#000" strokeWidth=".87" strokeMiterlimit="10"/>
            <path d="M197.855 67.755s-15.612-.612-20.306 17.041c.714.306 1.326.919 1.837 1.633.51.714 1.02.51 1.02-.306.408-4.592 3.265-8.776 4.49-9.898.714-.612.816.408 1.224 1.326 2.653 7.041 14.082 16.53 29.184 9.184.816-.408 3.163-1.939 3.163-1.939-4.694-17.653-20.306-17.04-20.306-17.04h-.306Z" fill="#000"/>
            <path d="M102.958 162.246v90.306l94.388 27.551v-94.082l-94.388-23.775ZM291.733 162.246v90.306l-94.387 27.551v-94.082l94.387-23.775Z" fill="#B6BBE2" stroke="#000" strokeWidth=".87" strokeMiterlimit="10"/>
            <path d="m103.469 170.715.102 45.306 55.306 15.918 38.469-45.918-93.877-15.306ZM291.43 170.715v45.306l-55.306 15.918-38.47-45.918 93.776-15.306Z" fill="#000" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m292.042 162.246 45 34.183-99.694 27.449-39.796-37.857 94.49-23.775ZM102.959 162.246 60 195.001l97.551 28.877 39.796-37.857-94.388-23.775Z" fill="#DEDFEA" stroke="#000" strokeWidth=".87" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export {
    EmptyDatasImg,
};