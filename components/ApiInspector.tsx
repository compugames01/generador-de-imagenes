import React, { useState, useCallback } from 'react';
import { Loader } from './Loader';
import { sendRawApiRequest } from '../services/geminiService';

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AIzaSyBADD7pgxBJmeBJ6QUcckqTSNgYZ7cBw9Y' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
 }'

const JsonViewer: React.FC<{ jsonString: string }> = ({ jsonString }) => {
    const syntaxHighlight = (json: string) => {
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-green-400'; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-cyan-400'; // key
          } else {
            cls = 'text-yellow-400'; // string
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-purple-400'; // boolean
        } else if (/null/.test(match)) {
          cls = 'text-gray-500'; // null
        }
        return `<span class="${cls}">${match}</span>`;
      });
    };
  
    return (
        <pre 
            className="text-left text-sm whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonString) }} 
        />
    );
};


export const ApiInspector: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('Explain how AI works in a few words');
    const [apiResponse, setApiResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSendRequest = useCallback(async () => {
        if (!prompt) {
          setError('Por favor, introduce un prompt.');
          return;
        }
    
        setIsLoading(true);
        setError('');
        setApiResponse(null);
    
        try {
          const response = await sendRawApiRequest(prompt);
          setApiResponse(JSON.stringify(response, null, 2));
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
          setError(errorMessage);
          setApiResponse(null);
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }, [prompt]);

    return (
        <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
            <div className="w-full text-center">
                <h2 className="font-orbitron text-3xl text-cyan-300 neon-text">Inspector de API de Gemini</h2>
                <p className="mt-2 text-gray-400">
                    Envía una petición directa a `generateContent` y examina la respuesta completa.
                </p>
            </div>
            
            {/* cURL Example */}
            <div className="w-full bg-gray-900/50 border neon-border rounded-lg p-4">
                <h3 className="font-orbitron text-lg text-cyan-400 mb-2">Ejemplo de Petición (`curl`)</h3>
                <pre className="bg-black/50 p-3 rounded-md text-xs text-gray-300 overflow-x-auto">
                    <code>{curlExample}</code>
                </pre>
            </div>

            {/* Prompt Input */}
            <div className="w-full space-y-2">
                <label htmlFor="prompt-input" className="font-orbitron text-lg text-cyan-400">Contenido del Prompt</label>
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Escribe tu prompt aquí..."
                  className="w-full h-24 bg-gray-900/50 border neon-border rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  disabled={isLoading}
                />
            </div>

            <button
              onClick={handleSendRequest}
              disabled={!prompt || isLoading}
              className="w-full max-w-xs font-orbitron text-lg bg-cyan-500/20 border-2 neon-border text-cyan-300 font-bold py-3 px-6 rounded-md transition-all duration-300 ease-in-out enabled:hover:bg-cyan-500/40 enabled:btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader small={true} />
                  <span className="ml-2">Enviando...</span>
                </>
              ) : (
                'Enviar Petición'
              )}
            </button>

             {/* Response Area */}
            <div className="w-full min-h-[15rem] flex flex-col justify-center items-center text-center border-2 border-dashed border-cyan-700/50 rounded-lg p-4 relative overflow-hidden">
              {isLoading ? (
                <>
                  <Loader />
                  <p className="mt-4 font-orbitron text-cyan-400 neon-text animate-pulse">ESPERANDO RESPUESTA DE LA API...</p>
                </>
              ) : error ? (
                <div className="text-red-400 bg-red-900/50 p-4 rounded-lg border border-red-500 w-full text-left">
                  <p className="font-bold">Error de API:</p>
                  <pre className="mt-2 text-sm whitespace-pre-wrap break-all">{error}</pre>
                </div>
              ) : apiResponse ? (
                <div className="w-full h-full flex flex-col items-start bg-black/30 border neon-border rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="font-orbitron text-xl text-cyan-300 neon-text shrink-0 mb-2">
                        Respuesta de la API
                    </h3>
                    <div className="w-full overflow-x-auto bg-gray-900/70 p-3 rounded-md max-h-96 overflow-y-auto">
                        <JsonViewer jsonString={apiResponse} />
                    </div>
                </div>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                  <h3 className="font-orbitron text-xl text-cyan-500/80 mt-4">Terminal de Respuesta</h3>
                  <p className="text-gray-500">La respuesta de la API aparecerá aquí.</p>
                </>
              )}
            </div>
        </div>
    );
}
