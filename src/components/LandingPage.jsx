"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="rf-landing">
      <div className="rf-glow rf-glow-left" />
      <div className="rf-glow rf-glow-right" />

      <div className="rf-shell">

        {/* HEADER */}
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

        {/* MAIN CARD */}
        <section className="rf-card">

          {/* ================= DETECTIVE ================= */}
          <div className="rf-detective">

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

          {/* ================= CONTENT ================= */}
          <div className="rf-content">

            <div className="rf-left">

              <span className="rf-kicker">
                EVERY CLUE MATTERS
              </span>

              <h1>
                Find the missing piece.
                <span>
                  Bring someone home.
                </span>
              </h1>

              <p className="rf-description">
                ReuniteFind gives families one organized place to report
                missing loved ones, search existing cases, and keep important
                information together.
              </p>

              <div className="rf-info-grid">

                <InfoCard
                  title="Report"
                  text="Photos, identity and last-seen details."
                />

                <InfoCard
                  title="Search"
                  text="Browse cases and look for familiar clues."
                />

                <InfoCard
                  title="Follow"
                  text="Keep every case organized from start to finish."
                />

              </div>

            </div>

            {/* ================= ACTION CARD ================= */}
            <div className="rf-actions">

              <span className="rf-action-label">
                START HERE
              </span>

              <h2>
                What are you looking for?
              </h2>

              <p>
                Choose the path that matches what you need today.
              </p>

              <div className="rf-buttons">

                <Link
                  href="/login?intent=reporter"
                  className="rf-button rf-report"
                >
                  <div>
                    <strong>Report someone</strong>
                    <small>
                      Create a missing-person report.
                    </small>
                  </div>

                  <span>→</span>
                </Link>

                <Link
                  href="/login?intent=finder"
                  className="rf-button rf-find"
                >
                  <div>
                    <strong>Looking for someone</strong>
                    <small>
                      Search listed missing-person cases.
                    </small>
                  </div>

                  <span>→</span>
                </Link>

              </div>

              <div className="rf-security">
                <span>✦</span>

                <p>
                  Your account permissions determine what you can manage.
                  Viewing a case does not automatically grant edit access.
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

        /* =====================================================
           REUNITEFIND LANDING PAGE
           ===================================================== */

        .rf-landing {
          min-height: 100vh;
          position: relative;
          isolation: isolate;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 8% 10%,
              rgba(79,70,229,.30),
              transparent 30%
            ),
            radial-gradient(
              circle at 92% 10%,
              rgba(168,85,247,.25),
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 90%,
              rgba(236,72,153,.16),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #030305 0%,
              #0a0c1e 34%,
              #211039 68%,
              #060509 100%
            );

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

        /* HEADER */

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

          background:
            linear-gradient(
              135deg,
              #4f46e5,
              #7c3aed,
              #c084fc
            );

          box-shadow:
            0 10px 30px rgba(124,58,237,.35);
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

        /* MAIN CARD */

        .rf-card {
          position: relative;
          overflow: visible;

          padding: 48px;

          border:
            1px solid rgba(167,139,250,.22);

          border-radius: 32px;

          background:
            linear-gradient(
              145deg,
              rgba(20,20,38,.88),
              rgba(7,7,14,.94)
            );

          box-shadow:
            0 35px 90px rgba(0,0,0,.55),
            inset 0 1px 0 rgba(255,255,255,.06);

          backdrop-filter: blur(18px);
        }

        .rf-content {
          position: relative;
          z-index: 5;

          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 55px;

          align-items: center;
        }

        /* LEFT */

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

          background:
            linear-gradient(
              90deg,
              #a5b4fc,
              #c4b5fd,
              #f0abfc
            );

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

          border:
            1px solid rgba(255,255,255,.08);

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

        /* ACTION CARD */

        .rf-actions {
          padding: 25px;

          border:
            1px solid rgba(255,255,255,.09);

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.055),
              rgba(255,255,255,.02)
            );

          box-shadow:
            0 20px 50px rgba(0,0,0,.3);
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

          transition:
            transform .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
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

          background:
            linear-gradient(
              110deg,
              rgba(79,70,229,.9),
              rgba(124,58,237,.9),
              rgba(168,85,247,.85)
            );

          box-shadow:
            0 12px 30px rgba(79,70,229,.22);
        }

        .rf-report small {
          color: #ddd6fe;
        }

        .rf-find {
          border: 1px solid rgba(232,121,249,.2);

          background:
            linear-gradient(
              110deg,
              rgba(8,8,18,.95),
              rgba(55,20,70,.72)
            );
        }

        .rf-find small {
          color: #aaa6bb;
        }

        .rf-security {
          display: flex;
          gap: 10px;

          margin-top: 15px;
          padding: 12px;

          border:
            1px solid rgba(255,255,255,.07);

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

        /* =====================================================
           DETECTIVE
           ===================================================== */

        .rf-detective {
          position: absolute;

          left: 50%;
          top: 0;

          width: 340px;
          height: 220px;

          z-index: 2;

          transform:
            translate(-50%, -72%)
            rotate(-2deg);

          transform-origin: 50% 100%;

          animation:
            rf-detective-peek
            14s
            ease-in-out
            infinite;
        }

        .rf-body {
          position: absolute;

          left: 50%;
          bottom: 0;

          width: 145px;
          height: 105px;

          transform: translateX(-50%);

          border-radius: 65px 65px 12px 12px;

          background:
            linear-gradient(
              180deg,
              #171722,
              #030305
            );

          box-shadow:
            0 20px 35px rgba(0,0,0,.65);
        }

        .rf-head {
          position: absolute;

          left: 50%;
          top: 64px;

          width: 105px;
          height: 82px;

          transform: translateX(-50%);

          border-radius:
            48%
            48%
            43%
            43%;

          background: #050508;

          border:
            1px solid rgba(255,255,255,.06);

          box-shadow:
            0 15px 30px rgba(0,0,0,.65);
        }

        .rf-eye {
          position: absolute;

          top: 32px;

          width: 10px;
          height: 10px;

          border-radius: 50%;

          background: #ff1938;

          box-shadow:
            0 0 12px #ff1938,
            0 0 28px rgba(255,25,56,.5);

          animation:
            rf-eye-glow
            3.4s
            ease-in-out
            infinite;
        }

        .rf-eye-left {
          left: 25px;
        }

        .rf-eye-right {
          right: 25px;

          animation-delay: .1s;
        }

        .rf-eye i {
          position: absolute;

          inset: 2px;

          border-radius: 50%;

          background: #610612;
        }

        .rf-eye-left i {
          animation:
            rf-eye-scan
            3.4s
            ease-in-out
            infinite;
        }

        .rf-eye-right i {
          animation:
            rf-eye-scan-reverse
            3.4s
            ease-in-out
            infinite;
        }

        /* HAT */

        .rf-hat {
          position: absolute;

          left: 50%;
          top: 10px;

          width: 185px;
          height: 75px;

          transform:
            translateX(-50%)
            rotate(-4deg);
        }

        .rf-hat-crown {
          position: absolute;

          left: 50%;
          bottom: 22px;

          width: 82px;
          height: 48px;

          transform: translateX(-50%);

          border-radius:
            28px
            28px
            10px
            10px;

          background:
            linear-gradient(
              180deg,
              #1a1a27,
              #040407
            );

          border:
            1px solid rgba(255,255,255,.08);
        }

        .rf-hat-band {
          position: absolute;

          left: 50%;
          bottom: 29px;

          width: 80px;
          height: 7px;

          transform: translateX(-50%);

          background:
            linear-gradient(
              90deg,
              #312e81,
              #a855f7,
              #312e81
            );
        }

        .rf-hat-brim {
          position: absolute;

          left: 50%;
          bottom: 12px;

          width: 178px;
          height: 20px;

          transform:
            translateX(-50%)
            rotate(-2deg);

          border-radius: 50%;

          background:
            linear-gradient(
              180deg,
              #191925,
              #040407
            );

          border:
            1px solid rgba(255,255,255,.08);

          box-shadow:
            0 8px 18px rgba(0,0,0,.5);
        }

        /* MAGNIFIER */

        .rf-magnifier {
          position: absolute;

          right: 17px;
          top: 104px;

          width: 85px;
          height: 85px;

          transform: rotate(-22deg);
        }

        .rf-glass {
          position: absolute;

          width: 54px;
          height: 54px;

          border:
            6px solid #c4b5fd;

          border-radius: 50%;

          background:
            rgba(129,140,248,.08);

          box-shadow:
            0 0 25px rgba(129,140,248,.25);
        }

        .rf-handle {
          position: absolute;

          left: 49px;
          top: 48px;

          width: 9px;
          height: 40px;

          border-radius: 999px;

          background:
            linear-gradient(
              180deg,
              #c4b5fd,
              #7c3aed
            );
        }

        /* ANIMATION */

        @keyframes rf-detective-peek {

          0%,
          7%,
          17%,
          100% {
            transform:
              translate(-50%, -72%)
              rotate(-2deg);
          }

          10%,
          14% {
            transform:
              translate(-50%, -28%)
              rotate(1deg);
          }

          30%,
          38% {
            transform:
              translate(-43%, -27%)
              rotate(-6deg);
          }

          42%,
          50% {
            transform:
              translate(-43%, -69%)
              rotate(-8deg);
          }

          63%,
          70% {
            transform:
              translate(-57%, -27%)
              rotate(5deg);
          }

          74%,
          82% {
            transform:
              translate(-57%, -69%)
              rotate(8deg);
          }
        }

        @keyframes rf-eye-scan {

          0%,
          18%,
          100% {
            transform: translateX(0);
          }

          28% {
            transform: translateX(3px);
          }

          43% {
            transform: translateX(-3px);
          }

          58% {
            transform: translateX(3px);
          }

          72% {
            transform: translateX(0);
          }
        }

        @keyframes rf-eye-scan-reverse {

          0%,
          18%,
          100% {
            transform: translateX(0);
          }

          28% {
            transform: translateX(-3px);
          }

          43% {
            transform: translateX(3px);
          }

          58% {
            transform: translateX(-3px);
          }

          72% {
            transform: translateX(0);
          }
        }

        @keyframes rf-eye-glow {

          0%,
          20%,
          100% {
            opacity: .75;
            transform: scale(1);
          }

          30%,
          44% {
            opacity: 1;
            transform: scale(1.18);
          }

          52%,
          68% {
            opacity: .55;
            transform: scale(.9);
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

        /* MOBILE */

        @media (max-width: 900px) {

          .rf-card {
            padding: 28px;
          }

          .rf-content {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .rf-left {
            padding-top: 35px;
          }

        }

        @media (max-width: 600px) {

          .rf-shell {
            width: min(100% - 24px, 1180px);
          }

          .rf-card {
            padding: 20px;
            border-radius: 24px;
          }

          .rf-left h1 {
            font-size: 42px;
          }

          .rf-info-grid {
            grid-template-columns: 1fr;
          }

          .rf-detective {
            transform:
              translate(-50%, -70%)
              scale(.78);
          }

        }

        @media (prefers-reduced-motion: reduce) {

          .rf-detective,
          .rf-eye,
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