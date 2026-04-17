/**
 * Shared browser Speech Recognition type.
 * Used across voice-search, ai-chat-widget, and inline-voice-assistant.
 */
export type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous?: boolean;
  start: () => void;
  stop: () => void;
  onresult: (e: {
    resultIndex: number;
    results: Array<{ 0: { transcript: string }; isFinal: boolean }>;
  }) => void;
  onend: () => void;
  onerror: () => void;
};

/**
 * Window augmentation for cross-browser Speech Recognition constructors.
 */
export type SpeechRecognitionWindow = {
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  SpeechRecognition?: new () => SpeechRecognitionInstance;
};
