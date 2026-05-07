// ─── LANGUAGE ───
const LANG_KEY = 'nuvis_lang';
const TRANSLATIONS = {
  ja: {
    home: 'ホーム', history: '視聴履歴', trend: 'トレンド', settings: '設定',
    search_placeholder: '動画を検索...', search_btn: '検索',
    welcome: 'Nuvisへようこそ', subtitle: 'YouTube 視聴サービス',
    trending: '急上昇', shorts: 'Shorts', videos: '動画',
    search_results: '検索結果：', related: '関連動画',
    views: '回視聴', likes: 'いいね', share: '共有', dl: 'DL',
    login_title: 'パスワードを入力してください', login_btn: 'ログイン',
    password: 'パスワード', hide_menu: 'メニューを隠す', show_menu: 'メニューを表示',
    channel_name: 'チャンネル名', subscribers: '万人 登録者',
    description: '動画の説明文', see_more: 'もっと見る', see_less: '閉じる',
    comment_placeholder: 'コメントを追加...', comments: 'コメント',
    lang_setting: '言語', appearance: '外観', notifications: '通知',
    privacy: 'プライバシー', dark_mode: 'ダークモード', autoplay: '自動再生',
  },
  en: {
    home: 'Home', history: 'History', trend: 'Trending', settings: 'Settings',
    search_placeholder: 'Search videos...', search_btn: 'Search',
    welcome: 'Welcome to Nuvis', subtitle: 'YouTube Viewing Service',
    trending: 'Trending', shorts: 'Shorts', videos: 'Videos',
    search_results: 'Search results: ', related: 'Related Videos',
    views: ' views', likes: 'Like', share: 'Share', dl: 'DL',
    login_title: 'Enter your password', login_btn: 'Login',
    password: 'Password', hide_menu: 'Hide menu', show_menu: 'Show menu',
    channel_name: 'Channel Name', subscribers: 'M subscribers',
    description: 'Video description', see_more: 'See more', see_less: 'See less',
    comment_placeholder: 'Add a comment...', comments: 'Comments',
    lang_setting: 'Language', appearance: 'Appearance', notifications: 'Notifications',
    privacy: 'Privacy', dark_mode: 'Dark Mode', autoplay: 'Autoplay',
  },
  zh: {
    home: '首页', history: '观看历史', trend: '趋势', settings: '设置',
    search_placeholder: '搜索视频...', search_btn: '搜索',
    welcome: '欢迎来到 Nuvis', subtitle: 'YouTube 观看服务',
    trending: '热门', shorts: '短片', videos: '视频',
    search_results: '搜索结果：', related: '相关视频',
    views: ' 次观看', likes: '点赞', share: '分享', dl: '下载',
    login_title: '请输入密码', login_btn: '登录',
    password: '密码', hide_menu: '隐藏菜单', show_menu: '显示菜单',
    channel_name: '频道名称', subscribers: '万订阅',
    description: '视频描述', see_more: '展开', see_less: '收起',
    comment_placeholder: '添加评论...', comments: '评论',
    lang_setting: '语言', appearance: '外观', notifications: '通知',
    privacy: '隐私', dark_mode: '深色模式', autoplay: '自动播放',
  },
  ko: {
    home: '홈', history: '시청 기록', trend: '트렌딩', settings: '설정',
    search_placeholder: '동영상 검색...', search_btn: '검색',
    welcome: 'Nuvis에 오신 것을 환영합니다', subtitle: 'YouTube 시청 서비스',
    trending: '인기 급상승', shorts: 'Shorts', videos: '동영상',
    search_results: '검색 결과：', related: '관련 동영상',
    views: '회 조회', likes: '좋아요', share: '공유', dl: '다운로드',
    login_title: '비밀번호를 입력하세요', login_btn: '로그인',
    password: '비밀번호', hide_menu: '메뉴 숨기기', show_menu: '메뉴 표시',
    channel_name: '채널 이름', subscribers: '만 구독자',
    description: '동영상 설명', see_more: '더 보기', see_less: '접기',
    comment_placeholder: '댓글 추가...', comments: '댓글',
    lang_setting: '언어', appearance: '외관', notifications: '알림',
    privacy: '개인 정보', dark_mode: '다크 모드', autoplay: '자동 재생',
  },
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || 'ja';
}
function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyLang();
}
function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['ja'][key] || key;
}
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

// ─── NAVBAR ───
const NAV_HIDDEN_KEY = 'nuvis_nav_hidden';

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const showBtn = document.getElementById('show-nav-btn');
  const eyeBtn = document.getElementById('nav-eye-btn');
  if (!navbar) return;

  const hidden = localStorage.getItem(NAV_HIDDEN_KEY) === '1';
  if (hidden) {
    navbar.classList.add('hidden');
    if (showBtn) showBtn.classList.add('visible');
  }

  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      navbar.classList.add('hidden');
      localStorage.setItem(NAV_HIDDEN_KEY, '1');
      if (showBtn) showBtn.classList.add('visible');
    });
  }

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      navbar.classList.remove('hidden');
      localStorage.setItem(NAV_HIDDEN_KEY, '0');
      showBtn.classList.remove('visible');
    });
  }
}

// ─── SEARCH ───
function initSearch() {
  const forms = document.querySelectorAll('.search-form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input').value.trim();
      if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
    });
    const btn = form.querySelector('.nav-search-btn, .search-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const q = form.querySelector('input').value.trim();
        if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
      });
    }
  });
}

// ─── VIDEO CLICK ───
function goWatch(id) {
  window.location.href = `/watch?v=${id}`;
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  initNavbar();
  initSearch();
  // sync lang select if exists
  const langSel = document.getElementById('lang-select');
  if (langSel) {
    langSel.value = getLang();
    langSel.addEventListener('change', () => setLang(langSel.value));
  }
});
