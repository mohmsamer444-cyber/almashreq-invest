export function renderErrorPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>خطأ</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: linear-gradient(135deg, #2a2520 0%, #1a1815 100%);
            color: #f5f0eb;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "IBM Plex Sans Arabic", sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          
          .container {
            max-width: 500px;
            text-align: center;
          }
          
          h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #c9a961 0%, #d4b57d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          p {
            font-size: 1rem;
            color: #a8a39a;
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          
          a {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(135deg, #c9a961 0%, #d4b57d 100%);
            color: #2a2520;
            text-decoration: none;
            border-radius: 999px;
            font-weight: 500;
            transition: opacity 0.3s;
          }
          
          a:hover {
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>خطأ</h1>
          <p>حدث خطأ غير متوقع في تحميل الصفحة.</p>
          <p>يرجى تحديث الصفحة أو العودة للرئيسية.</p>
          <a href="/">العودة للرئيسية</a>
        </div>
      </body>
    </html>
  `;
}
