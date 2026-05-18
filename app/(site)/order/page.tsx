'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './[number]/order.css';

export default function OrderLookupPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = orderNumber.trim().toUpperCase();
    const ph = phone.replace(/\D/g, '').slice(-4);
    router.push(`/order/${encodeURIComponent(num)}?phone=${encodeURIComponent(ph)}`);
  }

  return (
    <div className="order-page-empty">
      <h1>Track your order</h1>
      <p className="order-lede">
        Enter your order number (looks like <code>CLM-2026-XXXX</code>) and the last 4
        digits of the phone you used at checkout.
      </p>
      <form className="order-lookup-form" onSubmit={onSubmit}>
        <label>
          Order number
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="CLM-2026-XXXX"
            required
            autoFocus
            style={{ textAlign: 'left', letterSpacing: 'normal' }}
          />
        </label>
        <label>
          Last 4 digits of your phone
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            pattern="[0-9]{4}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="XXXX"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Look up →
        </button>
      </form>
      <p className="order-foot">
        Can't find your order number? Check the email or SMS we sent after checkout, or{' '}
        <a href="https://wa.me/923249986822">WhatsApp our team</a>.
      </p>
    </div>
  );
}
