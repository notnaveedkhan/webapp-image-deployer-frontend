export interface Links {
    text: string,
    url: string
}

export const links: Links[] = [
    {
        text: 'Dashboard',
        url: '/'
    },
    {
        text: 'Clusters',
        url: '/cluster'
    },
    {
        text: 'Deployments',
        url: '/deployments'
    },
    {
        text: 'Blogs',
        url: '/blogs'
    },
    {
        text: 'About',
        url: '/about'
    }
]





export const adminLinks: Links[] = [
    {
        text: 'Admin Dashboard',
        url: '/'
    },
    {
        text: 'Announcements',
        url: '/announcements'
    },
    {
        text: 'Users',
        url: '/users'
    },
    {
        text: 'Clusters',
        url: '/admin/clusters'
    }
]


export const helpLinks: Links[] = [
    {
        text: 'Help',
        url: '/help'
    },
    {
        text: 'Contact',
        url: '/contact'
    },
    {
        text: 'About',
        url: '/about'
    },
    {
        text: 'Terms',
        url: '/terms'
    },
    {
        text: 'Reports',
        url: '/reports'
    }
]