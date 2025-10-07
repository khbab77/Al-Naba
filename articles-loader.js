$(document).ready(function() {
    // Load articles for each category
    loadCategoryArticles('politics', 'politics-news-container');
    loadCategoryArticles('economy', 'economy-news-container');
    loadCategoryArticles('sports', 'sports-news-container');
    loadCategoryArticles('technology', 'technology-news-container');
    loadCategoryArticles('health', 'health-news-container');
    loadCategoryArticles('culture', 'culture-news-container');
    loadCategoryArticles('international', 'international-news-container');
    
    // Load featured articles for main news
    loadFeaturedArticles('main-news-container', 4);
    
    // Load latest articles for latest news
    loadLatestArticles('latest-news-container', 6);
});

// Function to load articles for a specific category
function loadCategoryArticles(category, containerId, limit = 10) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<p>جاري تحميل الأخبار...</p>';
    
    // List of article files for each category
    const articleFiles = {
        politics: ['politics-article1.html'],
        economy: ['economy-article1.html'],
        sports: ['sports-article1.html','sports-article2.html'],
        technology: ['technology-article1.html'],
        health: ['health-article1.html'],
        culture: ['culture-article1.html'],
        international: ['international-article1.html']
    };
    
    const files = articleFiles[category] || [];
    const articlesToShow = files.slice(0, limit);
    
    if (articlesToShow.length === 0) {
        container.innerHTML = '<p>لا توجد مقالات في هذا القسم حالياً</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Load each article's metadata
    articlesToShow.forEach(articleFile => {
        loadArticleMetadata(articleFile, category, container);
    });
}

// Function to load FEATURED articles (أهم الأخبار)
function loadFeaturedArticles(containerId, limit = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<p>جاري تحميل الأخبار...</p>';
    
    // قائمة المقالات المميزة - أضف هنا الملفات التي تريدها في أهم الأخبار
    const featuredArticles = [
        
        { file: 'sports-article1.html', category: 'sports' },
        { file: 'sports-article2.html', category: 'sports' },
         { file: 'health-article1.html', category: 'health' },
        // أضف المزيد من المقالات المهمة هنا
    ];
    
    const articlesToShow = featuredArticles.slice(0, limit);
    
    if (articlesToShow.length === 0) {
        container.innerHTML = '<p>لا توجد مقالات مميزة حالياً</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Load each article's metadata
    articlesToShow.forEach(article => {
        loadArticleMetadata(article.file, article.category, container);
    });
}

// Function to load LATEST articles (أحدث الأخبار)
function loadLatestArticles(containerId, limit = 6) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<p>جاري تحميل الأخبار...</p>';
    
    // List of all article files
    const allArticleFiles = [
        { file: 'politics-article1.html', category: 'politics' },
        { file: 'economy-article1.html', category: 'economy' },
        { file: 'sports-article1.html', category: 'sports' },
        { file: 'technology-article1.html', category: 'technology' },
        { file: 'health-article1.html', category: 'health' },
        { file: 'culture-article1.html', category: 'culture' },
        { file: 'international-article1.html', category: 'international' }
    ];
    
    // Sort articles by file name (في التطبيق الحقيقي، استخدم التاريخ)
    allArticleFiles.sort((a, b) => b.file.localeCompare(a.file));
    
    container.innerHTML = '';
    const articlesToShow = allArticleFiles.slice(0, limit);
    
    if (articlesToShow.length === 0) {
        container.innerHTML = '<p>لا توجد مقالات حالياً</p>';
        return;
    }
    
    // Load each article's metadata
    articlesToShow.forEach(article => {
        loadArticleMetadata(article.file, article.category, container);
    });
}

// Function to load article metadata
function loadArticleMetadata(articleFile, category, container) {
    $.ajax({
        url: articleFile,
        dataType: 'html',
        success: function(data) {
            const $temp = $('<div>').html(data);
            
            // Extract metadata from meta tags
            const title = $temp.find('meta[name="article-title"]').attr('content') || articleFile.replace('.html', '');
            const excerpt = $temp.find('meta[name="article-excerpt"]').attr('content') || '';
            const image = $temp.find('meta[name="article-image"]').attr('content') || 'https://picsum.photos/seed/article/400/300.jpg';
            const date = $temp.find('meta[name="article-date"]').attr('content') || 'منذ يوم';
            const author = $temp.find('meta[name="article-author"]').attr('content') || 'محرر النبأ';
            
            // Create article element
            const articleElement = document.createElement('div');
            
            // Use different class based on container
            if (container.id === 'main-news-container') {
                articleElement.className = 'main-news-item';
                articleElement.innerHTML = `
                    <div class="image">
                        <a href="${articleFile}"><img src="${image}" alt="${title}"></a>
                    </div>
                    <div class="content">
                        <a href="${category}.html" class="category">${getCategoryName(category)}</a>
                        <h3><a href="${articleFile}">${title}</a></h3>
                        <div class="meta">
                            <span><i class="far fa-clock"></i> ${date}</span>
                            <span><i class="far fa-user"></i> ${author}</span>
                        </div>
                    </div>
                `;
            } else if (container.id === 'latest-news-container') {
                articleElement.className = 'latest-news-item';
                articleElement.innerHTML = `
                    <div class="image">
                        <a href="${articleFile}"><img src="${image}" alt="${title}"></a>
                    </div>
                    <div class="content">
                        <a href="${category}.html" class="category">${getCategoryName(category)}</a>
                        <h3><a href="${articleFile}">${title}</a></h3>
                        <div class="meta">
                            <span><i class="far fa-clock"></i> ${date}</span>
                            <span><i class="far fa-user"></i> ${author}</span>
                        </div>
                    </div>
                `;
            } else {
                articleElement.className = 'category-news-item';
                articleElement.innerHTML = `
                    <div class="image">
                        <a href="${articleFile}"><img src="${image}" alt="${title}"></a>
                    </div>
                    <div class="content">
                        <h3><a href="${articleFile}">${title}</a></h3>
                        ${excerpt ? `<p>${excerpt}</p>` : ''}
                        <div class="meta">
                            <span><i class="far fa-clock"></i> ${date}</span>
                            <span><i class="far fa-user"></i> ${author}</span>
                        </div>
                    </div>
                `;
            }
            
            container.appendChild(articleElement);
        },
        error: function() {
            // If we can't load the article, create a basic element
            const articleElement = document.createElement('div');
            
            if (container.id === 'main-news-container') {
                articleElement.className = 'main-news-item';
            } else if (container.id === 'latest-news-container') {
                articleElement.className = 'latest-news-item';
            } else {
                articleElement.className = 'category-news-item';
            }
            
            articleElement.innerHTML = `
                <div class="content">
                    <a href="${category}.html" class="category">${getCategoryName(category)}</a>
                    <h3><a href="${articleFile}">${articleFile.replace('.html', '')}</a></h3>
                    <div class="meta">
                        <span><i class="far fa-clock"></i> منذ يوم</span>
                        <span><i class="far fa-user"></i> محرر النبأ</span>
                    </div>
                </div>
            `;
            
            container.appendChild(articleElement);
        }
    });
}

// Function to get category name in Arabic
function getCategoryName(category) {
    const categoryNames = {
        politics: 'سياسية',
        economy: 'اقتصادية',
        sports: 'رياضية',
        technology: 'تكنولوجيا',
        health: 'صحة',
        culture: 'ثقافة',
        international: 'دولية'
    };
    
    return categoryNames[category] || category;
}
