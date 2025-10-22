import React from 'react';

// コンテンツ表示用のカードコンポーネント
function SpecialDayCard({ title, cardText, videoSrc }) {
  return (
    <div style={{ width: '500px', margin: '0 auto 30px auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', boxSizing: 'border-box' , backgroundColor: '#ffe8e8' }}>
      <h3>{title}</h3>
      {cardText && (
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
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{cardText}</p>
        </div>
      )}
      {videoSrc && ( 
        <video controls width="100%" src={videoSrc} type="video/mp4">ブラウザが合わないみたい……</video> 
      )}
    </div>
  );
}

export default SpecialDayCard;