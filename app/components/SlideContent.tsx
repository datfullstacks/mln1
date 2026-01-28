"use client";

import { useEffect, useRef, useState } from "react";
import { InteractiveMap } from "./InteractiveMap";

export type Slide = {
  id: string;
  title?: string;
  subtitle?: string;
  hideTitle?: boolean;
  layout: string;
  content: any;
  titleHighlight?: string;
  titleSuffix?: string;
};

type ModalCard = {
  region?: string;
  content?: string;
  images: string[];
};

type SlideContentProps = {
  slide: Slide;
  economyCultureView: "foundation" | "driver" | null;
  economyCultureSelectionBySlide: Record<string, "foundation" | "driver" | null>;
  onEconomyCultureChoice: (targetId: string, choice: "foundation" | "driver") => void;
  onOpenModal: (title: string, cards: ModalCard[]) => void;
  dropdownLeftOpen: boolean;
  dropdownRightOpen: boolean;
  onToggleDropdownLeft: () => void;
  onToggleDropdownRight: () => void;
  selectedFeature: number;
  onSelectFeature: (value: number) => void;
};

const hasContentText = (content: any): content is { text: string } =>
  typeof (content as { text?: unknown }).text === "string";

export function SlideContent({
  slide,
  economyCultureView,
  economyCultureSelectionBySlide,
  onEconomyCultureChoice,
  onOpenModal,
  dropdownLeftOpen,
  dropdownRightOpen,
  onToggleDropdownLeft,
  onToggleDropdownRight,
  selectedFeature,
  onSelectFeature,
}: SlideContentProps) {
  const { layout, content } = slide;

  switch (layout) {
    case "cover":
      return (
        <div className="layout-cover">
          {content.image && (
            <img
              src={content.image}
              alt={slide.title || "Cover"}
              className="cover-image"
            />
          )}
        </div>
      );

    case "title":
      return (
        <div
          className="layout-title"
          style={{
            display: content.image ? "grid" : "block",
            gridTemplateColumns: content.image ? "1fr 1fr" : "1fr",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {content.image && (
            <img
              src={content.image}
              alt={slide.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            />
          )}
          {Array.isArray(content.points) ? (
            <ul className="slide-points-list">
              {content.points.map((point: string, idx: number) => (
                <li key={idx} className="slide-point-item">
                  {point}
                </li>
              ))}
            </ul>
          ) : hasContentText(content) ? (
            <p className="text-large">{content.text}</p>
          ) : (
            <p className="text-lxl">{content.textLarge}</p>
          )}
        </div>
      );

    case "image-carousel":
      return <ImageCarouselLayout slide={slide} content={content} />;

    case "responsibility-list":
      return (
        <div style={{ width: "100%", color: "#111" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>
            {content.title}
          </h2>
          <ul style={{ margin: "0.6rem 0 0.35rem", paddingLeft: "1.25rem", lineHeight: 1.45 }}>
            {content.bullets?.map((bullet: string, idx: number) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                {bullet}
              </li>
            ))}
          </ul>
          {content.citation && (
            <div style={{ fontStyle: "italic", fontSize: "0.85rem", marginBottom: "0.6rem" }}>
              {content.citationUrl ? (
                <a
                  href={content.citationUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#2a7", textDecoration: "underline" }}
                >
                  {content.citation}
                </a>
              ) : (
                content.citation
              )}
            </div>
          )}

          <div style={{ fontWeight: 700, marginBottom: 6 }}>{content.exampleTitle}</div>
          <div style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 0, alignItems: "stretch" }}>
            <div style={{ background: content.accentColor || "#c40000", borderRadius: 2 }} />
            <div style={{ display: "grid", gap: 6 }}>
              {content.exampleItems?.map((item: string, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: content.rowBackground || "#f4e2d6",
                    padding: "6px 12px",
                    borderRadius: 2,
                    fontSize: "0.95rem",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "bullet-emphasis":
      return (
        <div style={{ width: "100%", color: "#111" }}>
          <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
            {content.title}
          </h2>
          <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem", lineHeight: 1.55 }}>
            {content.bullets?.map((bullet: string, idx: number) => {
              if (content.emphasisText && bullet.includes(content.emphasisText)) {
                const [before, after] = bullet.split(content.emphasisText);
                return (
                  <li key={idx} style={{ marginBottom: 10 }}>
                    {before}
                    <span style={{ fontStyle: "italic", fontWeight: 700 }}>{content.emphasisText}</span>
                    {after}
                  </li>
                );
              }

              return (
                <li key={idx} style={{ marginBottom: 10 }}>
                  {bullet}
                </li>
              );
            })}
          </ul>
        </div>
      );

    case "section-summary":
      return (
        <div style={{ width: "100%", color: "#111" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#d04a02",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {content.number}
            </div>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>{content.title}</h2>
          </div>

          {content.intro && <p style={{ margin: "0 0 16px", lineHeight: 1.6 }}>{content.intro}</p>}

          <div style={{ marginTop: 12 }}>
            {content.bullets?.map((bullet: string, idx: number) => (
              <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#d04a02", fontWeight: 700 }}>✓</span>
                <span style={{ lineHeight: 1.6 }}>{bullet}</span>
              </div>
            ))}
          </div>
          {content.notes?.length ? (
            <div style={{ marginTop: 16, fontStyle: "italic", fontSize: "0.95rem", opacity: 0.75 }}>
              {content.notes.map((note: string, idx: number) => (
                <div key={idx} style={{ marginBottom: 6 }}>
                  {note}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );

    case "tabs":
      return <TabsLayout content={content} />;

    case "economy-culture-choice":
      return (
        <EconomyCultureChoiceLayout
          content={content}
          economyCultureView={economyCultureView}
          onEconomyCultureChoice={onEconomyCultureChoice}
        />
      );

    case "economy-culture-detail":
      return (
        <EconomyCultureDetailLayout
          slideId={slide.id}
          content={content}
          economyCultureView={economyCultureView}
          economyCultureSelectionBySlide={economyCultureSelectionBySlide}
        />
      );

    case "impact-economy-culture":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div
            style={{
              background: "#eaf7f0",
              borderRadius: 18,
              padding: "1.5rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                background: "#d8f0e2",
                borderRadius: 14,
                padding: "0.9rem 1rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {content.positiveTitle}
            </div>
            {content.positive?.map((item: any, idx: number) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "0.9rem 1rem",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </div>
                {item.example && <div style={{ marginTop: 8, fontSize: "0.85rem", color: "#555" }}>{item.example}</div>}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#fdecec",
              borderRadius: 18,
              padding: "1.5rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                background: "#f8d7da",
                borderRadius: 14,
                padding: "0.9rem 1rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {content.negativeTitle}
            </div>
            {content.negative?.map((item: any, idx: number) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "0.9rem 1rem",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.text}
                </div>
                {item.example && <div style={{ marginTop: 8, fontSize: "0.85rem", color: "#555" }}>{item.example}</div>}
              </div>
            ))}
          </div>
        </div>
      );

    case "society-relation":
      return (
        <div
          style={{
            background: "#f7e8d9",
            borderRadius: 18,
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#c40000",
              marginBottom: "1rem",
              textShadow: "1px 1px 0 #fff",
            }}
          ></div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: "1.5rem",
              alignItems: "start",
            }}
          >
            <div>
              {content.hero?.image && (
                <img
                  src={content.hero.image}
                  alt={slide.title}
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    background: "#fff",
                    padding: 8,
                  }}
                />
              )}
            </div>
            <div>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{content.hero?.text}</p>
              <div
                style={{
                  marginTop: 12,
                  padding: "0.75rem 1rem",
                  background: "#f5d6d6",
                  color: "#b00000",
                  fontWeight: 700,
                  textAlign: "right",
                  borderRadius: 8,
                }}
              >
                {content.hero?.quote}
              </div>
              {content.hero?.note && (
                <div style={{ marginTop: 8, fontSize: "0.85rem", fontStyle: "italic" }}>
                  {content.hero.noteUrl ? (
                    <a
                      href={content.hero.noteUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2a7", textDecoration: "underline" }}
                    >
                      {content.hero.note}
                    </a>
                  ) : (
                    content.hero.note
                  )}
                </div>
              )}
            </div>
          </div>

          {content.intro && <div style={{ marginTop: "1rem", fontWeight: 600 }}>{content.intro}</div>}

          <div
            style={{
              marginTop: "1.25rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
          >
            <div>
              <div
                style={{
                  background: "#f1c4c4",
                  borderRadius: 12,
                  padding: "0.75rem 1rem",
                  fontWeight: 800,
                  color: "#b00000",
                  textAlign: "center",
                  marginBottom: "0.75rem",
                }}
              >
                {content.leftBox?.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                {content.leftBox?.points?.map((point: string, idx: number) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: 6,
                      listStyleType: point.startsWith("⇒") ? "none" : "disc",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                style={{
                  background: "#f1c4c4",
                  borderRadius: 12,
                  padding: "0.75rem 1rem",
                  fontWeight: 800,
                  color: "#b00000",
                  textAlign: "center",
                  marginBottom: "0.75rem",
                }}
              >
                {content.rightBox?.title}
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                {content.rightBox?.points?.map((point: string, idx: number) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: 6,
                      listStyleType: point.startsWith("⇒") ? "none" : "disc",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {content.lifeNew && (
            <div
              style={{
                marginTop: "1.5rem",
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "1rem",
                alignItems: "center",
                background: "#fff",
                borderRadius: 12,
                padding: "1rem",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={content.lifeNew.image}
                alt="Đời sống mới"
                style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
              />
              <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                {content.lifeNew.text}
                {content.lifeNew.url && (
                  <div style={{ marginTop: 8 }}>
                    <a
                      href={content.lifeNew.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2a7", textDecoration: "underline", fontSize: "0.9rem" }}
                    >
                      (Xem thêm chi tiết tại đây)
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );

    case "cultural-identity":
      return (
        <div
          style={{
            background: "#f7e8d9",
            borderRadius: 18,
            padding: "1.5rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ marginTop: 0, lineHeight: 1.5 }}>{content.intro}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "1.5rem",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <img
              src={content.top?.image}
              alt="Bản sắc văn hóa dân tộc"
              style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
            />
            <div>
              <div style={{ fontWeight: 800, color: "#c40000", marginBottom: 6 }}>{content.top?.title}</div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#c40000" }}>
                {content.top?.points?.map((point: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "1.5rem",
              alignItems: "center",
              marginTop: "1.5rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 800, color: "#c40000", marginBottom: 6 }}>{content.bottom?.title}</div>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#c40000" }}>
                {content.bottom?.points?.map((point: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <img
              src={content.bottom?.image}
              alt="Văn hóa truyền thống"
              style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
            />
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="layout-quote">
          {content.intro && <p className="quote-intro">{content.intro}</p>}

          {content.highlightText ? (
            <div className="quote-highlight-box">
              <p className="quote-highlight-text">{content.highlightText}</p>
            </div>
          ) : (
            <blockquote>
              <p className="quote-text">"{content.quote}"</p>
              {content.author && <footer className="quote-author">{content.author}</footer>}
            </blockquote>
          )}

          {content.outro && <p className="quote-outro">{content.outro}</p>}
          {content.citation && <p className="quote-citation">{content.citation}</p>}

          {content.image && (
            <div className="quote-image-wrapper">
              <figure style={{ margin: 0 }}>
                <img src={content.image} alt="" className="quote-image" />
                {content.imageCaption && (
                  <figcaption className="quote-image-caption">{content.imageCaption}</figcaption>
                )}
              </figure>
            </div>
          )}
        </div>
      );

    case "conclusion":
      return (
        <div className="layout-conclusion">
          <p className="conclusion-summary">{content.summary}</p>
          <div className="key-points">
            <h3>Điểm chính:</h3>
            <ul>
              {content.keyPoints?.map((point: string) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <p className="next-steps">{content.nextSteps}</p>
        </div>
      );

    case "big-title":
      return (
        <div className="layout-big-title">
          <h2 className="big-main-text">{content.mainText}</h2>
          {content.subText && <p className="big-sub-text">{content.subText}</p>}
        </div>
      );

    case "interactive-map":
      return <InteractiveMap />;

    case "highlight":
      return (
        <div className="layout-highlight">
          {content.boxes?.map((box: any) => (
            <div
              key={box.title}
              className="highlight-box"
              onClick={() => {
                onOpenModal(box.title, box.cards);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="highlight-icon">
                {box.icon?.startsWith("/") ? (
                  <img src={box.icon} alt={box.title} className="highlight-icon-img" />
                ) : (
                  box.icon
                )}
              </div>
              <h4>{box.title}</h4>
              <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>Click để xem chi tiết</p>
            </div>
          ))}
        </div>
      );

    case "consciousness-structure":
      return (
        <div className="consciousness-structure-layout">
          <h2 className="consciousness-main-title">{content.mainTitle}</h2>

          {content.rows?.map((row: any, idx: number) => (
            <div key={idx} className="consciousness-row">
              <div className="consciousness-box consciousness-left">
                <h3 className="consciousness-box-title">{row.left.title}</h3>
                <p className="consciousness-box-desc">{row.left.description}</p>
              </div>

              <div className="consciousness-arrow">→</div>

              <div className={`consciousness-box consciousness-right ${row.right.highlighted ? "highlighted" : ""}`}>
                <h3 className="consciousness-box-title">{row.right.title}</h3>
                <p className="consciousness-box-desc">{row.right.description}</p>
              </div>
            </div>
          ))}

          {content.footer && <p className="consciousness-footer">{content.footer}</p>}
        </div>
      );

    case "fields-list":
      return (
        <div className="fields-list-layout">
          <h2 className="fields-main-title">{content.mainTitle}</h2>
          <p className="fields-subtitle">{content.subtitle}</p>

          <ul className="fields-list">
            {content.fields?.map((field: any, idx: number) => (
              <li key={idx} className="field-item">
                <span className="field-title">{field.title}</span>
                <span className="field-description">{field.description}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "class-nature":
      return (
        <div className="class-nature-layout">
          <h2 className="class-nature-title">{content.mainTitle}</h2>

          <div className="class-nature-sections">
            {content.sections?.map((section: any, idx: number) => (
              <div key={idx} className="class-section">
                <h3 className="class-section-title">{section.title}</h3>
                <p className="class-section-description">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "dialectic-hero":
      return (
        <div className="dialectic-hero-layout">
          <div className="dialectic-hero-background" style={{ backgroundImage: `url(${content.image})` }}>
            <div className="dialectic-hero-overlay"></div>
          </div>

          <div className="dialectic-hero-content">
            <span className="dialectic-label">{content.label}</span>

            <h1 className="dialectic-hero-title">
              {content.mainTitle}
              <br />
              <span className="dialectic-highlight dialectic-highlight-1">{content.titleHighlight1}</span>
              {" và "}
              <span className="dialectic-highlight dialectic-highlight-2">{content.titleHighlight2}</span>
            </h1>

            <blockquote className="dialectic-hero-quote">{content.quote}</blockquote>
          </div>
        </div>
      );

    case "schema-diagram":
      return (
        <div className="schema-diagram-layout">
          <h2 className="schema-main-title">{content.mainTitle}</h2>

          <div className="schema-boxes">
            <div className="schema-box schema-left">
              <h3 className="schema-box-title">{content.leftBox.title}</h3>
              <p className="schema-box-subtitle">{content.leftBox.subtitle}</p>
              <p className="schema-box-description">{content.leftBox.description}</p>
            </div>

            <div className="schema-arrows">
              {content.relationships?.map((rel: any, idx: number) => (
                <div key={idx} className={`schema-arrow schema-arrow-${rel.direction}`}>
                  <div className="arrow-line">
                    {rel.direction === "right" && <span className="arrow-symbol">→</span>}
                    {rel.direction === "left" && <span className="arrow-symbol">←</span>}
                    {rel.direction === "both" && <span className="arrow-symbol">↻</span>}
                  </div>
                  <span className="arrow-label">{rel.label}</span>
                </div>
              ))}
            </div>

            <div className="schema-box schema-right">
              <h3 className="schema-box-title">{content.rightBox.title}</h3>
              <p className="schema-box-subtitle">{content.rightBox.subtitle}</p>
              <p className="schema-box-description">{content.rightBox.description}</p>
            </div>
          </div>
        </div>
      );

    case "interactive-dropdown":
      return (
        <div className="interactive-dropdown-layout">
          <div className="dropdown-buttons-container">
            <div className="dropdown-wrapper dropdown-left">
              <button className="dropdown-trigger" onClick={onToggleDropdownLeft}>
                {content.leftButton.title}
              </button>
              {dropdownLeftOpen && (
                <div className="dropdown-menu dropdown-menu-left">
                  {content.leftButton.items?.map((item: any, idx: number) => (
                    <div key={idx} className="dropdown-item-wrapper">
                      <div className="dropdown-item">{item.title}</div>
                      <div className="dropdown-tooltip dropdown-tooltip-left">{item.tooltip}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-wrapper dropdown-right">
              <button className="dropdown-trigger" onClick={onToggleDropdownRight}>
                {content.rightButton.title}
              </button>
              {dropdownRightOpen && (
                <div className="dropdown-menu dropdown-menu-right">
                  {content.rightButton.items?.map((item: any, idx: number) => (
                    <div key={idx} className="dropdown-item-wrapper">
                      <div className="dropdown-item">{item.title}</div>
                      <div className="dropdown-tooltip dropdown-tooltip-right">{item.tooltip}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case "comprehensive-independence":
      return (
        <div className="comprehensive-independence-layout">
          <div className="independence-two-column">
            <div className="independence-sidebar">
              {content.features?.map((feature: any) => (
                <div
                  key={feature.number}
                  className={`sidebar-feature-item ${selectedFeature === parseInt(feature.number) ? "active" : ""}`}
                  onClick={() => onSelectFeature(parseInt(feature.number))}
                >
                  <div className="sidebar-feature-number">{feature.number}</div>
                  <h3 className="sidebar-feature-title">{feature.title}</h3>
                </div>
              ))}
            </div>

            <div className="independence-content-area">
              {content.features?.map(
                (feature: any) =>
                  selectedFeature === parseInt(feature.number) && (
                    <div key={feature.number} className="feature-content-display">
                      <div className="feature-content-header">
                        <div className="feature-content-number">{feature.number}</div>
                        <h2 className="feature-content-title">{feature.title}</h2>
                      </div>

                      {feature.reasons && (
                        <div className="feature-reasons">
                          {feature.reasons.map((reason: any, idx: number) => (
                            <div key={idx} className="feature-reason-item">
                              <div className="feature-reason-label">{reason.label}</div>
                              <p className="feature-reason-text">{reason.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {feature.quote && !feature.points && (
                        <div className="feature-forward">
                          <blockquote className="feature-quote">{feature.quote}</blockquote>
                          <p className="feature-explanation">{feature.explanation}</p>
                          <div className="feature-example">{feature.example}</div>
                        </div>
                      )}

                      {feature.points && (
                        <div className="feature-inheritance">
                          <blockquote className="feature-quote feature-quote-purple">{feature.quote}</blockquote>
                          <p className="feature-explanation">{feature.explanation}</p>
                          <ul className="feature-points">
                            {feature.points.map((point: any, idx: number) => (
                              <li key={idx} className="feature-point">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      );

    case "interaction-layout":
      return (
        <div className="interaction-layout">
          <div className="interaction-main-text">{content.mainText}</div>

          <div className="interaction-feature-box">
            <h3 className="interaction-feature-title">{content.feature.title}</h3>
            <p className="interaction-feature-description">{content.feature.description}</p>
          </div>

          <div className="interaction-examples">
            <div className="interaction-examples-label">Ví dụ:</div>
            <div className="interaction-examples-grid">
              {content.examples?.map((example: any, idx: number) => (
                <div key={idx} className="interaction-example-card">
                  <div className="example-era">{example.era}</div>
                  <div className="example-dominant">{example.dominant}</div>
                  <div className="example-description">{example.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "action-reaction-layout":
      return (
        <div className="action-reaction-layout">
          <div className="action-reaction-grid">
            <div className="action-box positive-box">
              <div className="action-icon-circle positive-icon">{content.leftBox.icon}</div>
              <h2 className="action-title positive-title">{content.leftBox.title}</h2>
              <div className="action-subtitle">{content.leftBox.subtitle}</div>
              <p className="action-description">{content.leftBox.description}</p>

              <div className="action-highlight positive-highlight">{content.leftBox.highlight}</div>

              <ul className="action-points">
                {content.leftBox.points.map((point: any, idx: number) => (
                  <li key={idx} className="action-point positive-point">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="action-box negative-box">
              <div className="action-icon-circle negative-icon">{content.rightBox.icon}</div>
              <h2 className="action-title negative-title">{content.rightBox.title}</h2>
              <div className="action-subtitle">{content.rightBox.subtitle}</div>
              <p className="action-description">{content.rightBox.description}</p>

              <div className="action-highlight negative-highlight">{content.rightBox.highlight}</div>

              <ul className="action-points">
                {content.rightBox.points.map((point: any, idx: number) => (
                  <li key={idx} className="action-point negative-point">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return <p>Nội dung slide</p>;
  }
}

type TabsLayoutProps = {
  content: any;
};

function TabsLayout({ content }: TabsLayoutProps) {
  const tabs = content?.tabs || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs.length) {
    return null;
  }

  const activeTab = tabs[Math.min(activeIndex, tabs.length - 1)];

  return (
    <div className="layout-tabs">
      <div className="tabs-header">
        {tabs.map((tab: any, idx: number) => (
          <button
            key={tab.title || idx}
            type="button"
            className={idx === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(idx)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab?.text && <p>{activeTab.text}</p>}
        {content?.citation && (
          <p style={{ marginTop: "0.75rem", fontStyle: "italic", opacity: 0.75 }}>
            {content.citation}
          </p>
        )}
      </div>
      {(content?.extraTitle || content?.extraText || content?.extraQuote) && (
        <div className="tab-content" style={{ marginTop: "1.5rem" }}>
          {content?.extraTitle && <h3>{content.extraTitle}</h3>}
          {content?.extraText && <p>{content.extraText}</p>}
          {content?.extraQuote && (
            <div style={{ marginTop: "0.75rem" }}>
              <p style={{ fontStyle: "italic", margin: 0 }}>{content.extraQuote}</p>
              {content?.extraQuoteAuthor && (
                <p
                  style={{
                    margin: "0.4rem 0 0",
                    fontWeight: 600,
                    opacity: 0.8,
                    textAlign: "right",
                  }}
                >
                  {content.extraQuoteAuthor}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type ImageCarouselLayoutProps = {
  slide: Slide;
  content: any;
};

function ImageCarouselLayout({ slide, content }: ImageCarouselLayoutProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [maxCarouselHeight, setMaxCarouselHeight] = useState(0);
  const pointRefs = useRef<Array<HTMLDivElement | null>>([]);
  const points = content.points || [];
  const currentPoint = points[carouselIndex] || {};
  const currentImage = currentPoint?.image || content.image;
  const hasImage = Boolean(currentImage);
  const indicatorHeight = 48;
  const hasConclusion = Boolean(currentPoint?.conclusion);

  const renderPointContent = (point: any) => {
    const citationText = point?.citation || content?.citation;

    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <p className="slide-point-item" style={{ fontSize: "1.15rem", minHeight: 60, textAlign: "center", margin: 0 }}>
          {point?.text || point}
        </p>
        {citationText && (
          <p className="slide-point-item" style={{ fontSize: "0.95rem", textAlign: "center", margin: 0, opacity: 0.75 }}>
            {citationText}
          </p>
        )}
        {point?.conclusion && (
          <div
            className="carousel-conclusion"
            style={{
              paddingTop: 24,
              color: "#2a7",
              fontWeight: 500,
              fontStyle: "italic",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                background: "#f6faf7",
                borderRadius: 12,
                padding: "18px 22px 14px 22px",
                border: "1px solid #e0eee5",
                maxWidth: 420,
                width: "100%",
                textAlign: "center",
              }}
            >
              {point.conclusion}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = pointRefs.current.map((el) => el?.offsetHeight || 0);
      const maxHeight = heights.length ? Math.max(...heights) : 0;
      setMaxCarouselHeight(maxHeight);
    };

    calculateMaxHeight();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", calculateMaxHeight);
      return () => window.removeEventListener("resize", calculateMaxHeight);
    }

    return undefined;
  }, [points]);

  return (
    <div
      className="layout-image-carousel"
      style={{
        display: "grid",
        gridTemplateColumns: hasImage ? "1fr 1fr" : "1fr",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      {hasImage && (
        <div>
          <img
            src={currentImage}
            alt={slide.title}
            className="image-carousel-photo"
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      )}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        {points.length > 0 && (
          <div className="carousel-container" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
            <div className="carousel-track" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="carousel-card active" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: "100%",
                    minHeight: maxCarouselHeight ? `${maxCarouselHeight + indicatorHeight}px` : undefined,
                    transition: "min-height 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: hasConclusion ? "flex-start" : "center",
                    position: "relative",
                    paddingBottom: indicatorHeight,
                  }}
                >
                  {renderPointContent(currentPoint)}
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: indicatorHeight,
                      height: indicatorHeight,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, height: 32, alignItems: "center" }}>
                      {points.map((point: any, idx: number) => {
                        const pointTitle =
                          typeof point === "string"
                            ? point
                            : typeof point?.text === "string"
                              ? point.text
                              : "";

                        return (
                          <span
                            key={idx}
                            onClick={() => setCarouselIndex(idx)}
                            style={{
                              display: "inline-block",
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              background: idx === carouselIndex ? "#2a7" : "#ccc",
                              transition: "background 0.2s",
                              cursor: "pointer",
                              border: idx === carouselIndex ? "2px solid #2a7" : "1px solid #ccc",
                            }}
                            title={pointTitle || `Xem nội dung ${idx + 1}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ position: "absolute", visibility: "hidden", pointerEvents: "none", width: "100%", left: 0, top: 0, zIndex: -1 }}>
          {points.map((point: any, idx: number) => (
            <div
              key={`measure-${idx}`}
              ref={(el) => {
                pointRefs.current[idx] = el;
              }}
              style={{ width: "100%" }}
            >
              {renderPointContent(point)}
            </div>
          ))}
        </div>
        {content.conclusion && !currentPoint.conclusion && (
          <div
            className="carousel-conclusion"
            style={{ marginTop: 32, color: "#2a7", fontWeight: 500, fontStyle: "italic", width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div style={{ background: "#f6faf7", borderRadius: 12, padding: "16px 24px", border: "1px solid #e0eee5", maxWidth: 480, width: "100%", textAlign: "center" }}>
              Rút ra: {content.conclusion}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type EconomyCultureChoiceLayoutProps = {
  content: any;
  economyCultureView: "foundation" | "driver" | null;
  onEconomyCultureChoice: (targetId: string, choice: "foundation" | "driver") => void;
};

function EconomyCultureChoiceLayout({ content, economyCultureView, onEconomyCultureChoice }: EconomyCultureChoiceLayoutProps) {
  if (!content?.left || !content?.right) {
    return null;
  }
  const targetId = content?.targetId || "slide-3b";
  const disableLeft = Boolean(content?.disableLeft);
  const disableRight = Boolean(content?.disableRight);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 1fr", alignItems: "center", gap: "1.5rem" }}>
      <button
        type="button"
        disabled={economyCultureView === "foundation" || disableLeft}
        onClick={() => {
          onEconomyCultureChoice(targetId, "foundation");
        }}
        style={{
          border: "2px solid #d7d7d7",
          borderRadius: 16,
          padding: "1.25rem 1.5rem",
          background: economyCultureView === "foundation" ? "#f1f8f4" : "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: economyCultureView === "foundation" || disableLeft ? "not-allowed" : "pointer",
          textAlign: "left",
          transition: "all 0.2s",
          opacity: economyCultureView === "foundation" || disableLeft ? 0.6 : 1,
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{content.left.title}</h3>
        <p style={{ margin: "0.35rem 0 0", fontWeight: 600, color: "#2a7" }}>{content.left.subtitle}</p>
        <p style={{ margin: "0.5rem 0 0", color: "#555" }}>{content.left.description}</p>
      </button>

      <div style={{ textAlign: "center", color: "#666" }}>
        <div style={{ fontWeight: 700 }}>↔</div>
        <div style={{ fontSize: "0.85rem", marginTop: 8 }}>(2 chiều)</div>
      </div>

      <button
        type="button"
        disabled={economyCultureView === "driver" || disableRight}
        onClick={() => {
          onEconomyCultureChoice(targetId, "driver");
        }}
        style={{
          border: "2px solid #d7d7d7",
          borderRadius: 16,
          padding: "1.25rem 1.5rem",
          background: economyCultureView === "driver" ? "#f1f8f4" : "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: economyCultureView === "driver" || disableRight ? "not-allowed" : "pointer",
          textAlign: "left",
          transition: "all 0.2s",
          opacity: economyCultureView === "driver" || disableRight ? 0.6 : 1,
        }}
      >
        <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{content.right.title}</h3>
        <p style={{ margin: "0.35rem 0 0", fontWeight: 600, color: "#2a7" }}>{content.right.subtitle}</p>
        <p style={{ margin: "0.5rem 0 0", color: "#555" }}>{content.right.description}</p>
      </button>
    </div>
  );
}

type EconomyCultureDetailLayoutProps = {
  slideId: string;
  content: any;
  economyCultureView: "foundation" | "driver" | null;
  economyCultureSelectionBySlide: Record<string, "foundation" | "driver" | null>;
};

function EconomyCultureDetailLayout({
  slideId,
  content,
  economyCultureView,
  economyCultureSelectionBySlide,
}: EconomyCultureDetailLayoutProps) {
  const [evidenceIndex, setEvidenceIndex] = useState(0);
  const activeKey = economyCultureSelectionBySlide[slideId] || null;
  const activeContent = activeKey ? content[activeKey] : null;
  const evidences = activeContent?.evidences || [];
  const evidencePages: Array<typeof evidences> = [];

  for (let i = 0; i < evidences.length; i += 2) {
    evidencePages.push(evidences.slice(i, i + 2));
  }

  useEffect(() => {
    setEvidenceIndex(0);
  }, [economyCultureView]);

  if (!activeContent) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          background: "#f7f7f7",
          borderRadius: 16,
          border: "1px dashed #ccc",
          color: "#666",
        }}
      >
        Hãy chọn “Kinh tế là nền tảng” hoặc “Văn hóa là động lực” ở slide trước để xem nội dung.
      </div>
    );
  }

  const currentEvidencePage = evidencePages[evidenceIndex] || [];
  const currentSummary = activeContent.summaries?.[evidenceIndex];
  const hasMultipleEvidencePages = evidencePages.length > 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <blockquote style={{ fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>
        “{activeContent.quote}”
      </blockquote>
      <div style={{ fontStyle: "italic", color: "#666" }}>{activeContent.citation}</div>
      <div style={{ background: "#f3f3f3", padding: "1rem 1.25rem", borderRadius: 12 }}>{activeContent.description}</div>

      <h3 style={{ margin: "0.5rem 0 0" }}>Dẫn chứng thực tế:</h3>

      <div style={{ background: "#f0f0f0", borderRadius: 16, padding: "1.25rem", border: "1px solid #e0e0e0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {hasMultipleEvidencePages && (
            <button
              type="button"
              onClick={() => setEvidenceIndex((prev) => (prev === 0 ? evidencePages.length - 1 : prev - 1))}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              ‹
            </button>
          )}

          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
            {currentEvidencePage.map((item: any, idx: number) => (
              <figure key={idx} style={{ margin: 0, background: "#fff", borderRadius: 12, padding: "0.75rem" }}>
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }}
                />
                <figcaption style={{ fontSize: "0.85rem", marginTop: 8, color: "#444" }}>{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          {hasMultipleEvidencePages && (
            <button
              type="button"
              onClick={() => setEvidenceIndex((prev) => (prev === evidencePages.length - 1 ? 0 : prev + 1))}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #ccc",
                background: "#fff",
                cursor: "pointer",
                fontSize: "1.2rem",
              }}
            >
              ›
            </button>
          )}
        </div>

        {currentEvidencePage.some((item: any) => item.url) &&
          (currentEvidencePage.filter((item: any) => item.url).length === 1 ? (
            <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
              <a
                href={currentEvidencePage.find((item: any) => item.url)?.url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#2a7", textDecoration: "underline", fontSize: "0.85rem" }}
              >
                (Xem thêm chi tiết tại đây)
              </a>
            </div>
          ) : (
            <div
              style={{
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: `repeat(${currentEvidencePage.length}, minmax(0, 1fr))`,
                gap: "1rem",
              }}
            >
              {currentEvidencePage.map((item: any, idx: number) => (
                <div key={item.url || idx} style={{ textAlign: "center" }}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#2a7", textDecoration: "underline", fontSize: "0.85rem" }}
                    >
                      (Xem thêm chi tiết tại đây)
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          ))}

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          {evidencePages.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setEvidenceIndex(idx)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: idx === evidenceIndex ? "#2a7" : "#cfcfcf",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {currentSummary && (
          <div
            style={{
              marginTop: 12,
              background: "#111",
              color: "#fff",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.95rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>➜</span>
            <span>{currentSummary}</span>
          </div>
        )}
      </div>
    </div>
  );
}
