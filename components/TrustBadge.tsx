import React from 'react';
import { ShieldCheck, Star, Award, TrendingUp, Zap } from 'lucide-react';

interface TrustBadgeProps {
  score: number;
  level: string;
  verified?: boolean;
}

export default function TrustBadge({ score, level, verified = true }: TrustBadgeProps) {
  const getProgressColor = (s: number) => {
    if (s > 90) return 'var(--accent-success)';
    if (s > 75) return 'var(--primary)';
    return 'var(--accent-warning)';
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--surface) 0%, rgba(99, 102, 241, 0.05) 100%)',
      border: '1px solid var(--surface-border)',
      borderRadius: '24px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px', 
            backgroundColor: `${getProgressColor(score)}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ShieldCheck size={18} color={getProgressColor(score)} />
          </div>
          <span style={{fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)'}}>Trust Protocol</span>
        </div>
        {verified && (
          <div style={{
            fontSize: '9px', 
            fontWeight: 800,
            background: 'var(--accent-success)', 
            color: '#fff', 
            padding: '2px 8px', 
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>Stellar Verified</div>
        )}
      </div>

      <div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px'}}>
          <span style={{fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-2px'}}>{score}</span>
          <span style={{fontSize: '18px', fontWeight: 600, color: 'var(--text-muted)'}}>/ 100</span>
        </div>
        
        <div style={{flex: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px'}}>
            <span style={{ fontWeight: 600 }}>{level}</span>
            <span style={{ opacity: 0.8 }}>Top 2%</span>
          </div>
          <div style={{height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', overflow: 'hidden'}}>
            <div style={{
              width: `${score}%`, 
              height: '100%', 
              backgroundColor: getProgressColor(score),
              borderRadius: '10px',
              boxShadow: `0 0 15px ${getProgressColor(score)}66`,
              transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}></div>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', gap: '10px'}}>
        {[
          { icon: Zap, color: '#facc15', label: 'Payment Speed', title: 'Average time to release funds: Top 1% (Express)' },
          { icon: Award, color: '#818cf8', label: 'Work Quality', title: 'Quality rating based on client verification: 4.9/5' },
          { icon: TrendingUp, color: '#4ade80', label: 'Platform Growth', title: 'Monthly transaction volume growth: +22%' }
        ].map((item, i) => (
          <div key={i} title={item.title} style={{
            padding: '8px', 
            borderRadius: '12px', 
            background: 'var(--surface-hover)',
            border: '1px solid var(--surface-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'help'
          }}>
            <item.icon size={16} color={item.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
