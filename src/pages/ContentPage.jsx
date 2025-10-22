// src/pages/ContentPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const specialDays = {
  '2025-10-07': {
    title: '🎉 誕生日おめでとう！ 🎉',
    cardText: 'ももかへ\n誕生日おめでとう！\nサプライズとしてこんなものを作ってみました．\nこのウェブに，2人の思い出をたくさん記録できたら\n嬉しいな．\n生まれてきてくれてありがとう！大好き！\nしゅんより',
    videoSrc: '/videos/birthday.mp4',
  },
  '2025-10-23': {
    title: '3周年おめでとう！ ',
    cardText: 'これからもよろしく！だいすき！',
  },
  '2026-01-01': {
    title: '🌅 あけましておめでとう！ 🌅',
    cardText: '2026年も素晴らしい年になりますように。今年もよろしく！',
    videoSrc: '/videos/newyear.mp4',
  },
};

function ContentPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayKey = `${todayYear}-${String(todayMonth).padStart(2, '0')}-${String(todayDay).padStart(2, '0')}`;
  const todaySpecialContent = specialDays[todayKey];

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
      {/* ★ 修正点: 記念日当日の表示を、検索結果と同様の単一コンテナにまとめました */}
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
          {todaySpecialContent.videoSrc && ( 
            <video controls width="100%" src={todaySpecialContent.videoSrc} type="video/mp4">ブラウザが合わないみたい……</video> 
          )}
        </div>
      ) : ( 
        <div>
          <h2>なんでもない日万歳！</h2>
          <p>毎日が記念日だね</p>
        </div> 
      )}
      
      {today >= memoriesSectionStartDate && (
        // ★ 修正点: 上の余白(margin)を追加し、背景色を半透明の白に変更
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // 半透明の白
          padding: '20px', 
          borderRadius: '8px',
          marginTop: '100px', // 上の余白を追加
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
                  {foundContent.videoSrc && (
                    <video controls width="100%" src={foundContent.videoSrc} type="video/mp4">
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