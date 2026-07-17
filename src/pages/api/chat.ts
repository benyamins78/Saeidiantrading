export const prerender = false; // Tells Astro this must run on the server, not at build time

export async function POST({ request }) {
  const apiKey = import.meta.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  try {
    const body = await request.json();
    const userMessage = body.message;

    // The System Prompt: Controlling Gemini's behavior
    const systemInstruction = `You are the automated operations assistant for Saeidian Trading. 
    Your job is to answer basic logistics, export, and fulfillment questions based strictly on the site context. 
    You manage cross-border trade, primarily agricultural goods and legal commodities between Iran, Pakistan, and global hubs.
    You do NOT give out specific pricing or rates. If a user asks for rates, complex sourcing, or wants to initiate a deal, politely instruct them to contact the trading desk directly via WhatsApp or phone at +989151418603. Keep your answers extremely concise, professional, and business-focused.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: { text: systemInstruction } },
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      })
    });

    const data = await response.json();
    
    // Extract the text from Gemini's response
    const botReply = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ reply: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { status: 500 });
  }
}