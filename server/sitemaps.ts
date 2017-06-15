sitemaps.add('/sitemap.xml', function() {
    return [
        { page: '/', priority: 1 },
        { page: '/posts', priority: 1 },
        { page: '/blogs', priority: 1 },
        { page: '/signup', priority: 1 },
        { page: '/login', priority: 1 }
    ];
});