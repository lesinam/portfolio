document.addEventListener('DOMContentLoaded', function() {
    
    // 1. スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // モバイルでメニューを閉じる
            if (document.querySelector('.nav-links').classList.contains('active')) {
                 document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    
    // 2. ダークモードの切り替え
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // 保存された状態をロード
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // アイコンと状態を更新して保存
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    
    // 3. スキルバーのアニメーション（スクロール時）
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsSection = document.getElementById('skills');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // セクションが表示されたらアニメーションを開始
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-skill');
                    bar.style.width = percentage + '%';
                });
                
                // 監視を停止
                observer.unobserve(skillsSection); 
            }
        });
    }, {
        threshold: 0.5 // 50%表示されたら開始
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    
    // 4. モバイル用バーガーメニュー
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});