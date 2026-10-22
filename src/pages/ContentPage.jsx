// src/pages/ContentPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const specialDays = {
  '2025-10-07': {
    title: '🎉 誕生日おめでとう！ 🎉',
    cardText: 'ももかへ\n誕生日おめでとう！\nサプライズとしてこんなものを作ってみました．\nこのウェブに，2人の思い出をたくさん記録できたら\n嬉しいな．\n生まれてきてくれてありがとう！大好き！\nしゅんより',
    videoSrc: '/videos/birthday.mp4', // パスは / から始まる前提
  },
  '2025-10-23': {
    title: '3周年おめでとう！ ',
    cardText: 'まだまだたくさん迷惑かけると思うけど，\nこれからもよろしく！だいすき！',
  },
  '2025-12-24': {
    title: ' メリークリスマス！イブ！ ',
    cardText: '今年も一緒に居れて嬉しい！',
  },
  '2025-12-26': {
    title: 'やっほー！見てる？ ',
    cardText: 'おはよ！愛してるぜっ！',
  },
  '2026-10-22': {
    title: '4周年！ ',
    cardText: 'ずっと一緒だよ♡\n これからもよろしくね！\n\nももかもコメントや写真を入れられるように\nしていきます！しばしお待ちを！',
  },
};

// publicフォルダ内のアセットパスを正しく処理する関数
// BASE_URLが '/' (ローカル) の場合 -> /videos/birthday.mp4
// BASE_URLが '/forReact-vite/' (GitHub Pages) の場合 -> /forReact-vite/videos/birthday.mp4
const getPublicAssetPath = (path) => {
  if (!path) return null;
  // import.meta.env.BASE_URL は末尾に / が含まれる (例: /forReact-vite/)
  // path は先頭に / が含まれる (例: /videos/birthday.mp4)
  // pathから先頭の / を削除して結合する
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};


function ContentPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayKey = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;
  const todaySpecialContent = specialDays[todayKey];

  // ★ 修正点 1: 今日の動画パスを処理
  const todayVideoPath = getPublicAssetPath(todaySpecialContent?.videoSrc);

  const [inputYear, setInputYear] = useState('2025');
  const [inputMonth, setInputMonth] = useState('10');
  const [inputDay, setInputDay] = useState('05');
  const [foundContent, setFoundContent] = useState(null);
  
  const memoriesSectionStartDate = new Date('2025-10-08');
  memoriesSectionStartDate.setHours(0, 0, 0, 0);

  const handleDateLookup = (e) => {
    e.preventDefault();
    const lookupKey = `${inputYear}-${String(inputMonth).padStart(2, '0')}-${String(inputDay).padStart(2, '0')}`;
    const lookupDate = new Date(lookupKey);
    lookupDate.setHours(0, 0, 0, 0);

    if (lookupDate > today) {
      setFoundContent({ isFuture: true, date: lookupKey });
      return;
    }

    const content = specialDays[lookupKey];
    if (content) {
      setFoundContent(content);
    } else {
      setFoundContent({ notFound: true, date: lookupKey });
    }
  };
  
  // ★ 修正点 2: 検索結果の動画パスを処理
  const foundVideoPath = getPublicAssetPath(foundContent?.videoSrc);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(37, 13, 13, 0.1)',
    }}>
      <h1>{`${todayYear}/${todayMonth}/${todayDay}`}</h1>
      <hr />
      {todaySpecialContent ? (
        <div style={{ width: '500px', margin: '0 auto 30px auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxSizing: 'border-box' , backgroundColor: '#ffe8e8' }}>
          <h3>{todaySpecialContent.title}</h3>
          {todaySpecialContent.cardText && (
            <div style={{ 
              backgroundColor: '#fff8e1', 
              border: '1px solid #f0ad4e', 
              borderRadius: '8px', 
              padding: '20px', 
              fontFamily: "'MS Mincho', serif", 
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)', 
              width: '100%', 
              boxSizing: 'border-box',
              marginBottom: '15px',
            }}>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{todaySpecialContent.cardText}</p>
            </div>
          )}
          {/* ★ 修正点 3: 処理したパスを使用 */}
          {todayVideoPath && ( 
            <video controls width="100%" src={todayVideoPath} type="video/mp4">ブラウザが合わないみたい……</video> 
          )}
        </div>
      ) : ( 
        <div>
          <h2>なんでもない日万歳！</h2>
          <p>毎日が記念日だね</p>
        </div> 
      )}
      
      {today >= memoriesSectionStartDate && (
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '100px', 
        }}>
          <h2>思い出</h2>
          <p>見たい記念日の日付を入力してね。</p>
          <form onSubmit={handleDateLookup}>
            <input type="text" value={inputYear} onChange={(e) => setInputYear(e.target.value)} placeholder="年" style={{width: '60px'}}/>-
            <input type="text" value={inputMonth} onChange={(e) => setInputMonth(e.target.value)} placeholder="月" style={{width: '40px'}}/>-
            <input type="text" value={inputDay} onChange={(e) => setInputDay(e.target.value)} placeholder="日" style={{width: '40px'}}/>
            <button type="submit" style={{marginLeft: '10px'}}>表示する</button>
          </form>
          {foundContent && (
            <div style={{ marginTop: '20px' }}>
              {foundContent.isFuture ? (
                <p>これからのお楽しみ♡</p>
              ) : foundContent.notFound ? (
                <p>この日の思い出はももとしゅんの心の中にあります</p>
              ) : (
                <div style={{ width: '500px', margin: '0 auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#ffe8e8' }}>
                  <h3>{foundContent.title}</h3>
                  {foundContent.cardText && (
                    <div style={{ 
                      backgroundColor: '#fff8e1', 
                      border: '1px solid #f0ad4e', 
                      borderRadius: '8px', 
                      padding: '20px', 
                      fontFamily: "'MS Mincho', serif", 
                      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)', 
                      width: '100%', 
                      boxSizing: 'border-box',
                      marginBottom: '15px',
                    }}>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{foundContent.cardText}</p>
                    </div>
                  )}
                  {/* ★ 修正点 4: 処理したパスを使用 */}
                  {foundVideoPath && (
                    <video controls width="100%" src={foundVideoPath} type="video/mp4">
                      ブラウザが合わないみたい……
                    </video>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <Link to="/" style={{ display: 'inline-block', marginTop: '20px' }}>
        ログインページに戻る
      </Link>
    </div>
  );
}

export default ContentPage;