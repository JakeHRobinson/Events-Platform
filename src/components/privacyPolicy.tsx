// src/components/PrivacyPolicy.tsx

import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Privacy Policy</h1>
      <p>Last Updated: July 29, 2024</p>

      <h2>Welcome to Business Events Platform</h2>
      <p>We are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, and share information when you use our app.</p>

      <h3>What Personal Information Do We Collect?</h3>
      <p>When you use our app, we may collect certain information by which you can be identified, such as:</p>
      <ul>
        <li><strong>Email Address</strong>: We collect your email address when you authenticate with Google OAuth. This information is used to identify your account and facilitate communication with us.</li>
        <li><strong>Profile Information</strong>: Basic profile information provided by Google OAuth, such as name and profile picture, may be collected to personalize your experience.</li>
      </ul>

      <h3>How Do We Use Your Information?</h3>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Authenticate your account and enable you to use our app.</li>
        <li>Communicate with you about your account and respond to inquiries.</li>
        <li>Improve our app and develop new features.</li>
      </ul>
      <p>Please note that we do not store any sensitive information related to calendar events. All interactions with your Google Calendar are performed in real-time and are not saved by our app.</p>

      <h3>Sharing Your Information</h3>
      <p>We do not sell or rent your personal information to third parties for marketing purposes. We may share your information with third-party service providers who perform services on our behalf, but they are prohibited from using or sharing your information except to provide these services.</p>

      <h3>Security</h3>
      <p>We take reasonable measures to protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>

      <h3>Changes to This Privacy Policy</h3>
      <p>We reserve the right to amend this Privacy Policy at any time. If we make material changes to this Privacy Policy, we will notify you by posting the updated Privacy Policy on this page.</p>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at jakehuntlyrobinson@gmail.com.</p>
    </div>
  );
};

export default PrivacyPolicy;
