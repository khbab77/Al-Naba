 $(document).ready(function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById('current-date').textContent = today.toLocaleDateString('ar-EG', options);
    
    // Mobile menu toggle
    $('.menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
        $(this).toggleClass('active');
        
        if ($('.main-menu').hasClass('active')) {
            $('body').css('overflow', 'hidden');
            $('.menu-toggle').html('<i class="fas fa-times"></i>');
        } else {
            $('body').css('overflow', 'auto');
            $('.menu-toggle').html('<i class="fas fa-bars"></i>');
        }
    });
    
    // Close mobile menu when clicking on a link
    $('.main-menu li a').click(function() {
        $('.main-menu').removeClass('active');
        $('body').css('overflow', 'auto');
        $('.menu-toggle').html('<i class="fas fa-bars"></i>');
    });
    
    // Load breaking news
    loadBreakingNews();
    
    // Load main news
    loadMainNews();
    
    // Load latest news
    loadLatestNews();
    
    // Load trending news
    loadTrendingNews();
});

// Function to load breaking news
function loadBreakingNews() {
    const breakingNewsContainer = document.getElementById('breaking-news-list');
    breakingNewsContainer.innerHTML = '';
    
    // Sample breaking news data
    const breakingNews = [
        { title: 'اجتماع طارئ لمجلس الأمن الدولي لمناقشة الأزمة في منطقة الشرق الأوسط', url: '#', icon: 'fas fa-exclamation-circle' },
        { title: 'ارتفاع كبير في أسعار النفط العالمية مع تزايد التوترات الجيوسياسية', url: '#', icon: 'fas fa-chart-line' },
        { title: 'إطلاق مبادرة جديدة لمكافحة التغير المناخي على مستوى العالم', url: '#', icon: 'fas fa-leaf' },
        { title: 'اكتشاف علمي جديد يفتح آفاقاً لعلاج أحد الأمراض المستعصية', url: '#', icon: 'fas fa-microscope' }
    ];
    
    breakingNews.forEach(news => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${news.url}"><i class="${news.icon}"></i> ${news.title}</a>`;
        breakingNewsContainer.appendChild(li);
    });
}

// Function to load main news
function loadMainNews() {
    const mainNewsContainer = document.getElementById('main-news-container');
    if (!mainNewsContainer) return;
    
    // This will be handled by articles-loader.js
}

// Function to load latest news
function loadLatestNews() {
    const latestNewsContainer = document.getElementById('latest-news-container');
    if (!latestNewsContainer) return;
    
    // This will be handled by articles-loader.js
}

// Function to load trending news
function loadTrendingNews() {
    const trendingNewsContainer = document.getElementById('trending-news');
    trendingNewsContainer.innerHTML = '';
    
    // Sample trending news data
    const trendingNews = [
        {
            title: 'تطورات مثيرة في قضية الفساد الكبرى',
            titleUrl: '#',
            date: 'منذ 3 أيام',
            views: '15.2K'
        },
        {
            title: 'اكتشاف نفطي جديد في المنطقة الغربية',
            titleUrl: '#',
            date: 'منذ 4 أيام',
            views: '12.8K'
        },
        {
            title: 'زلازل متتالية تضرب منطقة آسيا الوسطى',
            titleUrl: '#',
            date: 'منذ 5 أيام',
            views: '10.5K'
        },
        {
            title: 'توقعات بحدوث كارثة مناخية خلال العقد القادم',
            titleUrl: '#',
            date: 'منذ أسبوع',
            views: '9.7K'
        },
        {
            title: 'ثورة تكنولوجية جديدة في عالم السيارات الكهربائية',
            titleUrl: '#',
            date: 'منذ أسبوع',
            views: '8.3K'
        }
    ];
    
    trendingNews.forEach((news, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'trending-news-item';
        newsItem.innerHTML = `
            <div class="number">${index + 1}</div>
            <div class="content">
                <h4><a href="${news.titleUrl}">${news.title}</a></h4>
                <div class="meta">
                    <span><i class="far fa-clock"></i> ${news.date}</span>
                    <span><i class="far fa-eye"></i> ${news.views} مشاهدة</span>
                </div>
            </div>
        `;
        trendingNewsContainer.appendChild(newsItem);
    });
}