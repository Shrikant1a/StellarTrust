'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../Dashboard.module.css';

export default function ProjectsPage() {
  const defaultProjects = [
    { id: 'default-1', name: 'Website Redesign', client: 'Alice', freelancer: 'James Carter', status: 'Active', statusClass: 'badgeActive', linkId: '1' },
    { id: 'default-2', name: 'Mobile App Development', client: 'David', freelancer: 'Sarah Lee', status: 'In Progress', statusClass: 'badgeInProgress', linkId: '2' },
    { id: 'default-3', name: 'Blockchain Integration', client: 'Michael', freelancer: 'Alex Smith', status: 'Active', statusClass: 'badgeActive', linkId: '3' },
    { id: 'default-4', name: 'SEO Optimization', client: 'Emma', freelancer: 'John Doe', status: 'Dispute', statusClass: 'badgeDispute', linkId: '4' },
  ];

  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const saved = localStorage.getItem('trustlance_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setProjects([...parsed, ...defaultProjects]);
        }
      } catch (e) {
        // ignore JSON parse errors
      }
    }
  }, []);
  return (
    <>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.sectionTitle}>Projects</h1>
          <p className={styles.pageSubtitle}>Home / Projects</p>
        </div>
        <Link href="/projects/create">
          <button className={styles.primaryButton}>
            + Create New Project
          </button>
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div>Project Name</div>
          <div>Client → Freelancer</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {projects.map((proj) => (
          <div key={proj.id} className={styles.tableRow}>
            <div className={styles.cellText}>{proj.name}</div>
            <div className={styles.cellSubtext}>{proj.client} <span className={styles.arrow}>→</span> {proj.freelancer}</div>
            <div><span className={`${styles.badge} ${styles[proj.statusClass]}`}>{proj.status}</span></div>
            <div>
              <Link href={`/projects/${proj.linkId}`} className={styles.detailsButton} style={{textDecoration: 'none'}}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
