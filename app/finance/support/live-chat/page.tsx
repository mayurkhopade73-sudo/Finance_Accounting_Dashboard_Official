'use client';
import React from 'react';
import { useState } from 'react';
import { Send } from 'lucide-react';

type Message = {
  from: 'user' | 'them';
  text: string;
  time: string;
};

type Thread = {
  id: number;
  name: string;
  last: string;
  time: string;
  unread: number;
  avatar: string;
};

const chatThreads: Thread[] = [
  { id: 1, name: 'Acme Corp Support', last: 'Invoice question...', time: '2m', unread: 2, avatar: 'AC' },
  { id: 2, name: 'TechVentures Ltd', last: 'Payment failed...', time: '15m', unread: 0, avatar: 'TV' },
  { id: 3, name: 'BlueSky Analytics', last: 'Thanks!', time: '1h', unread: 0, avatar: 'BA' },
];

const initMessages: Record<number, Message[]> = {
  1: [
    { from: 'them', text: 'Hi, I have a question about Invoice INV-2046.', time: '10:12' },
    { from: 'user', text: "Sure, happy to help! What's the issue?", time: '10:13' },
    { from: 'them', text: 'The amount seems incorrect. It shows $12,400 but we expected $11,800.', time: '10:14' },
  ],
  2: [
    { from: 'them', text: 'Our payment of $8,200 failed. Can you check?', time: '09:48' },
    { from: 'user', text: 'Looking into it now. Can you share the transaction reference?', time: '09:50' },
  ],
  3: [
    { from: 'user', text: 'Your invoice has been updated. Please check.', time: '08:30' },
    { from: 'them', text: 'Thanks!', time: '08:32' },
  ],
};

export default function LiveChatPage() {
  const [active, setActive] = useState<number>(1);
  const [messages, setMessages] = useState<Record<number, Message[]>>(initMessages);
  const [input, setInput] = useState<string>('');
  const [threads, setThreads] = useState<Thread[]>(chatThreads);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const messageText = input.trim();
    const activeThread = active;

    setMessages((prev) => ({
      ...prev,
      [activeThread]: [...(prev[activeThread] || []), { from: 'user', text: messageText, time }],
    }));

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread ? { ...t, last: messageText, time: 'now', unread: 0 } : t
      )
    );

    setInput('');

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeThread]: [
          ...(prev[activeThread] || []),
          {
            from: 'them',
            text: "Thank you, I'll check and get back to you shortly.",
            time,
          },
        ],
      }));
    }, 1500);
  };

  const currentThread = threads.find((t) => t.id === active);

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white-800">Live Chat</h1>
        <p className="text-gray-500 text-sm mt-1">
          Real-time customer support conversations
        </p>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">

        {/* Thread list */}

        <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-700 text-sm">
            Conversations
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setActive(t.id);
                  setThreads((p) =>
                    p.map((x) => (x.id === t.id ? { ...x, unread: 0 } : x))
                  );
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  active === t.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{t.avatar}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800 text-sm font-medium truncate">
                      {t.name}
                    </span>
                    <span className="text-gray-400 text-xs ml-1">{t.time}</span>
                  </div>
                  <span className="text-gray-400 text-xs truncate block">
                    {t.last}
                  </span>
                </div>

                {t.unread > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">
                    {t.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}

        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col min-w-0">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {currentThread?.avatar}
              </span>
            </div>

            <div>
              <div className="text-gray-800 font-semibold text-sm">
                {currentThread?.name}
              </div>
              <div className="text-emerald-500 text-xs">● Online</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {(messages[active] || []).map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                    m.from === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      m.from === 'user' ? 'text-blue-200' : 'text-gray-400'
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />

            <button
              onClick={sendMessage}
              className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}