'use client';

import { useEffect, useState } from 'react';
import { gameQuestions, type Question } from '@/lib/data';
import './game.css';
import Image from 'next/image';

type Team = 'A' | 'B';
type PotType = 'question' | 'bonus' | 'penalty' | 'empty';

interface Pot {
  id: number;
  type: PotType;
  question?: Question;
  opened: boolean;
  openedBy?: Team;
  displayNumber: number;
}

export function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team>('A');
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [pots, setPots] = useState<Pot[]>([]);
  const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [canTransfer, setCanTransfer] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [originalTeam, setOriginalTeam] = useState<Team | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [victorySoundPlayed, setVictorySoundPlayed] = useState(false);
  const [questionLocked, setQuestionLocked] = useState(true);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Mật khẩu để bắt đầu trò chơi
  const gamePassword = '2025Phenomenon';

  // Initialize game
  const initializeGame = () => {
    const shuffledQuestions = [...gameQuestions].sort(() => Math.random() - 0.5);
    
    // Generate random display numbers 1-12
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    
    const newPots: Pot[] = [];
    
    // 8 question pots
    for (let i = 0; i < 8; i++) {
      newPots.push({
        id: i,
        type: 'question',
        question: shuffledQuestions[i],
        opened: false,
        displayNumber: numbers[i]
      });
    }
    // 1 bonus pot
    newPots.push({ id: 8, type: 'bonus', opened: false, displayNumber: numbers[8] });
    // 1 penalty pot
    newPots.push({ id: 9, type: 'penalty', opened: false, displayNumber: numbers[9] });
    // 2 empty pots (niêu trống hình phạt)
    newPots.push({ id: 10, type: 'empty', opened: false, displayNumber: numbers[10] });
    newPots.push({ id: 11, type: 'empty', opened: false, displayNumber: numbers[11] });
    // Shuffle all pots
    const shuffled = newPots.sort(() => Math.random() - 0.5);
    setPots(shuffled);
    
    // Random starting team
    setCurrentTeam(Math.random() > 0.5 ? 'A' : 'B');
    setScoreA(0);
    setScoreB(0);
    setGameStarted(true);
    setGameOver(false);
    setVictorySoundPlayed(false);
  };

  // Sound effects
  const playTickSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playUrgentSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1200;
    oscillator.type = 'square';
    gainNode.gain.value = 0.4;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const playCorrectSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    // Play ascending notes
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playWrongSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 200;
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playBonusSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Play fanfare
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.2;
      osc.start(audioContext.currentTime + i * 0.1);
      osc.stop(audioContext.currentTime + i * 0.1 + 0.15);
    });
  };

  const playVictorySound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Epic victory fanfare - nhạc chiến thắng hoành tráng
    const notes = [
      { freq: 392, time: 0 },      // G4
      { freq: 523, time: 0.15 },   // C5
      { freq: 659, time: 0.3 },    // E5
      { freq: 784, time: 0.45 },   // G5
      { freq: 1047, time: 0.6 },   // C6
      { freq: 784, time: 0.75 },   // G5
      { freq: 1047, time: 0.9 },   // C6
      { freq: 1319, time: 1.05 },  // E6
      { freq: 1568, time: 1.2 },   // G6 - final note
    ];
    
    notes.forEach(({ freq, time }) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.value = 0.25;
      gain.gain.setValueAtTime(0.25, audioContext.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.2);
      osc.start(audioContext.currentTime + time);
      osc.stop(audioContext.currentTime + time + 0.25);
    });
  };

  // Timer countdown
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
        // Play sounds based on time remaining
        if (timer <= 5) {
          playUrgentSound();
        } else if (timer <= 10) {
          playTickSound();
        }
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && timerActive) {
      handleTimeout();
    }
  }, [timer, timerActive]);

  const handleTimeout = () => {
    setTimerActive(false);
    playWrongSound();
    
    if (selectedPot?.type === 'question') {
      if (!isTransferring) {
        // First team ran out of time - transfer to other team
        setCanTransfer(true);
        setOriginalTeam(currentTeam);
      } else {
        // Second team also ran out of time - move to next question
        setShowResult(true);
        setTimeout(() => {
          resetQuestion();
          setCurrentTeam(originalTeam === 'A' ? 'B' : 'A');
          checkGameEnd();
        }, 2000);
      }
    }
  };

  const handlePotClick = (pot: Pot) => {
    if (!gameStarted || pot.opened || selectedPot || gameOver) return;
    setSelectedPot(pot);
    setPots(prev => prev.map(p => p.id === pot.id ? { ...p, opened: true, openedBy: currentTeam } : p));
    if (pot.type === 'question') {
      // Khóa câu hỏi và hiện prompt mở khóa
      setQuestionLocked(true);
      setShowUnlockPrompt(true);
    } else if (pot.type === 'bonus') {
      handleSpecialPot(10);
    } else if (pot.type === 'penalty') {
      handleSpecialPot(-10);
    } else if (pot.type === 'empty') {
      // Niêu trống: hình phạt, chuyển lượt cho đội đối thủ
      setTimeout(() => {
        setSelectedPot(null);
        switchTeam();
        checkGameEnd();
      }, 2000);
    }
  };

  const handleUnlockQuestion = () => {
    setQuestionLocked(false);
    setShowUnlockPrompt(false);
    setTimer(10);
    setTimerActive(true);
  };

  const handleSpecialPot = (points: number) => {
    if (points > 0) {
      playBonusSound();
    } else {
      playWrongSound();
    }
    
    if (currentTeam === 'A') {
      setScoreA(prev => Math.max(0, prev + points));
    } else {
      setScoreB(prev => Math.max(0, prev + points));
    }
    
    setTimeout(() => {
      setSelectedPot(null);
      switchTeam();
      checkGameEnd();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!timerActive || showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !selectedPot?.question) return;
    
    setTimerActive(false);
    setShowResult(true);
    
    const isCorrect = selectedAnswer === selectedPot.question.correctAnswer;
    
    if (isCorrect) {
      playCorrectSound();
      // Đội đầu tiên trả lời đúng: +10 điểm
      // Đội thứ hai (sau khi đội đầu sai) trả lời đúng: +5 điểm
      const points = isTransferring ? 5 : 10;
      if (currentTeam === 'A') {
        setScoreA(prev => prev + points);
      } else {
        setScoreB(prev => prev + points);
      }
      
      // Kết thúc câu hỏi
      setTimeout(() => {
        resetQuestion();
        switchTeam();
        checkGameEnd();
      }, 3000);
    } else {
      playWrongSound();
      
      if (!isTransferring) {
        // Đội đầu tiên sai -> chuyển câu hỏi sang đội khác
        setTimeout(() => {
          setShowResult(false);
          setSelectedAnswer(null);
          setIsTransferring(true);
          setOriginalTeam(currentTeam);
          switchTeam();
          setTimer(10);
          setTimerActive(true);
        }, 2000);
      } else {
        // Đội thứ hai cũng sai -> kết thúc câu hỏi, không ai được điểm
        setTimeout(() => {
          resetQuestion();
          setCurrentTeam(originalTeam === 'A' ? 'B' : 'A');
          checkGameEnd();
        }, 2000);
      }
    }
  };

  const resetQuestion = () => {
    setSelectedPot(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setCanTransfer(false);
    setIsTransferring(false);
    setOriginalTeam(null);
    setTimer(15);
  };

  const handleTransferQuestion = () => {
    setCanTransfer(false);
    setIsTransferring(true);
    setSelectedAnswer(null);
    switchTeam();
    setTimer(15);
    setTimerActive(true);
  };

  const switchTeam = () => {
    setCurrentTeam(prev => prev === 'A' ? 'B' : 'A');
  };

  const checkGameEnd = () => {
    const openedCount = pots.filter(p => p.opened).length;
    if (openedCount >= 10) { // 8 questions + 2 special
      setGameOver(true);
    }
  };

  if (!gameStarted) {
    return (
      <section id="game" className="container section">
        <div className="section-head">
          <div>
            <h2>Game Đập Niêu - Thi Đấu Trí Tuệ</h2>
            <p className="sub">
              2 đội thi đấu với 12 niêu: 8 câu hỏi về Triết học Mác-Lênin + 2 niêu đặc biệt (+10đ/-10đ)
            </p>
          </div>
          <div className="pill pill-ghost">Đập niêu</div>
        </div>
        
        <div className="game-rules card">
          <h3>📜 Luật chơi</h3>
          <ul>
            <li>🎯 <strong>12 niêu</strong>: 8 câu hỏi (10 điểm) + 2 niêu xú (+10đ/-10đ) + 2 niêu trống</li>
            <li>⏱️ <strong>10 giây</strong> suy nghĩ cho mỗi câu hỏi</li>
            <li>✅ Trả lời đúng: <strong>+10 điểm</strong></li>
            <li>❌ Trả lời sai: Câu hỏi chuyển sang đội kia, đội kia đúng được <strong>+5 điểm</strong></li>
            <li>🏆 Đội nhiều điểm hơn thắng cuộc!</li>
          </ul>
          
          <button className="btn primary btn-large" onClick={() => setShowPasswordPrompt(true)}>
            🎮 Bắt đầu trò chơi
          </button>
        </div>

        {/* Password Modal */}
        {showPasswordPrompt && (
          <div className="password-overlay">
            <div className="password-modal">
              <div className="password-icon">🔐</div>
              <h3>Nhập mật khẩu để bắt đầu</h3>
              <p>Vui lòng nhập mật khẩu được cung cấp bởi người điều khiển</p>
              <input
                type="password"
                className={`password-input ${passwordError ? 'error' : ''}`}
                placeholder="Nhập mật khẩu..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (passwordInput === gamePassword) {
                      setShowPasswordPrompt(false);
                      setPasswordInput('');
                      initializeGame();
                    } else {
                      setPasswordError(true);
                    }
                  }
                }}
                autoFocus
              />
              {passwordError && <p className="password-error-msg">❌ Mật khẩu không đúng!</p>}
              <div className="password-buttons">
                <button
                  className="btn secondary"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPasswordInput('');
                    setPasswordError(false);
                  }}
                >
                  Hủy
                </button>
                <button
                  className="btn primary"
                  onClick={() => {
                    if (passwordInput === gamePassword) {
                      setShowPasswordPrompt(false);
                      setPasswordInput('');
                      initializeGame();
                    } else {
                      setPasswordError(true);
                    }
                  }}
                >
                  🔓 Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  if (gameOver) {
    const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : null;
    
    // Play victory sound only once when game ends with a winner
    if (winner && !victorySoundPlayed) {
      setVictorySoundPlayed(true);
      setTimeout(() => playVictorySound(), 300);
    }
    
    return (
      <section id="game" className="container section">
        <div className="section-head">
          <div>
            <h2>🎉 Kết thúc trò chơi!</h2>
          </div>
        </div>
        
        <div className="game-over card">
          {/* Hiệu ứng confetti cho người chiến thắng */}
          {winner && (
            <div className="victory-celebration">
              <div className="confetti-rain">
                {[...Array(20)].map((_, i) => (
                  <span key={i} className="confetti-piece" style={{ animationDelay: `${i * 0.1}s`, left: `${Math.random() * 100}%` }}>🎊</span>
                ))}
              </div>
              <div className="crown-container">
                <span className="crown">👑</span>
              </div>
              <h2 className="victory-title">🏆 Đội {winner} Vô Địch! 🏆</h2>
              <p className="victory-subtitle">Xin chúc mừng nhà vua mới!</p>
            </div>
          )}
          
          <div className="final-scores">
            <div className={`team-score ${winner === 'A' ? 'winner king' : ''}`}>
              {winner === 'A' && <div className="king-crown">👑</div>}
              <h3>Đội A</h3>
              <div className="score-number">{scoreA}</div>
              {winner === 'A' && <div className="winner-badge">🎖️ Nhà Vua!</div>}
            </div>
            <div className={`team-score ${winner === 'B' ? 'winner king' : ''}`}>
              {winner === 'B' && <div className="king-crown">👑</div>}
              <h3>Đội B</h3>
              <div className="score-number">{scoreB}</div>
              {winner === 'B' && <div className="winner-badge">🎖️ Nhà Vua!</div>}
            </div>
          </div>
          
          {!winner && <p className="draw-message">🤝 Hòa! Cả hai đội đều xuất sắc!</p>}
          
          <button className="btn primary btn-large" onClick={initializeGame}>
            🔄 Chơi lại
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="game" className="container section">
      <div className="section-head">
        <div>
          <h2>Game Đập Niêu - Thi Đấu Trí Tuệ</h2>
          <p className="sub">Lượt của <strong>Đội {currentTeam}</strong></p>
        </div>
        <div className="pill pill-ghost">Đập niêu</div>
      </div>

      <div className="game-container">
        {/* Scoreboard */}
        <div className="scoreboard">
          <div className={`team-panel ${currentTeam === 'A' ? 'active' : ''}`}>
            <h3>Đội A</h3>
            <div className="score-display">{scoreA}</div>
          </div>
          <div className={`team-panel ${currentTeam === 'B' ? 'active' : ''}`}>
            <h3>Đội B</h3>
            <div className="score-display">{scoreB}</div>
          </div>
        </div>

        {/* Pots Board */}
        <div className="pots-board">
          {pots.map((pot) => (
            <button
              key={pot.id}
              className={`pot ${pot.opened ? 'opened' : ''} ${pot.openedBy ? `opened-by-${pot.openedBy}` : ''}`}
              onClick={() => handlePotClick(pot)}
              disabled={pot.opened || !!selectedPot}
            >
              {!pot.opened && (
                <div className="pot-content">
                  <span className="pot-icon">
                    <Image src="/images/nieu.png" alt="Pot Icon" width={50} height={50} />
                  </span>
                  <span className="pot-number">{pot.displayNumber}</span>
                </div>
              )}
              {pot.opened && pot.type === 'question' && <span className="pot-result">❓</span>}
              {pot.opened && pot.type === 'bonus' && <span className="pot-result">💰+10</span>}
              {pot.opened && pot.type === 'penalty' && <span className="pot-result">💔-10</span>}
              {pot.opened && pot.type === 'empty' && <span className="pot-result">🚫 Niêu trống</span>}
                            {/* Overlay cho niêu trống hình phạt */}
                            {selectedPot && selectedPot.type === 'empty' && (
                              <div className="special-pot-overlay empty-pot-flash">
                                <div className="special-pot-message">
                                  <div className="special-content" style={{textAlign: 'center'}}>
                                    <span className="special-icon empty-icon" style={{fontSize: '3rem', display: 'block', marginBottom: '12px'}}>🚫</span>
                                    <h2 style={{fontSize: '2.2rem', margin: 0}}>Niêu trống!</h2>
                                    <p>Đội {currentTeam} mất lượt. Đội {currentTeam === 'A' ? 'B' : 'A'} được chọn tiếp!</p>
                                  </div>
                                </div>
                              </div>
                            )}
                    {/* Overlay cho niêu trống */}
                    {/* Không còn overlay niêu trống */}
            </button>
          ))}
        </div>

        {/* Question Modal */}
        {selectedPot && selectedPot.type === 'question' && selectedPot.question && (
          <div className="question-modal">
            <div className="question-header">
              <h3>Câu hỏi #{selectedPot.question.id}</h3>
              {!questionLocked && (
                <div className={`timer ${timer <= 3 ? 'urgent' : ''}`}>
                  ⏱️ {timer}s
                </div>
              )}
            </div>

            {/* Prompt mở khóa câu hỏi */}
            {showUnlockPrompt && (
              <div className="unlock-prompt">
                <div className="locked-icon">🔒</div>
                <h3>Câu hỏi đã sẵn sàng!</h3>
                <p>Đội {currentTeam} hãy chuẩn bị. Bấm nút bên dưới để mở khóa câu hỏi và bắt đầu đếm giờ.</p>
                <button className="btn primary btn-unlock" onClick={handleUnlockQuestion}>
                  🔓 Mở khóa & Bắt đầu
                </button>
              </div>
            )}

            {/* Nội dung câu hỏi - chỉ hiện khi đã mở khóa */}
            {!questionLocked && (
              <>
                <p className="question-text">{selectedPot.question.question}</p>
            
                <div className="options">
                  {selectedPot.question.options.map((option, idx) => {
                    const isCorrectAnswer = idx === selectedPot.question!.correctAnswer;
                    const isSelectedAnswer = selectedAnswer === idx;
                    const answeredCorrectly = selectedAnswer === selectedPot.question!.correctAnswer;
                    // Chỉ hiện đáp án đúng khi: trả lời đúng HOẶC cả hai đội đều sai (isTransferring && sai)
                    const showCorrectAnswer = showResult && isCorrectAnswer && (answeredCorrectly || (isTransferring && !answeredCorrectly));
                    const showIncorrectAnswer = showResult && isSelectedAnswer && !answeredCorrectly;
                    
                    return (
                      <button
                        key={idx}
                        className={`option ${isSelectedAnswer ? 'selected' : ''} ${
                          showCorrectAnswer ? 'correct' : showIncorrectAnswer ? 'incorrect' : ''
                        }`}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={showResult}
                      >
                        <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                        <span className="option-text">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {showResult && (
                  <div className={`result-message ${selectedAnswer === selectedPot.question.correctAnswer ? 'correct' : 'incorrect'}`}>
                    {selectedAnswer === selectedPot.question.correctAnswer 
                      ? (isTransferring ? '✅ Đúng! +5 điểm' : '✅ Đúng! +10 điểm')
                      : (isTransferring ? '❌ Cả hai đội đều sai!' : '❌ Sai! Chuyển sang đội khác...')
                    }
                  </div>
                )}

                {/* Hiển thị khi hết giờ - chuyển câu hỏi sang đội khác */}
                {canTransfer && !showResult && (
                  <div className="timeout-transfer">
                    <div className="timeout-message">
                      ⏰ Đội {currentTeam} đã hết thời gian!
                    </div>
                    <button className="btn primary btn-transfer" onClick={handleTransferQuestion}>
                      🔄 Chuyển sang Đội {currentTeam === 'A' ? 'B' : 'A'} trả lời
                    </button>
                  </div>
                )}

                {/* Hiển thị khi đang là đội thứ 2 trả lời */}
                {isTransferring && !showResult && !canTransfer && (
                  <div className="transfer-notice">
                    🔄 Đội {currentTeam} có cơ hội trả lời! (Đúng +5 điểm)
                  </div>
                )}

                {!showResult && !canTransfer && selectedAnswer !== null && (
                  <button className="btn primary btn-submit" onClick={handleSubmitAnswer}>
                    ✅ Xác nhận đáp án
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Special Pot Message */}
        {selectedPot && (selectedPot.type === 'bonus' || selectedPot.type === 'penalty') && (
          <div className={`special-pot-overlay ${selectedPot.type === 'bonus' ? 'bonus-flash' : 'penalty-flash'}`}>
            <div className="special-pot-message">
              <div className="special-content">
                {selectedPot.type === 'bonus' && (
                  <>
                    <div className="confetti-container">
                      <span className="confetti">🎊</span>
                      <span className="confetti">✨</span>
                      <span className="confetti">🎉</span>
                      <span className="confetti">⭐</span>
                      <span className="confetti">🌟</span>
                    </div>
                    <span className="special-icon bonus-icon">🎁</span>
                    <h3 className="bonus-title">🎊 XÚ TÚI MÈ! 🎊</h3>
                    <p className="lucky-text">Thật là may mắn!</p>
                    <div className="bonus-points">+10 ĐIỂM</div>
                    <p className="team-congrats">Chúc mừng Đội {currentTeam}! 🎉</p>
                  </>
                )}
                {selectedPot.type === 'penalty' && (
                  <>
                    <span className="special-icon penalty-icon">💔</span>
                    <h3 className="penalty-title">Ôi không! Niêu đen đủi!</h3>
                    <div className="penalty-points">-10 ĐIỂM</div>
                    <p>Đội {currentTeam} bị trừ điểm!</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
