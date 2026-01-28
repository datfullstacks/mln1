"use client";

import type { ReactNode } from "react";

type ModalCard = {
  region?: string;
  content?: string;
  images: string[];
  imageCaptions?: string[];
};

type ModalContent = {
  title: string;
  cards: ModalCard[];
};

type PresentationModalProps = {
  open: boolean;
  content: ModalContent | null;
  currentCardIndex: number;
  conclusionText: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function PresentationModal({
  open,
  content,
  currentCardIndex,
  conclusionText,
  onClose,
  onPrev,
  onNext,
}: PresentationModalProps) {
  if (!open || !content) {
    return null;
  }

  const isVanNghe = content.title === "Văn hoá văn nghệ";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content modal-carousel${isVanNghe ? " van-nghe-modal" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal-title">{content.title}</h2>

        <div className="carousel-container">
          <button className="carousel-btn carousel-prev" onClick={onPrev}>
            ‹
          </button>

          <div className="carousel-track">
            {content.cards.map((card, idx) => {
              const regionLabel = card.region ?? "";
              const description = card.content ?? "";
              const altPrefix = regionLabel || content.title;

              return (
                <div
                  key={idx}
                  className={`carousel-card ${
                    idx === currentCardIndex
                      ? "active"
                      : idx < currentCardIndex
                        ? "left"
                        : "right"
                  }`}
                >
                  {regionLabel && <h3 className="carousel-card-region">{regionLabel}</h3>}

                  {card.images && card.images.length > 0 && (
                    <div
                      className={`carousel-images${
                        card.images.length === 1
                          ? " single-image"
                          : card.images.length === 2
                            ? " double-image"
                            : ""
                      }`}
                    >
                      {card.images.map((img, imgIdx) => (
                        <figure key={imgIdx} style={{ margin: 0 }}>
                          <img
                            src={img}
                            alt={`${altPrefix} ${imgIdx + 1}`}
                            className="carousel-image"
                          />
                          {card.imageCaptions?.[imgIdx] && (
                            <figcaption style={{ fontSize: "0.8rem", marginTop: 6, textAlign: "center", color: "#666" }}>
                              {card.imageCaptions[imgIdx]}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}

                  {description && <p className="carousel-card-content">{description}</p>}
                </div>
              );
            })}
          </div>

          <button className="carousel-btn carousel-next" onClick={onNext}>
            ›
          </button>
        </div>

        {conclusionText && (
          <div className="carousel-conclusion">
            <p className="conclusion-text">{conclusionText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
