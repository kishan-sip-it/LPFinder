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

        {/* STAGE */}
        <div className="rf-stage">
          {/* =========================
              DETECTIVE — BEHIND CARD
             ========================= */}
          <div className="rf-detective" aria-hidden="true">
            <div className="rf-arm rf-arm-left">
              <span className="rf-hand" />
            </div>

            <div className="rf-arm rf-arm-right">
              <span className="rf-hand" />
            </div>

            <div className="rf-robot">
              <div className="rf-head">
                <span className="rf-eye rf-eye-left">
                  <i />
                </span>

                <span className="rf-eye rf-eye-right">
                  <i />
                </span>
              </div>

              <div className="rf-neck" />
              <div className="rf-body" />
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

          {/* =========================
              ACTUAL CONTENT CARD
             ========================= */}
          <section className="rf-card">
            <div className="rf-content">
              <div className="rf-left">
                <span className="rf-kicker">EVERY CLUE MATTERS</span>

                <h1>
                  Find the missing piece.
                  <span>Bring someone home.</span>
                </h1>

                <p className="rf-description">
                  ReuniteFind keeps missing-person reports organized,
                  searchable, and easy to follow — from the first report to
                  the moment a case is resolved.
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
                    Public case viewing is read-only. Your own submitted
                    reports are managed separately.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

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
            radial-gradient(
              circle at 8% 10%,
              rgba(79, 70, 229, 0.3),
              transparent 30%
            ),
            radial-gradient(
              circle at 92% 10%,
              rgba(168, 85, 247, 0.25),
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 90%,
              rgba(236, 72, 153, 0.16),
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
            0 10px 30px rgba(124, 58, 237, 0.35);
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

          border: 1px solid rgba(196, 181, 253, 0.2);
          border-radius: 999px;

          background: rgba(255, 255, 255, 0.04);

          color: #ddd6fe;
          text-decoration: none;

          font-size: 13px;
          font-weight: 700;
        }

        /* =========================
           STAGE
           ========================= */

        .rf-stage {
          position: relative;
          isolation: isolate;
          overflow: visible;
        }

        /* =========================
           CARD
           ========================= */

        .rf-card {
          position: relative;
          z-index: 5;

          padding: 48px;

          border: 1px solid rgba(167, 139, 250, 0.22);
          border-radius: 32px;

          background:
            linear-gradient(
              145deg,
              rgba(20, 20, 38, 0.94),
              rgba(7, 7, 14, 0.97)
            );

          box-shadow:
            0 35px 90px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);

          backdrop-filter: blur(18px);
        }

        .rf-content {
          position: relative;
          z-index: 6;

          display: grid;
          grid-template-columns: 1.05fr 0.95fr;

          gap: 55px;

          align-items: center;
        }

        .rf-left {
          padding-top: 28px;
        }

        .rf-kicker {
          display: inline-flex;

          padding: 6px 11px;

          border: 1px solid rgba(232, 121, 249, 0.2);
          border-radius: 999px;

          background: rgba(232, 121, 249, 0.08);

          color: #f0abfc;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .rf-left h1 {
          margin: 18px 0 0;

          font-size: clamp(42px, 5vw, 68px);
          line-height: 0.96;
          letter-spacing: -0.055em;

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
          grid-template-columns: repeat(3, 1fr);

          gap: 10px;

          margin-top: 28px;
        }

        .rf-info {
          padding: 15px;

          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;

          background: rgba(255, 255, 255, 0.035);
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

          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.02)
            );

          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .rf-action-label {
          color: #a78bfa;

          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
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
            transform 0.16s ease,
            box-shadow 0.16s ease;
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
          border: 1px solid rgba(196, 181, 253, 0.3);

          background:
            linear-gradient(
              110deg,
              rgba(79, 70, 229, 0.9),
              rgba(124, 58, 237, 0.9),
              rgba(168, 85, 247, 0.85)
            );

          box-shadow:
            0 12px 30px rgba(79, 70, 229, 0.22);
        }

        .rf-find {
          border: 1px solid rgba(232, 121, 249, 0.2);

          background:
            linear-gradient(
              110deg,
              rgba(8, 8, 18, 0.95),
              rgba(55, 20, 70, 0.72)
            );
        }

        .rf-security {
          display: flex;
          gap: 10px;

          margin-top: 15px;
          padding: 12px;

          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 15px;

          background: rgba(0, 0, 0, 0.18);
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

        /* =========================================================
   DETECTIVE — BITMOJI STYLE PEEK
   IMPORTANT:
   - Detective stays BEHIND the card
   - Hands help pull it upward
   - Slow rise
   - Eye scan happens while visible
   - Slow descent
   - No floating / no random-angle jumps
   ========================================================= */

.rf-detective {
  position: absolute;
  z-index: 2;

  left: 50%;
  top: 0;

  width: 300px;
  height: 235px;

  transform: translate(-50%, -92%);
  transform-origin: 50% 100%;

  pointer-events: none;

  animation:
    rf-bitmoji-peek
    7.5s
    ease-in-out
    infinite;
}

/* robot container */
.rf-robot {
  position: absolute;

  left: 50%;
  bottom: 0;

  width: 150px;
  height: 175px;

  transform: translateX(-50%);
}

/* serious robotic head */
.rf-head {
  position: absolute;

  left: 50%;
  top: 36px;

  width: 94px;
  height: 74px;

  transform: translateX(-50%);

  border-radius: 28px;

  background:
    linear-gradient(
      180deg,
      #0d0d14,
      #020205
    );

  border: 1px solid rgba(255,255,255,.045);

  box-shadow:
    0 12px 26px rgba(0,0,0,.55);
}

/* robot neck */
.rf-neck {
  position: absolute;

  left: 50%;
  top: 103px;

  width: 22px;
  height: 22px;

  transform: translateX(-50%);

  border-radius: 7px;

  background: #08080d;
}

/* robot body */
.rf-body {
  position: absolute;

  left: 50%;
  top: 116px;

  width: 122px;
  height: 92px;

  transform: translateX(-50%);

  border-radius:
    28px 28px 12px 12px;

  background:
    linear-gradient(
      180deg,
      #11111b,
      #030305
    );

  box-shadow:
    0 18px 28px rgba(0,0,0,.55);
}

/* =========================================================
   EYES
   BOTH EYES ALWAYS MOVE TOGETHER
   ========================================================= */

.rf-eye {
  position: absolute;

  top: 30px;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #ff1737;

  box-shadow:
    0 0 10px rgba(255,23,55,.95),
    0 0 23px rgba(255,23,55,.4);
}

.rf-eye-left {
  left: 23px;
}

.rf-eye-right {
  right: 23px;
}

.rf-eye i {
  position: absolute;

  top: 2px;
  left: 2px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: #350207;

  animation:
    rf-eye-together
    2.2s
    ease-in-out
    infinite;
}

/* same exact motion for both eyes */
.rf-eye-left i,
.rf-eye-right i {
  animation-name: rf-eye-together;
}

@keyframes rf-eye-together {

  0%,
  10% {
    left: 2px;
  }

  22%,
  34% {
    left: 5px;
  }

  46%,
  58% {
    left: 2px;
  }

  70%,
  82% {
    left: 5px;
  }

  94%,
  100% {
    left: 2px;
  }
}

/* =========================================================
   ARMS + HANDS
   Hands appear to hold the card edge during the peek
   ========================================================= */

.rf-arm {
  position: absolute;

  bottom: 48px;

  width: 40px;
  height: 108px;

  border-radius: 30px;

  background:
    linear-gradient(
      180deg,
      #151520,
      #050507
    );

  z-index: 3;
}

/* left hand/arm */
.rf-arm-left {
  left: 22px;

  transform-origin:
    50% 100%;

  transform: rotate(20deg);
}

/* right hand/arm */
.rf-arm-right {
  right: 22px;

  transform-origin:
    50% 100%;

  transform: rotate(-20deg);
}

.rf-hand {
  position: absolute;

  width: 29px;
  height: 29px;

  bottom: -6px;

  border-radius:
    10px 10px 14px 14px;

  background:
    linear-gradient(
      180deg,
      #20202c,
      #07070b
    );

  box-shadow:
    0 5px 10px rgba(0,0,0,.5);
}

.rf-arm-left .rf-hand {
  left: 4px;
}

.rf-arm-right .rf-hand {
  right: 4px;
}

/* =========================================================
   HAT
   ========================================================= */

.rf-hat {
  position: absolute;

  left: 50%;
  top: 0;

  width: 180px;
  height: 70px;

  transform:
    translateX(-50%)
    rotate(-3deg);

  z-index: 8;
}

.rf-hat-crown {
  position: absolute;

  left: 50%;
  bottom: 20px;

  width: 78px;
  height: 45px;

  transform: translateX(-50%);

  border-radius:
    24px
    24px
    9px
    9px;

  background:
    linear-gradient(
      180deg,
      #191925,
      #040407
    );
}

.rf-hat-band {
  position: absolute;

  left: 50%;
  bottom: 27px;

  width: 74px;
  height: 6px;

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
  bottom: 10px;

  width: 170px;
  height: 18px;

  transform: translateX(-50%);

  border-radius: 50%;

  background:
    linear-gradient(
      180deg,
      #181823,
      #040407
    );
}

/* =========================================================
   MAGNIFIER
   ========================================================= */

.rf-magnifier {
  position: absolute;

  right: 8px;
  top: 82px;

  width: 74px;
  height: 74px;

  transform: rotate(-18deg);

  z-index: 10;
}

.rf-glass {
  position: absolute;

  width: 52px;
  height: 52px;

  border:
    6px solid #c4b5fd;

  border-radius: 50%;

  background:
    rgba(129,140,248,.08);

  box-shadow:
    0 0 22px rgba(129,140,248,.22);
}

.rf-handle {
  position: absolute;

  left: 47px;
  top: 46px;

  width: 8px;
  height: 34px;

  border-radius: 999px;

  background:
    linear-gradient(
      180deg,
      #c4b5fd,
      #7c3aed
    );
}

/* =========================================================
   MAIN BITMOJI MOVEMENT

   0-18%  : completely hidden
   18-32% : slowly rises
   32-70% : stays up while eyes scan
   70-86% : slowly goes down
   86-100%: fully hidden
   ========================================================= */

@keyframes rf-bitmoji-peek {

  0%,
  12% {
    transform:
      translate(-50%, -94%);
  }

  28% {
    transform:
      translate(-50%, -30%);
  }

  62% {
    transform:
      translate(-50%, -30%);
  }

  82% {
    transform:
      translate(-50%, -94%);
  }

  100% {
    transform:
      translate(-50%, -94%);
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

          background: rgba(79, 70, 229, 0.2);
        }

        .rf-glow-right {
          right: -160px;
          bottom: 5%;

          background: rgba(192, 132, 252, 0.16);
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
          .rf-card {
            padding: 28px;
          }

          .rf-content {
            grid-template-columns: 1fr;
            gap: 35px;
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
              translate(-50%, -92%)
              scale(0.78);
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