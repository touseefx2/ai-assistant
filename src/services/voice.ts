
export interface TranscriptionResponse {
  text?: string;
  transcript?: string;
  result?: string;
  [key: string]: unknown;
}

const getApiBaseUrl = (): string => {
  const raw = process.env.EXPO_PUBLIC_API_URL || "";
  if (!raw) {
    throw new Error(
      "Missing EXPO_PUBLIC_API_URL. Set it to your backend base URL (e.g., https://api.example.com)."
    );
  }
  return raw.replace(/\/$/, "");
};

export async function transcribeAudio(
  file: any,
): Promise<string> {
  const url = `${getApiBaseUrl()}/api/v1/voice/transcribe`;

  const form = new FormData();
  form.append("file", file);
  
  const response = await fetch(url, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Transcription failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as TranscriptionResponse;
  return (data.text as string) || (data.transcript as string) || (data.result as string) || "";
}


