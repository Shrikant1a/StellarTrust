import React from 'react';
import { ShieldCheck, Star, Award, TrendingUp } from 'lucide-react';

interface TrustBadgeProps {
  score: number;
  level: 'Novice' | 'Proven' | 'Elite' | 'Legend';
  verified?: boolean;
}

export default function TrustBadge({ score, level, verified = true }: TrustBadgeProps) {
  const getProgressColor = (s: number) => {
    if (s > 90) return '#4ade80'; // Emerald
    if (s > 75) return '#6366f1'; // Indigo
    return '#fbbf24'; // Amber
  };

  return (
    <div style={{
      background: 'rgba(30, 30, 45, 0.4)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <ShieldCheck size={18} color={getProgressColor(score)} />
          <span style={{fontSize: '14px', fontWeight: 600, color: '#ffffff'}}>Trust Score</span>
        </div>
        {verified && (
          <span style={{
            fontSize: '10px', 
            background: 'rgba(74, 222, 128, 0.1)', 
            color: '#4ade80', 
            padding: '2px 8px', 
            borderRadius: '12px',
            border: '1px solid rgba(74, 222, 128, 0.2)'
          }}>VERIFIED</span>
        )}
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <span style={{fontSize: '32px', fontWeight: 800, color: '#ffffff'}}>{score}%</span>
        <div style={{flex: 1}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a0a0b2', marginBottom: '4px'}}>
            <span>Status: {level}</span>
            <span>{score}/100</span>
          </div>
          <div style={{height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px', overflow: 'hidden'}}>
            <div style={{
              width: `${score}%`, 
              height: '100%', 
              backgroundColor: getProgressColor(score),
              boxShadow: `0 0 10px ${getProgressColor(score)}44`
            }}></div>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', gap: '8px'}}>
        <div title="Fast Payer" style={{padding: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)'}}><Zap size={14} color="#facc15" /></div>
        <div title="Repeat Clients" style={{padding: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)'}}><Award size={14} color="#818cf8" /></div>
        <div title="High Success Rate" style={{padding: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)'}}><TrendingUp size={14} color="#4ade80" /></div>
      </div>
    </div>
  );
}

function Zap({ size, color }: { size: number, color: string }) {
  return <Star size={size} color={color} fill={color} />;
}
