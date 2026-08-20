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
        DETECTIVE — SMALL BITMOJI STYLE PEEK
        - Small head
        - Only head + hat + hands are meant to show
        - Body stays behind the card
        - Hands actually pull upward during the peek
        - Peek happens from top / left / right edges
        - Slow rise -> eye scan -> slow retreat
        ========================================================= */
     
     .rf-detective {
       position: absolute;
       z-index: 2;
     
       left: 50%;
       top: 0;
     
       width: 220px;
       height: 180px;
     
       transform: translate(-50%, -96%);
       transform-origin: 50% 100%;
     
       pointer-events: none;
     
       animation:
         rf-bitmoji-peek
         9s
         ease-in-out
         infinite;
     }
     
     /* ---------------- ROBOT BODY ---------------- */
     
     .rf-robot {
       position: absolute;
     
       left: 50%;
       bottom: -8px;
     
       width: 110px;
       height: 135px;
     
       transform: translateX(-50%);
     }
     
     /* head = the main visible element */
     
     .rf-head {
       position: absolute;
     
       left: 50%;
       top: 34px;
     
       width: 70px;
       height: 56px;
     
       transform: translateX(-50%);
     
       border-radius: 20px;
     
       background:
         linear-gradient(
           180deg,
           #0e0e15,
           #020204
         );
     
       border: 1px solid rgba(255,255,255,.045);
     
       box-shadow:
         0 10px 20px rgba(0,0,0,.5);
     }
     
     /* neck stays low / mostly hidden */
     
     .rf-neck {
       position: absolute;
     
       left: 50%;
       top: 108px;
     
       width: 15px;
       height: 15px;
     
       transform: translateX(-50%);
     
       border-radius: 5px;
     
       background: #08080d;
     }
     
     /* body is deliberately low so card hides it */
     
     .rf-body {
       position: absolute;
     
       left: 50%;
       top: 118px;
     
       width: 92px;
       height: 72px;
     
       transform: translateX(-50%);
     
       border-radius: 24px 24px 8px 8px;
     
       background:
         linear-gradient(
           180deg,
           #11111b,
           #030305
         );
     
       box-shadow:
         0 14px 24px rgba(0,0,0,.5);
     }
     
     /* ---------------- EYES ---------------- */
     
     .rf-eye {
       position: absolute;
     
       top: 23px;
     
       width: 7px;
       height: 7px;
     
       border-radius: 50%;
     
       background: #ff1737;
     
       box-shadow:
         0 0 8px rgba(255,23,55,.95),
         0 0 17px rgba(255,23,55,.4);
     }
     
     .rf-eye-left {
       left: 18px;
     }
     
     .rf-eye-right {
       right: 18px;
     }
     
     .rf-eye i {
       position: absolute;
     
       top: 1px;
       left: 1px;
     
       width: 5px;
       height: 5px;
     
       border-radius: 50%;
     
       background: #350207;
     
       animation:
         rf-eye-together
         2.1s
         ease-in-out
         infinite;
     }
     
     /* BOTH eyes always move together */
     
     @keyframes rf-eye-together {
     
       0%,
       12% {
         left: 1px;
       }
     
       28%,
       42% {
         left: 4px;
       }
     
       55%,
       68% {
         left: 1px;
       }
     
       80%,
       92% {
         left: 4px;
       }
     
       100% {
         left: 1px;
       }
     }
     
     /* ---------------- ARMS / HANDS ---------------- */
     
     /* arms start lower and pull upward */
     
     .rf-arm {
       position: absolute;
     
       bottom: 32px;
     
       width: 28px;
       height: 76px;
     
       border-radius: 20px;
     
       background:
         linear-gradient(
           180deg,
           #171722,
           #050507
         );
     
       z-index: 4;
     
       animation:
         rf-arm-pull
         9s
         ease-in-out
         infinite;
     }
     
     .rf-arm-left {
       left: 16px;
     
       transform-origin: 50% 100%;
       transform: rotate(24deg);
     }
     
     .rf-arm-right {
       right: 16px;
     
       transform-origin: 50% 100%;
       transform: rotate(-24deg);
     }
     
     /* hands grip the card */
     
     .rf-hand {
       position: absolute;
     
       width: 20px;
       height: 20px;
     
       bottom: -4px;
     
       border-radius:
         8px 8px 11px 11px;
     
       background:
         linear-gradient(
           180deg,
           #242431,
           #07070b
         );
     
       box-shadow:
         0 4px 8px rgba(0,0,0,.45);
     }
     
     .rf-arm-left .rf-hand {
       left: 2px;
     }
     
     .rf-arm-right .rf-hand {
       right: 2px;
     }
     
     /* actual pulling motion */
     
     @keyframes rf-arm-pull {

  /* hidden */
  0%,
  10% {
    transform:
      translateY(16px)
      rotate(24deg);
  }

  /* pull up with TOP peek */
  18%,
  22% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* hold while eyes scan */
  22%,
  40% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* retreat */
  48% {
    transform:
      translateY(16px)
      rotate(24deg);
  }

  /* pull up with RIGHT peek */
  58%,
  63% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* hold */
  63%,
  72% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* retreat */
  77% {
    transform:
      translateY(16px)
      rotate(24deg);
  }

  /* pull up with LEFT peek */
  84%,
  89% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* hold */
  89%,
  95% {
    transform:
      translateY(0)
      rotate(17deg);
  }

  /* retreat */
  100% {
    transform:
      translateY(16px)
      rotate(24deg);
  }
}

.rf-arm-right {
  animation-name: rf-arm-pull-right;
}

@keyframes rf-arm-pull-right {

  0%,
  10% {
    transform:
      translateY(16px)
      rotate(-24deg);
  }

  18%,
  22% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  22%,
  40% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  48% {
    transform:
      translateY(16px)
      rotate(-24deg);
  }

  58%,
  63% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  63%,
  72% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  77% {
    transform:
      translateY(16px)
      rotate(-24deg);
  }

  84%,
  89% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  89%,
  95% {
    transform:
      translateY(0)
      rotate(-17deg);
  }

  100% {
    transform:
      translateY(16px)
      rotate(-24deg);
  }
}
     /* ---------------- HAT ---------------- */
     
     .rf-hat {
       position: absolute;
     
       left: 50%;
       top: 3px;
     
       width: 128px;
       height: 52px;
     
       transform:
         translateX(-50%)
         rotate(-3deg);
     
       z-index: 8;
     }
     
     .rf-hat-crown {
       position: absolute;
     
       left: 50%;
       bottom: 16px;
     
       width: 58px;
       height: 32px;
     
       transform: translateX(-50%);
     
       border-radius:
         18px
         18px
         7px
         7px;
     
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
       bottom: 21px;
     
       width: 56px;
       height: 5px;
     
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
       bottom: 8px;
     
       width: 128px;
       height: 14px;
     
       transform: translateX(-50%);
     
       border-radius: 50%;
     
       background:
         linear-gradient(
           180deg,
           #181823,
           #040407
         );
     }
     
     /* ---------------- MAGNIFIER ---------------- */
     
     .rf-magnifier {
       position: absolute;
     
       right: 10px;
       top: 65px;
     
       width: 52px;
       height: 52px;
     
       transform: rotate(-18deg);
     
       z-index: 10;
     }
     
     .rf-glass {
       position: absolute;
     
       width: 36px;
       height: 36px;
     
       border:
         4px solid #c4b5fd;
     
       border-radius: 50%;
     
       background:
         rgba(129,140,248,.08);
     
       box-shadow:
         0 0 16px rgba(129,140,248,.22);
     }
     
     .rf-handle {
       position: absolute;
     
       left: 32px;
       top: 31px;
     
       width: 6px;
       height: 25px;
     
       border-radius: 999px;
     
       background:
         linear-gradient(
           180deg,
           #c4b5fd,
           #7c3aed
         );
     }
     
     /* =========================================================
        MAIN MOVEMENT
     
        TOP → hide → RIGHT EDGE → hide → LEFT EDGE → hide
        ========================================================= */
     
     @keyframes rf-bitmoji-peek {
     
       /* hidden */
       0%,
       10% {
         transform:
           translate(-50%, -96%);
       }
     
       /* rise from TOP */
       18% {
         transform:
           translate(-50%, -36%);
       }
     
       /* hold while eyes work */
       22%,
       40% {
         transform:
           translate(-50%, -36%);
       }
     
       /* retreat */
       48% {
         transform:
           translate(-50%, -96%);
       }
     
       /* appear from RIGHT */
       58% {
         transform:
           translate(32%, -52%);
       }
     
       63%,
       72% {
         transform:
           translate(32%, -52%);
       }
     
       /* leave RIGHT */
       77% {
         transform:
           translate(32%, -96%);
       }
     
       /* appear from LEFT */
       84% {
         transform:
           translate(-132%, -52%);
       }
     
       89%,
       95% {
         transform:
           translate(-132%, -52%);
       }
     
       /* leave LEFT */
       100% {
         transform:
           translate(-50%, -96%);
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
      
              scale: 0.78;
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