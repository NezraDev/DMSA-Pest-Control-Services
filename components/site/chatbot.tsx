"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";

import {
  chatbotSuggestions,
  chatbotWelcome,
  getChatbotReply,
  type ChatAction,
  type ChatReply,
} from "@/data/chatbot-knowledge";
import styles from "./chatbot.module.css";

type Message = ChatReply & {
  id: string;
  role: "assistant" | "user";
};

function ActionLink({ action }: { action: ChatAction }) {
  const content = (
    <>
      <span>{action.label}</span>
      <ArrowUpRight aria-hidden="true" size={15} />
    </>
  );

  return action.href.startsWith("/") ? (
    <Link className={styles.action} href={action.href}>
      {content}
    </Link>
  ) : (
    <a className={styles.action} href={action.href}>
      {content}
    </a>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const assistant = message.role === "assistant";
  return (
    <article className={`${styles.message} ${assistant ? styles.assistant : styles.user}`}>
      {assistant ? (
        <span className={styles.avatar} aria-hidden="true">
          <MessageCircle size={14} />
        </span>
      ) : null}
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        {message.actions.length > 0 ? (
          <div className={styles.actions}>
            {message.actions.map((action) => (
              <ActionLink key={`${action.label}-${action.href}`} action={action} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Chatbot() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", ...chatbotWelcome },
  ]);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageCounter = useRef(0);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (!open || !log) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    log.scrollTo({ top: log.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, open, typing]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  function sendQuestion(value = question) {
    const text = value.trim();
    if (!text || typing) return;

    messageCounter.current += 1;
    const userMessage: Message = {
      id: `user-${messageCounter.current}`,
      role: "user",
      text,
      actions: [],
    };
    const reply = getChatbotReply(text);
    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setTyping(true);

    timeoutRef.current = setTimeout(() => {
      messageCounter.current += 1;
      const assistantMessage: Message = {
        id: `assistant-${messageCounter.current}`,
        role: "assistant",
        ...reply,
      };
      setMessages((current) => [...current, assistantMessage]);
      setTyping(false);
      timeoutRef.current = null;
    }, 4000);
  }

  function closeChat() {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.widget}>
      {open ? (
        <section
          className={styles.panel}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
        >
          <header className={styles.header}>
            <span className={styles.brandmark} aria-hidden="true">
              <MessageCircle size={19} />
            </span>
            <div className={styles.heading}>
              <h2 id={`${panelId}-title`}>DMSA Quick Answers</h2>
              <p>Automated answers from our service guide</p>
            </div>
            <button className={styles.close} type="button" onClick={closeChat} aria-label="Close chat">
              <X size={19} />
            </button>
          </header>

          <div className={styles.log} ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {typing ? (
              <div className={styles.typingRow} role="status" aria-label="DMSA Quick Answers is typing">
                <span className={styles.avatar} aria-hidden="true"><MessageCircle size={14} /></span>
                <div className={styles.typingBubble} aria-hidden="true">
                  <span>Typing</span>
                  <i /><i /><i />
                </div>
                <span className={styles.srOnly}>Preparing a reply</span>
              </div>
            ) : null}
            {messages.length === 1 ? (
              <div className={styles.suggestions} aria-label="Suggested questions">
                {chatbotSuggestions.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => sendQuestion(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            className={styles.composer}
            onSubmit={(event) => {
              event.preventDefault();
              sendQuestion();
            }}
          >
            <label className={styles.srOnly} htmlFor={inputId}>Ask DMSA a question</label>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={500}
              placeholder="Type your question…"
              autoComplete="off"
            />
            <button className={styles.send} type="submit" aria-label="Send question" disabled={!question.trim() || typing}>
              <Send size={17} />
            </button>
          </form>
          <p className={styles.note}>For details I can’t confirm, call, Viber, or email the DMSA team.</p>
        </section>
      ) : null}

      <button
        ref={toggleRef}
        className={styles.launcher}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close DMSA Quick Answers" : "Open DMSA Quick Answers"}
      >
        {open ? <X size={22} /> : <MessageCircle size={23} />}
        {!open ? <span>Ask DMSA</span> : null}
      </button>
    </div>
  );
}
