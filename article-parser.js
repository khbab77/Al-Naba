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
    
    // Load trending news
    loadTrendingNews();
    
    // Parse article content
    parseArticleContent();
});

// Function to parse article content
function parseArticleContent() {
    const articleContainer = $('[data-placeholder="article-container"]');
    
    // Get article metadata from meta tags
    const title = $('meta[name="article-title"]').attr('content') || 'عنوان المقال';
    const category = $('meta[name="article-category"]').attr('content') || 'سياسية';
    const date = $('meta[name="article-date"]').attr('content') || 'منذ يوم';
    const author = $('meta[name="article-author"]').attr('content') || 'محرر النبأ';
    const image = $('meta[name="article-image"]').attr('content') || 'https://picsum.photos/seed/article/1200/600.jpg';
    const imageCaption = $('meta[name="article-image-caption"]').attr('content') || '';
    
    // Update page title
    document.title = title + ' - النبأ الأخباري';
    
    // Build article HTML
    let articleHtml = `
        <div class="article-header">
            <a href="${category}.html" class="article-category">${getCategoryName(category)}</a>
            <h1>${title}</h1>
            <div class="article-meta">
                <span><i class="far fa-clock"></i> ${date}</span>
                <span><i class="far fa-user"></i> ${author}</span>
                <span><i class="far fa-eye"></i> 0 مشاهدة</span>
                <span><i class="far fa-comment"></i> 0 تعليق</span>
            </div>
        </div>

        <div class="article-image">
            <img src="${image}" alt="${title}">
            ${imageCaption ? `<div class="article-image-caption">${imageCaption}</div>` : ''}
        </div>

        <div class="article-content">
            ${articleContainer.html()}
        </div>

        <div class="article-tags">
            <h3>الوسوم</h3>
            <a href="#">${category}</a>
        </div>

        <div class="article-share">
            <h3>مشاركة المقال</h3>
            <div class="share-buttons">
                <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="whatsapp"><i class="fab fa-whatsapp"></i></a>
                <a href="#" class="telegram"><i class="fab fa-telegram"></i></a>
            </div>
        </div>

        <div class="author-box">
            <div class="author-image">
                <img src="https://picsum.photos/seed/author/200/200.jpg" alt="${author}">
            </div>
            <div class="author-info">
                <h3>${author}</h3>
                <p>كاتب في النبأ الأخباري</p>
            </div>
        </div>

        <div class="related-articles">
            <h3>مقالات ذات صلة</h3>
            <div class="related-articles-container" id="related-articles">
                <!-- سيتم تحميل المقالات ذات الصلة من هنا -->
            </div>
        </div>

        <div class="comments-section">
            <h3>التعليقات (0)</h3>
            
            <div class="comment-form">
                <h4>أضف تعليقك</h4>
                <form action="#" method="post">
                    <input type="text" placeholder="الاسم">
                    <input type="email" placeholder="البريد الإلكتروني">
                    <textarea placeholder="التعليق..."></textarea>
                    <button type="submit">نشر التعليق</button>
                </form>
            </div>
        </div>
    `;
    
    // Replace the placeholder content with the formatted article
    articleContainer.html(articleHtml);
    
    // Load related articles
    loadRelatedArticles(category);
}

// Function to load related articles
function loadRelatedArticles(category) {
    const container = document.getElementById('related-articles');
    if (!container) return;
    
    container.innerHTML = '<p>جاري تحميل المقالات ذات الصلة...</p>';
    
    // Get current article path
    const currentPath = window.location.pathname;
    const currentArticle = currentPath.split('/').pop();
    
    // List of article files for the category
    const articleFiles = {
        politics: ['politics-article1.html'],
        economy: ['economy-article1.html'],
        sports: ['sports-article1.html'],
        technology: ['technology-article1.html', ],
        health: ['health-article1.html'],
        culture: ['culture-article1.html'],
        international: ['international-article1.html']
    };
    
    const files = articleFiles[category] || [];
    
    // Filter out the current article
    const relatedFiles = files.filter(file => file !== currentArticle);
    
    // Display up to 3 related articles
    container.innerHTML = '';
    const filesToShow = relatedFiles.slice(0, 3);
    
    if (filesToShow.length === 0) {
        container.innerHTML = '<p>لا توجد مقالات ذات صلة حالياً</p>';
        return;
    }
    
    // Load each related article
    filesToShow.forEach(file => {
        $.ajax({
            url: file,
            dataType: 'html',
            success: function(data) {
                const $temp = $('<div>').html(data);
                
                // Extract metadata from meta tags
                const title = $temp.find('meta[name="article-title"]').attr('content') || file.replace('.html', '');
                const image = $temp.find('meta[name="article-image"]').attr('content') || 'https://picsum.photos/seed/article/400/300.jpg';
                
                const articleElement = document.createElement('div');
                articleElement.className = 'related-article-item';
                articleElement.innerHTML = `
                    <div class="image">
                        <a href="${file}"><img src="${image}" alt="${title}"></a>
                    </div>
                    <div class="content">
                        <h4><a href="${file}">${title}</a></h4>
                    </div>
                `;
                container.appendChild(articleElement);
            },
            error: function() {
                // If we can't load the article, create a basic element
                const articleElement = document.createElement('div');
                articleElement.className = 'related-article-item';
                articleElement.innerHTML = `
                    <div class="content">
                        <h4><a href="${file}">${file.replace('.html', '')}</a></h4>
                    </div>
                `;
                container.appendChild(articleElement);
            }
        });
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