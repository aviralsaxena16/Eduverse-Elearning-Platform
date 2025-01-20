import React, { useEffect } from 'react';

const BotPage = () => {
  useEffect(() => {
    // Inject the Botpress script
    const botpressScript = document.createElement('script');
    botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    // Inject your custom bot script
    const customBotScript = document.createElement('script');
    customBotScript.src = 'https://files.bpcontent.cloud/2025/01/20/12/20250120125858-9CGIIE6N.js';
    customBotScript.async = true;
    document.body.appendChild(customBotScript);

    // Clean up scripts when component unmounts
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(customBotScript);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the Bot Page</h1>
    </div>
  );
};

export default BotPage;
