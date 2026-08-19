"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="rf-landing">
      <div className="rf-glow rf-glow-left" />
      <div className="rf-glow rf-glow-right" />

      <div className="rf-shell">
        <header className="rf-header">
          <Link href="/" className="rf-brand">
            <span className="rf-brand-icon">🧭</span>
            <span>
              <strong>ReuniteFind</strong>
              <small>Find · Report · Reunite</small>
            </span>
          </Link>

          <Link href="/login" className="rf-signin">
            Sign in
          </Link>
        </header>

        <section className="rf-card">
          {/* Detective sits BEHIND the card */}
          <div className="rf-detective" aria-hidden="true">
            <div className="rf-body" />
            <div className="rf-head">
              <span className="rf-eye rf-eye-left">
                <i />
              </span>
              <span className="rf-eye rf-eye-right">
                <i />
              </span>
            </div>

            <div className="rf-hat">
              <span className="rf-hat-crown" />
              <span className="rf-hat-band" />
              <span className="rf-hat-brim" />
            </div>

            <div className="rf-magnifier">
              <span className="rf-glass" />
              <span className="rf-handle" />
            </div>
          </div>

          <div className="rf-content">
            <div className="rf-left">
              <span className="rf-kicker">EVERY CLUE MATTERS</span>

              <h1>
                Find the missing piece.
                <span>Bring someone home.</span>
              </h1>

              <p className="rf-description">
                ReuniteFind keeps missing-person reports organized, searchable,
                and easy to follow — from the first report to the moment a case
                is resolved.
              </p>

              <div className="rf-info-grid">
                <InfoCard
                  title="Report"
                  text="Photos, identity and last-seen details."
                />
                <InfoCard
                  title="Search"
                  text="Browse existing cases and clues."
                />
                <InfoCard
                  title="Follow"
                  text="Keep every case organized."
                />
              </div>
            </div>

            <div className="rf-actions">
              <span className="rf-action-label">START HERE</span>

              <h2>What are you looking for?</h2>

              <p>Choose the path that matches what you need today.</p>

              <div className="rf-buttons">
                <Link
                  href="/login?intent=reporter"
                  className="rf-button rf-report"
                >
                  <div>
                    <strong>Report someone</strong>
                    <small>Create a missing-person report.</small>
                  </div>
                  <span>→</span>
                </Link>

                <Link
                  href="/browse"
                  className="rf-button rf-find"
                >
                  <div>
                    <strong>Looking for someone</strong>
                    <small>Browse listed missing-person cases.</small>
                  </div>
                  <span>→</span>
                </Link>
              </div>

              <div className="rf-security">
                <span>✦</span>
                <p>
                  Public case viewing is read-only. Your own submitted reports
                  are managed separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          Built for families searching for hope ·
          <span> ReuniteFind</span>
        </footer>
      </div>

      <style jsx global>{`
        .rf-landing {
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background:
            radial-gradient(circle at 8% 10%, rgba(79,70,229,.30), transparent 30%),
            radial-gradient(circle at 92% 10%, rgba(168,85,247,.25), transparent 30%),
            radial-gradient(circle at 80% 90%, rgba(236,72,153,.16), transparent 28%),
            linear-gradient(135deg, #030305 0%, #0a0c1e 34%, #211039 68%, #060509 100%);
          color: white;
        }

        .rf-shell {
          width: min(1180px, calc(100% - 40px));
          min-height: 100vh;
          margin: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 35px 0;
        }

        .rf-header {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .rf-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
        }

        .rf-brand-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed, #c084fc);
          box-shadow: 0 10px 30px rgba(124,58,237,.35);
        }

        .rf-brand strong {
          display: block;
          font-size: 18px;
        }

        .rf-brand small {
          display: block;
          margin-top: 2px;
          color: #aaa8c7;
          font-size: 12px;
        }

        .rf-signin {
          padding: 9px 17px;
          border: 1px solid rgba(196,181,253,.2);
          border-radius: 999px;
          background: rgba(255,255,255,.04);
          color: #ddd6fe;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: .2s ease;
        }

        .rf-signin:hover {
          background: rgba(139,92,246,.18);
          border-color: rgba(196,181,253,.45);
          color: white;
        }

        .rf-card {
          position: relative;
          overflow: hidden;
          padding: 48px;
          border: 1px solid rgba(167,139,250,.22);
          border-radius: 32px;
          background:
            linear-gradient(145deg, rgba(20,20,38,.88), rgba(7,7,14,.94));
          box-shadow:
            0 35px 90px rgba(0,0,0,.55),
            inset 0 1px 0 rgba(255,255,255,.06);
          backdrop-filter: blur(18px);
        }

        .rf-content {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 55px;
          align-items: center;
        }

        .rf-left {
          padding-top: 28px;
        }

        .rf-kicker {
          display: inline-flex;
          padding: 6px 11px;
          border: 1px solid rgba(232,121,249,.2);
          border-radius: 999px;
          background: rgba(232,121,249,.08);
          color: #f0abfc;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .18em;
        }

        .rf-left h1 {
          margin: 18px 0 0;
          font-size: clamp(42px, 5vw, 68px);
          line-height: .96;
          letter-spacing: -.055em;
          color: white;
        }

        .rf-left h1 span {
          display: block;
          background: linear-gradient(90deg, #a5b4fc, #c4b5fd, #f0abfc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .rf-description {
          max-width: 590px;
          margin-top: 22px;
          color: #aeb1c6;
          font-size: 15px;
          line-height: 1.8;
        }

        .rf-info-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 10px;
          margin-top: 28px;
        }

        .rf-info {
          padding: 15px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          background: rgba(255,255,255,.035);
        }

        .rf-info strong {
          display: block;
          color: #ddd6fe;
          font-size: 12px;
        }

        .rf-info p {
          margin: 5px 0 0;
          color: #81859e;
          font-size: 11px;
          line-height: 1.5;
        }

        .rf-actions {
          padding: 25px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 25px;
          background: linear-gradient(145deg, rgba(255,255,255,.055), rgba(255,255,255,.02));
          box-shadow: 0 20px 50px rgba(0,0,0,.3);
        }

        .rf-action-label {
          color: #a78bfa;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .2em;
        }

        .rf-actions h2 {
          margin: 8px 0 0;
          color: white;
          font-size: 25px;
          font-weight: 850;
        }

        .rf-actions > p {
          margin-top: 7px;
          color: #8589a1;
          font-size: 13px;
          line-height: 1.6;
        }

        .rf-buttons {
          display: flex;
          flex-direction: column;
          gap: 11px;
          margin-top: 24px;
        }

        .rf-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 17px;
          border-radius: 17px;
          color: white;
          text-decoration: none;
          transition: transform .2s ease, border-color .2s ease;
        }

        .rf-button:hover {
          transform: translateY(-2px);
        }

        .rf-button strong {
          display: block;
          font-size: 14px;
        }

        .rf-button small {
          display: block;
          margin-top: 4px;
          font-size: 11px;
        }

        .rf-button > span {
          font-size: 22px;
        }

        .rf-report {
          border: 1px solid rgba(196,181,253,.3);
          background: linear-gradient(110deg, rgba(79,70,229,.9), rgba(124,58,237,.9), rgba(168,85,247,.85));
          box-shadow: 0 12px 30px rgba(79,70,229,.22);
        }

        .rf-report small {
          color: #ddd6fe;
        }

        .rf-find {
          border: 1px solid rgba(232,121,249,.2);
          background: linear-gradient(110deg, rgba(8,8,18,.95), rgba(55,20,70,.72));
        }

        .rf-find small {
          color: #aaa6bb;
        }

        .rf-security {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          padding: 12px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 15px;
          background: rgba(0,0,0,.18);
        }

        .rf-security span {
          color: #a78bfa;
        }

        .rf-security p {
          margin: 0;
          color: #74788f;
          font-size: 10px;
          line-height: 1.6;
        }

        /* ================= DETECTIVE =================
           It lives inside the card but is visually behind
           the card content. The clipping is intentional.
        */

        .rf-detective {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: -2px;
          width: 310px;
          height: 185px;
          transform: translate(-50%, -78%);
          transform-origin: 50% 100%;
          animation: rf-peek 14s cubic-bezier(.65,.05,.35,1) infinite;
          pointer-events: none;
        }

        .rf-content {
          position: relative;
          z-index: 5;
        }

        .rf-body {
          position: absolute;
          left: 50%;
          bottom: -2px;
          width: 130px;
          height: 96px;
          transform: translateX(-50%);
          border-radius: 58px 58px 12px 12px;
          background: linear-gradient(180deg, #171722, #030305);
        }

        .rf-head {
          position: absolute;
          left: 50%;
          top: 52px;
          width: 92px;
          height: 72px;
          transform: translateX(-50%);
          border-radius: 48%;
          background: #06060a;
          border: 1px solid rgba(255,255,255,.05);
          box-shadow: 0 12px 28px rgba(0,0,0,.5);
        }

        .rf-eye {
          position: absolute;
          top: 29px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #ff1636;
          box-shadow: 0 0 10px #ff1636, 0 0 22px rgba(255,22,54,.45);
        }

        .rf-eye-left { left: 22px; }
        .rf-eye-right { right: 22px; }

        .rf-eye i {
          position: absolute;
          top: 2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #3b0208;
        }

        /* BOTH pupils always move together */
        .rf-eye i {
          animation: rf-eyes-together 2.6s ease-in-out infinite;
        }

        .rf-eye-right i {
          animation-delay: 0s;
        }

        @keyframes rf-eyes-together {
          0%, 100% { left: 2px; }
          22% { left: 2px; }
          38% { left: 5px; }
          52% { left: 5px; }
          68% { left: 2px; }
          82% { left: 2px; }
        }

        .rf-hat {
          position: absolute;
          left: 50%;
          top: 1px;
          width: 170px;
          height: 65px;
          transform: translateX(-50%) rotate(-3deg);
        }

        .rf-hat-crown {
          position: absolute;
          left: 50%;
          bottom: 20px;
          width: 76px;
          height: 44px;
          transform: translateX(-50%);
          border-radius: 24px 24px 8px 8px;
          background: linear-gradient(180deg,#1c1c29,#040407);
        }

        .rf-hat-band {
          position: absolute;
          left: 50%;
          bottom: 27px;
          width: 74px;
          height: 6px;
          transform: translateX(-50%);
          background: linear-gradient(90deg,#312e81,#a855f7,#312e81);
        }

        .rf-hat-brim {
          position: absolute;
          left: 50%;
          bottom: 10px;
          width: 165px;
          height: 18px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: linear-gradient(180deg,#171722,#040407);
        }

        .rf-magnifier {
          position: absolute;
          right: 6px;
          top: 86px;
          width: 70px;
          height: 70px;
          transform: rotate(-22deg);
        }

        .rf-glass {
          position: absolute;
          width: 50px;
          height: 50px;
          border: 6px solid #c4b5fd;
          border-radius: 50%;
          background: rgba(129,140,248,.08);
          box-shadow: 0 0 22px rgba(129,140,248,.25);
        }

        .rf-handle {
          position: absolute;
          left: 45px;
          top: 43px;
          width: 8px;
          height: 34px;
          border-radius: 999px;
          background: linear-gradient(180deg,#c4b5fd,#7c3aed);
        }

        @keyframes rf-peek {
          0%, 7%, 15%, 100% {
            transform: translate(-50%, -78%) rotate(0deg);
          }

          10%, 13% {
            transform: translate(-50%, -28%) rotate(0deg);
          }

          28%, 36% {
            transform: translate(-84%, -28%) rotate(-7deg);
          }

          39%, 47% {
            transform: translate(-84%, -78%) rotate(-7deg);
          }

          59%, 67% {
            transform: translate(-14%, -30%) rotate(7deg);
          }

          70%, 78% {
            transform: translate(-14%, -78%) rotate(7deg);
          }

          88%, 94% {
            transform: translate(-50%, -28%) rotate(0deg);
          }
        }

        .rf-glow {
          position: absolute;
          z-index: -1;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .rf-glow-left {
          left: -150px;
          top: 20%;
          background: rgba(79,70,229,.2);
        }

        .rf-glow-right {
          right: -160px;
          bottom: 5%;
          background: rgba(192,132,252,.16);
        }

        footer {
          margin-top: 18px;
          text-align: center;
          color: #5e6278;
          font-size: 11px;
        }

        footer span {
          color: #8b5cf6;
        }

        @media (max-width: 900px) {
          .rf-card { padding: 28px; }
          .rf-content {
            grid-template-columns: 1fr;
            gap: 35px;
          }
          .rf-left { padding-top: 35px; }
        }

        @media (max-width: 600px) {
          .rf-shell { width: min(100% - 24px, 1180px); }
          .rf-card {
            padding: 20px;
            border-radius: 24px;
          }
          .rf-left h1 { font-size: 42px; }
          .rf-info-grid { grid-template-columns: 1fr; }
          .rf-detective {
            transform: translate(-50%, -76%) scale(.78);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rf-detective,
          .rf-eye i {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rf-info">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}