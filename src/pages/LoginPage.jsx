// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // 入力された値を保持するためのstate
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');

  // 画面遷移をさせるためのフック
  const navigate = useNavigate();

  // ★ここに正解の名前と年月日を設定
  const CORRECT_NAME = '鈴木萌々華';
  const CORRECT_YEAR = '2002';
  const CORRECT_MONTH = '10';
  const CORRECT_DAY = '7';

  // 決定ボタンが押されたときの処理
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    // 入力値が正解と一致するかチェック
    if (
      name === CORRECT_NAME &&
      year === CORRECT_YEAR &&
      month === CORRECT_MONTH &&
      day === CORRECT_DAY
    ) {
      // 一致したら、コンテンツページへ遷移
      navigate(`/contents/${year}/${month}/${day}`);
    } else {
      // 一致しなかったらエラーメッセージを表示
      setError('名前か生年月日が違うよ！もう一度確認してね。1桁の月日には0をつけてないでね');
    }
  };

  return (
    <div>
      <h2>秘密のページ</h2>
      <p>名前（漢字フルネーム）と生年月日を入力してね</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>生年月日: </label>
          <input type="text" placeholder="年" value={year} onChange={(e) => setYear(e.target.value)} required />
          <input type="text" placeholder="月" value={month} onChange={(e) => setMonth(e.target.value)} required />
          <input type="text" placeholder="日" value={day} onChange={(e) => setDay(e.target.value)} required />
        </div>
        <button type="submit">決定</button>
      </form>
      {/* エラーがある場合にメッセージを表示 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;