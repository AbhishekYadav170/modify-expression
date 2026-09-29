

import React from "react";
import { useNavigate } from "react-router";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import "./home.css";

const Home = () => {
    const { handleGetSong } = useSong();
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const handleExpression = (expression) => {
        if (expression) {
            handleGetSong({ mood: expression });
        }
    };

    const handleUserLogout = async () => {
        await handleLogout();
        navigate("/login", { replace: true });
    };

    const username = user?.username || "User";
    const email = user?.email || "";

    const initials = username
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="home-page">

            {/* ================= NAVBAR ================= */}
            <header className="home-navbar">
                <div className="navbar-container">

                    <div className="brand">
                        <div className="brand-icon">
                            M
                        </div>

                        <div className="brand-text">
                            <strong>Moodify</strong>
                            <span>AI Music Experience</span>
                        </div>
                    </div>

                    <div className="navbar-right">

                        <div className="user-profile">
                            <div className="user-avatar">
                                {initials}
                            </div>

                            <div className="user-details">
                                <strong>{username}</strong>
                                <span>{email}</span>
                            </div>
                        </div>

                        <button
                            className="logout-button"
                            onClick={handleUserLogout}
                            title="Logout"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M10 17l5-5-5-5" />
                                <path d="M15 12H3" />
                                <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
                            </svg>

                            <span>Logout</span>
                        </button>

                    </div>
                </div>
            </header>


            {/* ================= MAIN ================= */}
            <main className="home-main">

                {/* HERO */}
                <section className="hero-section">

                    <div className="hero-content">

                        <div className="hero-badge">
                            <span className="status-dot"></span>
                            AI POWERED EXPERIENCE
                        </div>

                        <h1>
                            Music that matches
                            <span> your mood.</span>
                        </h1>

                        <p>
                            Let our AI understand your facial expression
                            and discover music that fits the way you feel
                            right now.
                        </p>

                        <div className="hero-stats">

                            <div className="hero-stat">
                                <strong>AI</strong>
                                <span>Expression Detection</span>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="hero-stat">
                                <strong>24/7</strong>
                                <span>Music Experience</span>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="hero-stat">
                                <strong>∞</strong>
                                <span>Mood Discoveries</span>
                            </div>

                        </div>

                    </div>

                    <div className="hero-decoration">
                        <div className="orb orb-one"></div>
                        <div className="orb orb-two"></div>
                        <div className="orb orb-three"></div>
                    </div>

                </section>


                {/* EXPRESSION AREA */}
                <section className="expression-section">

                    <div className="section-heading">
                        <div>
                            <span className="section-label">
                                STEP 01
                            </span>

                            <h2>
                                Discover your mood
                            </h2>

                            <p>
                                Turn on your camera and let AI read your
                                current facial expression.
                            </p>
                        </div>

                        <div className="live-indicator">
                            <span></span>
                            Camera Ready
                        </div>
                    </div>


                    <div className="expression-grid">

                        {/* CAMERA CARD */}
                        <div className="camera-card">

                            <div className="camera-card-header">
                                <div>
                                    <span className="card-eyebrow">
                                        LIVE CAMERA
                                    </span>

                                    <h3>
                                        Expression Scanner
                                    </h3>
                                </div>

                                <div className="secure-badge">
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="15"
                                        height="15"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="10"
                                            rx="2"
                                        />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>

                                    Private
                                </div>
                            </div>

                            <div className="camera-wrapper">
                                <FaceExpression
                                    onClick={handleExpression}
                                />
                            </div>

                        </div>


                        {/* SIDE INFO */}
                        <div className="expression-info">

                            <div className="info-card active-info">
                                <div className="info-icon">
                                    ✦
                                </div>

                                <div>
                                    <span>SMART DETECTION</span>
                                    <h3>
                                        AI understands how you feel
                                    </h3>
                                    <p>
                                        Our expression engine analyzes
                                        your facial features to identify
                                        your current mood.
                                    </p>
                                </div>
                            </div>


                            <div className="mood-list-card">

                                <div className="mood-list-header">
                                    <span>SUPPORTED MOODS</span>
                                    <span className="mood-count">
                                        03
                                    </span>
                                </div>

                                <div className="mood-item">
                                    <span className="mood-emoji">😊</span>
                                    <div>
                                        <strong>Happy</strong>
                                        <span>Feel-good music</span>
                                    </div>
                                </div>

                                <div className="mood-item">
                                    <span className="mood-emoji">😮</span>
                                    <div>
                                        <strong>Surprised</strong>
                                        <span>Energetic discoveries</span>
                                    </div>
                                </div>

                                <div className="mood-item">
                                    <span className="mood-emoji">😔</span>
                                    <div>
                                        <strong>Sad</strong>
                                        <span>Calm & emotional music</span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* HOW IT WORKS */}
                <section className="how-section">

                    <div className="section-heading centered">
                        <span className="section-label">
                            HOW IT WORKS
                        </span>

                        <h2>
                            From expression to music
                        </h2>

                        <p>
                            Three simple steps to create your personal
                            listening experience.
                        </p>
                    </div>


                    <div className="steps-grid">

                        <div className="step-card">
                            <div className="step-number">
                                01
                            </div>

                            <div className="step-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="3"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                    />
                                </svg>
                            </div>

                            <h3>
                                Show your face
                            </h3>

                            <p>
                                Allow the camera to see your facial
                                expression.
                            </p>
                        </div>


                        <div className="step-card">
                            <div className="step-number">
                                02
                            </div>

                            <div className="step-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M12 3v18" />
                                    <path d="M5 8h14" />
                                    <path d="M7 8l-3 6h6L7 8z" />
                                    <path d="M17 8l-3 6h6l-3-6z" />
                                </svg>
                            </div>

                            <h3>
                                AI reads your mood
                            </h3>

                            <p>
                                Our expression engine identifies the
                                mood from your face.
                            </p>
                        </div>


                        <div className="step-card">
                            <div className="step-number">
                                03
                            </div>

                            <div className="step-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M9 18V5l11-2v13" />
                                    <circle
                                        cx="6"
                                        cy="18"
                                        r="3"
                                    />
                                    <circle
                                        cx="17"
                                        cy="16"
                                        r="3"
                                    />
                                </svg>
                            </div>

                            <h3>
                                Enjoy your music
                            </h3>

                            <p>
                                Get a song recommendation based on
                                your detected mood.
                            </p>
                        </div>

                    </div>

                </section>


                {/* FOOTER */}
                <footer className="home-footer">
                    <div>
                        <strong>Moodify</strong>
                        <span>
                            AI-powered music discovery
                        </span>
                    </div>

                    <p>
                        Built with React • AI • Music
                    </p>
                </footer>

            </main>


            {/* EXISTING MUSIC PLAYER */}
            <Player />

        </div>
    );
};

export default Home;