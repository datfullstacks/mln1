'use client';

import { AIUsage } from '../components/AIUsage';
import { NavBar } from '../components/NavBar';

export default function AIUsagePage() {
  return (
    <>
      <NavBar current="ai-usage" onNavigate={() => {}} />
      <main className="ai-usage-shell">
        <AIUsage />
      </main>
    </>
  );
}
