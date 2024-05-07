interface INavItem {
    id: number
    title: string,
    link?: string,
    subItems?: INavItem[]
}

export const navItems: INavItem[] = [
    {
        id: 0,
        title: 'Home',
        link: '/',
    }, {
        id: 1,
        title: 'About',
        link: '/about',
    }, {
        id: 2,
        title: 'Works',
        subItems: [
            {
                id: 3,
                title: 'Mobile App',
                link: '/works?work=mobile-app',
            }, {
                id: 4,
                title: 'Website',
                link: '/works?work=website',
            }, {
                id: 5,
                title: 'Graphic',
                link: '/works?work=graphic',
            }, {
                id: 6,
                title: 'Artwork',
                subItems: [
                    {
                        id: 7,
                        title: 'Creative Coding',
                        link: '/works?work=creative-coding',
                    }, {
                        id: 8,
                        title: '3D Modeling',
                        link: '/works?work=3d-modeling',
                    }, {
                        id: 9,
                        title: 'Drawing',
                        link: '/works?work=drawing',
                    }, {
                        id: 10,
                        title: 'Arduino',
                        link: 'works?work=arduino',
                    },
                ],
            }, {
                id: 11,
                title: 'Tool',
                link: '/works?work=tool',
            }, {
                id: 12,
                title: 'All',
                link: '/works',
            },
        ]
    }, {
        id: 13,
        title: 'Blog',
        link: '/blog',
    }, {
        id: 14,
        title: 'Contact',
        link: '/contact',
    },
]