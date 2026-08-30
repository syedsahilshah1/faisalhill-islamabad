<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }
    .container {
      max-width: 580px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: linear-gradient(135deg, #7b002c 0%, #4a001a 100%);
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #fed7e2;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 32px 28px;
    }
    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .text {
      font-size: 14px;
      color: #475569;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .btn-container {
      text-align: center;
      margin: 32px 0;
    }
    .btn {
      display: inline-block;
      background-color: #7b002c;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(123, 0, 44, 0.25);
    }
    .notice {
      background-color: #f1f5f9;
      border-left: 4px solid #7b002c;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 24px;
    }
    .link-fallback {
      font-size: 11px;
      color: #94a3b8;
      word-break: break-all;
      margin-top: 20px;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 28px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>FAISAL HILLS ISLAMABAD</h1>
      <p>Official Executive Administrative Portal</p>
    </div>
    <div class="content">
      <div class="greeting">Hello, {{ $userName }}</div>
      <div class="text">
        You are receiving this email because a password reset request was initiated for your administrator account on the Faisal Hills Management System.
      </div>
      <div class="btn-container">
        <a href="{{ $resetUrl }}" class="btn" target="_blank">Reset Password</a>
      </div>
      <div class="notice">
        <strong>Security Notice:</strong> This password reset link is valid for <strong>60 minutes</strong> and can only be used once. If you did not request a password reset, no further action is required and your account remains secure.
      </div>
      <div class="link-fallback">
        If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:<br>
        <a href="{{ $resetUrl }}" style="color: #7b002c;">{{ $resetUrl }}</a>
      </div>
    </div>
    <div class="footer">
      &copy; {{ date('Y') }} Faisal Hills Islamabad & Zedem International. All rights reserved.<br>
      This is an automated system notification. Please do not reply to this email.
    </div>
  </div>
</body>
</html>
